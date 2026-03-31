import { useState, useMemo } from 'react';
import { Calculator } from 'lucide-react';
import { FALLBACK_PRICES, formatCurrency } from '@/utils/fuelData';

const FuelCalculator = () => {
  const [vehicles, setVehicles] = useState(20);
  const [kmPerWeek, setKmPerWeek] = useState(800);
  const [consumption, setConsumption] = useState(11);
  const [fuelType, setFuelType] = useState<'ulp91' | 'diesel' | 'ulp95'>('diesel');

  const pricePerLitre = FALLBACK_PRICES.NSW[fuelType] / 100; // convert cents to dollars

  const costs = useMemo(() => {
    const litresPerVehiclePerWeek = (kmPerWeek / 100) * consumption;
    const weekly = vehicles * litresPerVehiclePerWeek * pricePerLitre;
    const monthly = weekly * 4.33;
    const annual = weekly * 52;
    const savings = annual * 0.08;
    return { weekly, monthly, annual, savings };
  }, [vehicles, kmPerWeek, consumption, pricePerLitre]);

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-heading font-bold mb-2 flex items-center gap-2">
        <Calculator className="w-5 h-5 text-primary" aria-hidden="true" />
        Calculate Your Fleet's Weekly Fuel Cost
      </h2>
      <div className="w-12 h-0.5 bg-primary mb-6"></div>

      <div className="bg-card border border-border rounded-lg p-6 orange-glow">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-body text-muted-foreground mb-2">Number of vehicles: <span className="text-foreground font-semibold">{vehicles}</span></label>
              <input type="range" min={1} max={500} value={vehicles} onChange={(e) => setVehicles(Number(e.target.value))} className="w-full accent-primary" aria-label="Number of fleet vehicles" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>1</span><span>500</span></div>
            </div>

            <div>
              <label className="block text-sm font-body text-muted-foreground mb-2">Avg km per vehicle per week</label>
              <input type="number" value={kmPerWeek} onChange={(e) => setKmPerWeek(Number(e.target.value))} className="w-full bg-accent border border-border rounded-sm px-4 py-3 font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-primary" aria-label="Average kilometres per vehicle per week" />
            </div>

            <div>
              <label className="block text-sm font-body text-muted-foreground mb-2">Fuel consumption (L/100km)</label>
              <input type="number" value={consumption} onChange={(e) => setConsumption(Number(e.target.value))} className="w-full bg-accent border border-border rounded-sm px-4 py-3 font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-primary" aria-label="Average fuel consumption litres per 100 kilometres" />
            </div>

            <div>
              <label className="block text-sm font-body text-muted-foreground mb-2">Fuel Type</label>
              <select value={fuelType} onChange={(e) => setFuelType(e.target.value as any)} className="w-full bg-accent border border-border rounded-sm px-4 py-3 font-body text-foreground focus:outline-none focus:ring-1 focus:ring-primary" aria-label="Select fuel type for fleet cost calculation">
                <option value="ulp91">Unleaded 91</option>
                <option value="diesel">Diesel</option>
                <option value="ulp95">Unleaded 95</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-4">
            <div className="bg-accent rounded-sm p-4 border border-border">
              <p className="text-sm text-muted-foreground font-body">Weekly Fuel Cost</p>
              <p className="font-mono text-3xl font-bold text-foreground">{formatCurrency(costs.weekly)}</p>
            </div>
            <div className="bg-accent rounded-sm p-4 border border-border">
              <p className="text-sm text-muted-foreground font-body">Monthly Fuel Cost</p>
              <p className="font-mono text-2xl font-bold text-foreground">{formatCurrency(costs.monthly)}</p>
            </div>
            <div className="bg-accent rounded-sm p-4 border border-border">
              <p className="text-sm text-muted-foreground font-body">Annual Fuel Cost</p>
              <p className="font-mono text-2xl font-bold text-foreground">{formatCurrency(costs.annual)}</p>
            </div>
            <div className="bg-primary/10 border border-primary/30 rounded-sm p-4">
              <p className="text-sm text-primary font-body font-semibold">Potential savings with Fleet Mate (8%)</p>
              <p className="font-mono text-2xl font-bold text-primary">{formatCurrency(costs.savings)}<span className="text-sm font-body">/year</span></p>
            </div>

            <a
              href="https://fleetmate.au/contacts/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground font-heading font-semibold text-center px-6 py-4 rounded-sm hover:opacity-90 transition-all mt-2"
              aria-label="Get a free Fleet Mate quote for fleet fuel management"
            >
              Get a Free Fleet Mate Quote →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FuelCalculator;
