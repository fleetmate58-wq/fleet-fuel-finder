import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { FALLBACK_PRICES, type StateCode, type FuelPrices } from '@/utils/fuelData';

interface NSWFuelPrice {
  stationcode: string;
  fueltype: string;
  price: number;
  lastupdated: string;
}

interface NSWStation {
  code: string;
  name: string;
  address: string;
  brand: string;
  location: { latitude: number; longitude: number };
}

// Map NSW API fuel type codes to our keys
const FUEL_TYPE_MAP: Record<string, keyof FuelPrices> = {
  'E10': 'e10',
  'U91': 'ulp91',
  'P95': 'ulp95',
  'P98': 'ulp98',
  'DL': 'diesel',
  'PDL': 'premiumDiesel',
  'LPG': 'lpg',
};

export function useFuelPrices() {
  const [prices, setPrices] = useState<Record<StateCode, FuelPrices>>(FALLBACK_PRICES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchPrices = useCallback(async () => {
    try {
      const { data, error: fnError } = await supabase.functions.invoke('fuel-prices', {
        body: null,
        headers: { 'Content-Type': 'application/json' },
      });

      if (fnError) throw fnError;

      if (data?.prices && Array.isArray(data.prices)) {
        // Calculate NSW averages from real data
        const fuelTotals: Record<string, { sum: number; count: number }> = {};
        
        data.prices.forEach((p: NSWFuelPrice) => {
          const key = FUEL_TYPE_MAP[p.fueltype];
          if (key) {
            if (!fuelTotals[key]) fuelTotals[key] = { sum: 0, count: 0 };
            fuelTotals[key].sum += p.price;
            fuelTotals[key].count += 1;
          }
        });

        const nswPrices: FuelPrices = { ...FALLBACK_PRICES.NSW };
        Object.entries(fuelTotals).forEach(([key, { sum, count }]) => {
          if (count > 0) {
            (nswPrices as any)[key] = +(sum / count).toFixed(1);
          }
        });

        setPrices(prev => ({ ...prev, NSW: nswPrices }));
        setIsLive(true);
        setLastUpdated(new Date());
        setError(null);
      }
    } catch (err: any) {
      console.warn('Failed to fetch live fuel prices, using fallback data:', err.message);
      setError('Using cached data — live feed unavailable');
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, [fetchPrices]);

  return { prices, loading, error, isLive, lastUpdated };
}
