import { type FuelPrices, type StateCode, STATES, formatPrice } from '@/utils/fuelData';

interface StateComparisonProps {
  prices: Record<StateCode, FuelPrices>;
}

const StateComparison = ({ prices }: StateComparisonProps) => {
  const cheapestUlp = STATES.reduce((min, s) => prices[s].ulp91 < prices[min].ulp91 ? s : min, STATES[0]);
  const cheapestDiesel = STATES.reduce((min, s) => prices[s].diesel < prices[min].diesel ? s : min, STATES[0]);

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-2">Fuel Price Comparison by State — Today</h2>
      <div className="w-12 h-0.5 bg-primary mb-6"></div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm" aria-label="Australian fuel price comparison by state">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">State</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">ULP 91 (¢/L)</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Diesel (¢/L)</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">vs NSW ULP</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">vs NSW Diesel</th>
            </tr>
          </thead>
          <tbody>
            {STATES.map((state, i) => {
              const sp = prices[state];
              const ulpDiff = +(sp.ulp91 - prices.NSW.ulp91).toFixed(1);
              const dieselDiff = +(sp.diesel - prices.NSW.diesel).toFixed(1);

              return (
                <tr key={state} className={`${i % 2 === 0 ? 'bg-card' : 'bg-accent'} transition-colors`}>
                  <td className="px-4 py-3 font-semibold">{state}</td>
                  <td className={`px-4 py-3 font-mono font-semibold ${state === cheapestUlp ? 'text-success' : 'text-foreground'}`}>
                    {formatPrice(sp.ulp91)}¢ {state === cheapestUlp && <span className="text-xs">✓ Cheapest</span>}
                  </td>
                  <td className={`px-4 py-3 font-mono font-semibold ${state === cheapestDiesel ? 'text-success' : 'text-foreground'}`}>
                    {formatPrice(sp.diesel)}¢ {state === cheapestDiesel && <span className="text-xs">✓ Cheapest</span>}
                  </td>
                  <td className={`px-4 py-3 font-mono text-sm ${ulpDiff > 0 ? 'text-destructive' : ulpDiff < 0 ? 'text-success' : 'text-muted-foreground'}`}>
                    {ulpDiff > 0 ? '+' : ''}{ulpDiff}¢
                  </td>
                  <td className={`px-4 py-3 font-mono text-sm ${dieselDiff > 0 ? 'text-destructive' : dieselDiff < 0 ? 'text-success' : 'text-muted-foreground'}`}>
                    {dieselDiff > 0 ? '+' : ''}{dieselDiff}¢
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground mt-4">
        Prices sourced from official government fuel monitoring schemes. Updated every 30 minutes.
      </p>
    </section>
  );
};

export default StateComparison;
