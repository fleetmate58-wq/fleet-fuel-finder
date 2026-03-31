import { useState, useCallback } from 'react';
import { Search } from 'lucide-react';

const FUEL_OPTIONS = ['ULP 91', 'Diesel', 'ULP 95', 'ULP 98', 'E10'];
const RADIUS_OPTIONS = [5, 10, 25, 50];

const MOCK_RESULTS = [
  { name: 'Costco Auburn', brand: 'Costco', address: '2 Parramatta Rd, Auburn NSW 2144', price: 169.9, distance: 2.3, lastReported: '12 min ago' },
  { name: '7-Eleven Granville', brand: '7-Eleven', address: '45 Woodville Rd, Granville NSW 2142', price: 174.5, distance: 3.8, lastReported: '8 min ago' },
  { name: 'Metro Petroleum', brand: 'Metro', address: '112 Cumberland Hwy, Smithfield NSW 2164', price: 175.2, distance: 5.1, lastReported: '22 min ago' },
  { name: 'United Lidcombe', brand: 'United', address: '89 Parramatta Rd, Lidcombe NSW 2141', price: 176.8, distance: 4.2, lastReported: '5 min ago' },
  { name: 'Shell Homebush', brand: 'Shell', address: '23 Homebush Bay Dr, Homebush NSW 2140', price: 179.3, distance: 6.7, lastReported: '15 min ago' },
];

const SuburbSearch = () => {
  const [query, setQuery] = useState('');
  const [fuelType, setFuelType] = useState('ULP 91');
  const [radius, setRadius] = useState(10);
  const [results, setResults] = useState<typeof MOCK_RESULTS | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = useCallback(() => {
    if (!query.trim()) return;
    // In production, this would call the FuelCheck API
    setResults(MOCK_RESULTS);
    setSearched(true);
  }, [query]);

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
              placeholder="Enter suburb or postcode..."
              className="w-full bg-accent border border-border rounded-lg pl-10 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              aria-label="Search suburb or postcode for fuel prices in Australia"
            />
          </div>

          <select
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
            className="bg-accent border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            aria-label="Select fuel type"
          >
            {FUEL_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
          </select>

          <select
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="bg-accent border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            aria-label="Select search radius"
          >
            {RADIUS_OPTIONS.map(r => <option key={r} value={r}>{r} km</option>)}
          </select>

          <button
            onClick={handleSearch}
            className="bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-all"
            aria-label="Search for cheapest fuel stations"
          >
            Search
          </button>
        </div>

        {searched && results && (
          <div className="space-y-3 mt-6">
            {results.map((r, i) => (
              <div key={i} className="flex flex-col md:flex-row md:items-center justify-between bg-accent border border-border rounded-lg p-4 gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{r.name}</span>
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-lg">{r.brand}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{r.address}</p>
                  <p className="text-xs text-muted-foreground mt-1">{r.distance} km away · {r.lastReported}</p>
                </div>
                <div className="font-mono text-2xl font-bold text-primary">
                  {r.price.toFixed(1)}¢<span className="text-sm text-muted-foreground">/L</span>
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
