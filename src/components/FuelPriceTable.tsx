import { useState, useMemo } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { type StateCode, FALLBACK_PRICES, FUEL_LABELS, CHEAPEST_STATIONS, getYesterdayPrices, formatPrice } from '@/utils/fuelData';

interface FuelPriceTableProps {
  state: StateCode;
}

type SortKey = 'fuelType' | 'today' | 'yesterday' | 'change';
type SortDir = 'asc' | 'desc';

const FUEL_KEYS = ['ulp91', 'ulp95', 'ulp98', 'e10', 'diesel', 'premiumDiesel', 'lpg'] as const;

const FuelPriceTable = ({ state }: FuelPriceTableProps) => {
  const [sortKey, setSortKey] = useState<SortKey>('fuelType');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const yesterday = useMemo(() => getYesterdayPrices(state), [state]);
  const today = FALLBACK_PRICES[state];

  const rows = useMemo(() => {
    const data = FUEL_KEYS.map((key) => {
      const todayPrice = today[key] ?? 0;
      const yesterdayPrice = yesterday[key] ?? 0;
      const change = +(todayPrice - yesterdayPrice).toFixed(1);
      const station = CHEAPEST_STATIONS[state]?.[key];
      return { key, label: FUEL_LABELS[key], today: todayPrice, yesterday: yesterdayPrice, change, station };
    });

    return data.sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'fuelType') cmp = a.label.localeCompare(b.label);
      else if (sortKey === 'today') cmp = a.today - b.today;
      else if (sortKey === 'yesterday') cmp = a.yesterday - b.yesterday;
      else if (sortKey === 'change') cmp = a.change - b.change;
      return sortDir === 'desc' ? -cmp : cmp;
    });
  }, [state, today, yesterday, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const SortHeader = ({ label, sk }: { label: string; sk: SortKey }) => (
    <th className="px-4 py-3 text-left text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors" onClick={() => toggleSort(sk)}>
      {label} {sortKey === sk && (sortDir === 'asc' ? '↑' : '↓')}
    </th>
  );

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-heading font-bold mb-2">{state} Fuel Prices Today</h2>
      <div className="w-12 h-0.5 bg-primary mb-6"></div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm" aria-label={`${state} fuel prices`}>
          <thead>
            <tr className="border-b border-border">
              <SortHeader label="Fuel Type" sk="fuelType" />
              <SortHeader label="Today's Avg (¢/L)" sk="today" />
              <SortHeader label="Yesterday" sk="yesterday" />
              <SortHeader label="Change" sk="change" />
              <th className="px-4 py-3 text-left text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider">Cheapest Station</th>
              <th className="px-4 py-3 text-left text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider">Suburb</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.key}
                className={`${i % 2 === 0 ? 'bg-card' : 'bg-accent'} ${row.key === 'diesel' ? 'border-l-2 border-l-primary' : ''} transition-colors`}
              >
                <td className="px-4 py-3 font-body font-medium">{row.label}</td>
                <td className="px-4 py-3 font-mono text-primary font-semibold">{formatPrice(row.today)}¢</td>
                <td className="px-4 py-3 font-mono text-muted-foreground">{formatPrice(row.yesterday)}¢</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1 font-mono text-sm font-medium ${row.change > 0 ? 'text-destructive' : row.change < 0 ? 'text-success' : 'text-muted-foreground'}`}>
                    {row.change > 0 ? <ArrowUp className="w-3.5 h-3.5" /> : row.change < 0 ? <ArrowDown className="w-3.5 h-3.5" /> : null}
                    {Math.abs(row.change).toFixed(1)}¢
                  </span>
                </td>
                <td className="px-4 py-3 font-body text-muted-foreground">{row.station?.name ?? '—'}</td>
                <td className="px-4 py-3 font-body text-muted-foreground">{row.station?.suburb ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {rows.map((row) => (
          <div key={row.key} className={`bg-card p-4 rounded-lg border border-border ${row.key === 'diesel' ? 'border-l-2 border-l-primary' : ''}`}>
            <div className="flex justify-between items-center mb-2">
              <span className="font-heading font-semibold">{row.label}</span>
              <span className="font-mono text-primary text-lg font-bold">{formatPrice(row.today)}¢/L</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Yesterday: {formatPrice(row.yesterday)}¢</span>
              <span className={`inline-flex items-center gap-1 font-mono ${row.change > 0 ? 'text-destructive' : row.change < 0 ? 'text-success' : ''}`}>
                {row.change > 0 ? <ArrowUp className="w-3 h-3" /> : row.change < 0 ? <ArrowDown className="w-3 h-3" /> : null}
                {Math.abs(row.change).toFixed(1)}¢
              </span>
            </div>
            {row.station && <p className="text-xs text-muted-foreground mt-2">Cheapest: {row.station.name}, {row.station.suburb}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FuelPriceTable;
