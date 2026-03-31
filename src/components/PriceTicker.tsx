import { FALLBACK_PRICES } from '@/utils/fuelData';

const PriceTicker = () => {
  const nsw = FALLBACK_PRICES.NSW;
  const items = [
    `ULP 91: ${nsw.ulp91}¢/L`,
    `Diesel: ${nsw.diesel}¢/L`,
    `ULP 95: ${nsw.ulp95}¢/L`,
    `ULP 98: ${nsw.ulp98}¢/L`,
    `E10: ${nsw.e10}¢/L`,
    `LPG: ${nsw.lpg}¢/L`,
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
