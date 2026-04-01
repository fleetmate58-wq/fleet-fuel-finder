import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const WA_FUELWATCH_URL = 'https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS';

// Map FuelWatch product IDs to our keys
const PRODUCT_MAP: Record<string, string> = {
  '1': 'ulp91',    // Unleaded Petrol
  '2': 'premiumDiesel', // Premium Unleaded
  '4': 'diesel',   // Diesel
  '5': 'lpg',      // LPG
  '6': 'ulp98',    // 98 RON
  '10': 'e10',     // E85 (closest to E10)
  '11': 'ulp95',   // Unleaded 95
};

// Products to fetch
const PRODUCTS = ['1', '4', '5', '6', '11'];

let cache: { prices: Record<string, number>; fetchedAt: number } | null = null;
const CACHE_MS = 30 * 60 * 1000; // 30 minutes

function parseXMLPrices(xml: string): number[] {
  const prices: number[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const priceMatch = match[1].match(/<price>([^<]+)<\/price>/);
    if (priceMatch) {
      const p = parseFloat(priceMatch[1]);
      if (!isNaN(p)) prices.push(p);
    }
  }
  return prices;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Return cache if fresh
    if (cache && Date.now() - cache.fetchedAt < CACHE_MS) {
      return new Response(JSON.stringify({ prices: cache.prices, cached: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const results: Record<string, number> = {};

    // Fetch each product type from FuelWatch
    const fetches = PRODUCTS.map(async (productId) => {
      try {
        const url = `${WA_FUELWATCH_URL}?Product=${productId}&Suburb=Perth&Day=today`;
        const res = await fetch(url, {
          headers: { 'User-Agent': 'FleetMate-FuelTracker/1.0' },
        });
        if (!res.ok) return;
        const xml = await res.text();
        const prices = parseXMLPrices(xml);
        if (prices.length > 0) {
          const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
          const key = PRODUCT_MAP[productId];
          if (key) results[key] = +avg.toFixed(1);
        }
      } catch (e) {
        console.warn(`FuelWatch product ${productId} failed:`, e);
      }
    });

    await Promise.all(fetches);

    if (Object.keys(results).length > 0) {
      cache = { prices: results, fetchedAt: Date.now() };
    }

    return new Response(JSON.stringify({ prices: results, cached: false }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
