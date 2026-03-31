import { type FuelPrices } from '@/utils/fuelData';

interface PriceTickerProps {
  prices: FuelPrices;
}

const PriceTicker = ({ prices }: PriceTickerProps) => {
  const items = [
    `ULP 91: ${prices.ulp91}¢/L`,
    `Diesel: ${prices.diesel}¢/L`,
    `ULP 95: ${prices.ulp95}¢/L`,
    `ULP 98: ${prices.ulp98}¢/L`,
    `E10: ${prices.e10}¢/L`,
    `LPG: ${prices.lpg}¢/L`,
  ];

  const tickerContent = [...items, ...items].map((item, i) => (
    <span key={i} className="inline-flex items-center mx-8 whitespace-nowrap">
      <span className="font-mono text-sm font-semibold text-primary-foreground">{item}</span>
      <span className="ml-8 text-primary-foreground/40">|</span>
    </span>
  ));

  return (
    <div className="bg-primary overflow-hidden py-3">
      <div className="animate-ticker flex" aria-label="National average fuel prices ticker">
        {tickerContent}
      </div>
    </div>
  );
};

export default PriceTicker;
