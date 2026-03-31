import { useState, useCallback } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const FUEL_OPTIONS = [
  { label: 'ULP 91', code: 'U91' },
  { label: 'Diesel', code: 'DL' },
  { label: 'ULP 95', code: 'P95' },
  { label: 'ULP 98', code: 'P98' },
  { label: 'E10', code: 'E10' },
];
const RADIUS_OPTIONS = [5, 10, 25, 50];

interface StationResult {
  name: string;
  brand: string;
  address: string;
  price: number;
  distance: number;
  lastUpdated: string;
}

// Simple geocoding using Nominatim (free, no key)
async function geocodeSuburb(query: string): Promise<{ lat: number; lng: number } | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query + ', Australia')}&format=json&limit=1`,
      { headers: { 'User-Agent': 'FleetMate-FuelTracker/1.0' } }
    );
    const data = await res.json();
    if (data.length > 0) {
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    }
    return null;
  } catch {
    return null;
  }
}

function timeSince(dateStr: string): string {
  try {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins} min ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} hr ago`;
    return `${Math.floor(hrs / 24)} day ago`;
  } catch {
    return 'recently';
  }
}

const SuburbSearch = () => {
  const [query, setQuery] = useState('');
  const [fuelType, setFuelType] = useState('U91');
  const [radius, setRadius] = useState(10);
  const [results, setResults] = useState<StationResult[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setResults([]);

    try {
      // Geocode the suburb/postcode
      const coords = await geocodeSuburb(query);
      if (!coords) {
        setError('Could not find that location. Try a different suburb or postcode.');
        setSearched(true);
        setLoading(false);
        return;
      }

      // Call edge function with bylocation params
      const params = new URLSearchParams({
        endpoint: 'bylocation',
        latitude: coords.lat.toString(),
        longitude: coords.lng.toString(),
        radius: radius.toString(),
        fueltype: fuelType,
        sortby: 'price',
      });

      const { data: responseData, error: fnError } = await supabase.functions.invoke(
        `fuel-prices?${params.toString()}`,
        { method: 'GET' }
      );

      if (fnError) throw fnError;

      // Parse the response - NSW FuelCheck returns stations and prices
      const stations: StationResult[] = [];
      if (responseData?.stations && Array.isArray(responseData.stations)) {
        responseData.stations.slice(0, 10).forEach((s: any) => {
          stations.push({
            name: s.name || s.stationname || 'Unknown Station',
            brand: s.brand || s.brandname || '',
            address: s.address || '',
            price: s.price || 0,
            distance: s.distance ? parseFloat(s.distance).toFixed(1) as any : 0,
            lastUpdated: timeSince(s.lastupdated || s.priceupdateddate || ''),
          });
        });
      } else if (responseData?.prices && Array.isArray(responseData.prices)) {
        responseData.prices.slice(0, 10).forEach((p: any) => {
          stations.push({
            name: p.stationname || p.servicestationname || 'Unknown Station',
            brand: p.brand || '',
            address: p.stationaddress || p.address || '',
            price: p.price || 0,
            distance: p.distance ? parseFloat(p.distance) : 0,
            lastUpdated: timeSince(p.lastupdated || p.priceupdateddate || ''),
          });
        });
      }

      if (stations.length === 0) {
        setError('No fuel stations found in this area. Try increasing the search radius.');
      }

      setResults(stations);
      setSearched(true);
    } catch (err: any) {
      console.error('Search failed:', err);
      setError('Search failed — the live API may be temporarily unavailable. Please try again.');
      setSearched(true);
    } finally {
      setLoading(false);
    }
  }, [query, fuelType, radius]);

  return (
    <section className="container mx-auto px-4 py-12" id="search">
      <h2 className="text-2xl font-bold mb-2">Find Cheapest Fuel Near You</h2>
      <div className="w-12 h-0.5 bg-primary mb-6"></div>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Enter suburb or postcode (NSW only)..."
              className="w-full bg-secondary border border-border rounded-lg pl-10 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              aria-label="Search suburb or postcode for fuel prices in Australia"
            />
          </div>

          <select
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
            className="bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            aria-label="Select fuel type"
          >
            {FUEL_OPTIONS.map(f => <option key={f.code} value={f.code}>{f.label}</option>)}
          </select>

          <select
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            aria-label="Select search radius"
          >
            {RADIUS_OPTIONS.map(r => <option key={r} value={r}>{r} km</option>)}
          </select>

          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-all disabled:opacity-50 uppercase tracking-wide text-sm flex items-center justify-center gap-2"
            aria-label="Search for cheapest fuel stations"
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Searching...</> : 'Search'}
          </button>
        </div>

        {error && (
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 mt-4 text-sm text-primary">
            {error}
          </div>
        )}

        {searched && results.length > 0 && (
          <div className="space-y-3 mt-6">
            <p className="text-xs text-muted-foreground mb-2">
              Showing {results.length} stations near "{query}" • Sorted by price
            </p>
            {results.map((r, i) => (
              <div key={i} className="flex flex-col md:flex-row md:items-center justify-between bg-secondary border border-border rounded-lg p-4 gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{r.name}</span>
                    {r.brand && <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{r.brand}</span>}
                  </div>
                  <p className="text-sm text-muted-foreground">{r.address}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {r.distance > 0 && `${r.distance} km away · `}{r.lastUpdated}
                  </p>
                </div>
                <div className="font-mono text-2xl font-bold text-primary">
                  {r.price.toFixed(1)}¢<span className="text-sm text-muted-foreground font-sans">/L</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SuburbSearch;
