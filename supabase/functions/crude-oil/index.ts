import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

let cache: { data: any; fetchedAt: number } | null = null;
const CACHE_MS = 15 * 60 * 1000; // 15 minutes

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (cache && Date.now() - cache.fetchedAt < CACHE_MS) {
      return new Response(JSON.stringify(cache.data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fetch WTI crude oil price from Yahoo Finance
    const yahooUrl = 'https://query1.finance.yahoo.com/v8/finance/chart/CL=F?interval=1d&range=2d';
    const yahooRes = await fetch(yahooUrl, {
      headers: { 'User-Agent': 'FleetMate-FuelTracker/1.0' },
    });

    if (!yahooRes.ok) {
      throw new Error(`Yahoo Finance returned ${yahooRes.status}`);
    }

    const yahoo = await yahooRes.json();
    const result = yahoo?.chart?.result?.[0];
    if (!result) throw new Error('No chart data from Yahoo Finance');

    const meta = result.meta;
    const currentPrice = meta.regularMarketPrice;
    const previousClose = meta.chartPreviousClose || meta.previousClose;

    const change = currentPrice - previousClose;
    const changePercent = (change / previousClose) * 100;

    // Fetch USD to AUD exchange rate
    let audRate = 1.55; // fallback
    try {
      const fxRes = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json');
      if (fxRes.ok) {
        const fx = await fxRes.json();
        if (fx?.usd?.aud) audRate = fx.usd.aud;
      }
    } catch (e) {
      console.warn('FX rate fetch failed, using fallback:', e);
    }

    const data = {
      usd: +currentPrice.toFixed(2),
      aud: +(currentPrice * audRate).toFixed(2),
      change: +change.toFixed(2),
      changePercent: +changePercent.toFixed(2),
      audRate: +audRate.toFixed(4),
      updatedAt: new Date().toISOString(),
    };

    cache = { data, fetchedAt: Date.now() };

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Crude oil fetch error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
