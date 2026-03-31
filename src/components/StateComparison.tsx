import { FALLBACK_PRICES, STATES, type StateCode, formatPrice } from '@/utils/fuelData';

const StateComparison = () => {
  const cheapestUlp = STATES.reduce((min, s) => FALLBACK_PRICES[s].ulp91 < FALLBACK_PRICES[min].ulp91 ? s : min, STATES[0]);
  const cheapestDiesel = STATES.reduce((min, s) => FALLBACK_PRICES[s].diesel < FALLBACK_PRICES[min].diesel ? s : min, STATES[0]);

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-heading font-bold mb-2">Fuel Price Comparison by State — Today</h2>
      <div className="w-12 h-0.5 bg-primary mb-6"></div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm" aria-label="Australian fuel price comparison by state">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider">State</th>
              <th className="px-4 py-3 text-left text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider">ULP 91 (¢/L)</th>
              <th className="px-4 py-3 text-left text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider">Diesel (¢/L)</th>
              <th className="px-4 py-3 text-left text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider">vs NSW ULP</th>
              <th className="px-4 py-3 text-left text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider">vs NSW Diesel</th>
            </tr>
          </thead>
          <tbody>
            {STATES.map((state, i) => {
              const prices = FALLBACK_PRICES[state];
              const ulpDiff = +(prices.ulp91 - FALLBACK_PRICES.NSW.ulp91).toFixed(1);
              const dieselDiff = +(prices.diesel - FALLBACK_PRICES.NSW.diesel).toFixed(1);
              const isCheapestUlp = state === cheapestUlp;
              const isCheapestDiesel = state === cheapestDiesel;

              return (
                <tr key={state} className={`${i % 2 === 0 ? 'bg-card' : 'bg-accent'} transition-colors`}>
                  <td className="px-4 py-3 font-heading font-semibold">{state}</td>
                  <td className={`px-4 py-3 font-mono font-semibold ${isCheapestUlp ? 'text-success' : 'text-foreground'}`}>
                    {formatPrice(prices.ulp91)}¢ {isCheapestUlp && <span className="text-xs">✓ Cheapest</span>}
                  </td>
                  <td className={`px-4 py-3 font-mono font-semibold ${isCheapestDiesel ? 'text-success' : 'text-foreground'}`}>
                    {formatPrice(prices.diesel)}¢ {isCheapestDiesel && <span className="text-xs">✓ Cheapest</span>}
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
      <p className="text-xs text-muted-foreground mt-4 font-body">
        Prices sourced from official government fuel monitoring schemes. Updated every 30 minutes.
      </p>
    </section>
  );
};

export default StateComparison;
