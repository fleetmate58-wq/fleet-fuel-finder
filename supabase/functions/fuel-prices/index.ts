import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

let cachedToken: string | null = null;
let tokenExpiry = 0;

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiry) return cachedToken;

  const apiKey = Deno.env.get('NSW_FUELCHECK_API_KEY');
  const apiSecret = Deno.env.get('NSW_FUELCHECK_API_SECRET');

  if (!apiKey || !apiSecret) throw new Error('NSW FuelCheck credentials not configured');

  const credentials = btoa(`${apiKey}:${apiSecret}`);
  const res = await fetch('https://api.onegov.nsw.gov.au/oauth/client_credential/accesstoken?grant_type=client_credentials', {
    method: 'GET',
    headers: { 'Authorization': `Basic ${credentials}` },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Token request failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  cachedToken = data.access_token;
  tokenExpiry = Date.now() + (parseInt(data.expires_in || '3600') * 1000) - 60000;
  return cachedToken!;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const endpoint = url.searchParams.get('endpoint') || 'prices';

    const token = await getAccessToken();
    const apiKey = Deno.env.get('NSW_FUELCHECK_API_KEY')!;

    let apiUrl: string;
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${token}`,
      'apikey': apiKey,
      'Content-Type': 'application/json',
      'transactionid': crypto.randomUUID(),
      'requesttimestamp': new Date().toISOString(),
    };

    if (endpoint === 'prices') {
      apiUrl = 'https://api.onegov.nsw.gov.au/FuelPriceCheck/v2/fuel/prices';
    } else if (endpoint === 'reference') {
      apiUrl = 'https://api.onegov.nsw.gov.au/FuelCheckRefData/v1/fuel/lovpicements';
    } else if (endpoint === 'bylocation') {
      const lat = url.searchParams.get('latitude') || '-33.8688';
      const lng = url.searchParams.get('longitude') || '151.2093';
      const radius = url.searchParams.get('radius') || '10';
      const fueltype = url.searchParams.get('fueltype') || 'E10';
      const sortby = url.searchParams.get('sortby') || 'price';

      apiUrl = 'https://api.onegov.nsw.gov.au/FuelPriceCheck/v2/fuel/prices/bylocation';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          fueltype,
          latitude: lat,
          longitude: lng,
          radius,
          sortby,
          sortascending: 'true',
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        return new Response(JSON.stringify({ error: `API error: ${response.status}`, details: text }), {
          status: response.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const data = await response.json();
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({ error: 'Invalid endpoint' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const response = await fetch(apiUrl, { method: 'GET', headers });

    if (!response.ok) {
      const text = await response.text();
      return new Response(JSON.stringify({ error: `API error: ${response.status}`, details: text }), {
        status: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
