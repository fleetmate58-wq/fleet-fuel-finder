import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '@/components/HeroSection';
import PriceTicker from '@/components/PriceTicker';
import StateTabs from '@/components/StateTabs';
import FuelPriceTable from '@/components/FuelPriceTable';
import SuburbSearch from '@/components/SuburbSearch';
import FuelMap from '@/components/FuelMap';
import TrendChart from '@/components/TrendChart';
import FuelCalculator from '@/components/FuelCalculator';
import StateComparison from '@/components/StateComparison';
import FuelTips from '@/components/FuelTips';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import { type StateCode } from '@/utils/fuelData';

const Index = () => {
  const [activeState, setActiveState] = useState<StateCode>('NSW');

  return (
    <>
      <Helmet>
        <title>Live Fuel Prices Australia Today | Petrol & Diesel Data for Fleets | Fleet Mate</title>
        <meta name="description" content="Track live petrol and diesel prices across NSW, VIC, QLD, WA and SA. Fleet Mate's real-time fuel price tracker helps Australian fleet managers cut fuel costs by up to 15%." />
        <link rel="canonical" href="https://fleetmate.au/live-fuel-data/" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Live Fuel Prices Australia",
          "description": "Real-time petrol and diesel prices across Australian states for fleet managers.",
          "url": "https://fleetmate.au/live-fuel-data/",
          "publisher": {
            "@type": "Organization",
            "name": "Fleet Mate",
            "url": "https://fleetmate.au"
          }
        })}</script>
      </Helmet>

      <main className="min-h-screen bg-background">
        <HeroSection />
        <PriceTicker />
        <StateTabs activeState={activeState} onStateChange={setActiveState} />
        <FuelPriceTable state={activeState} />
        <SuburbSearch />
        <FuelMap />
        <TrendChart />
        <FuelCalculator />
        <StateComparison />
        <FuelTips />
        <FAQSection />
        <CTASection />

        <footer className="border-t border-border py-6">
          <div className="container mx-auto px-4">
            <p className="text-xs text-muted-foreground font-body leading-relaxed">
              Fuel price data sourced from NSW FuelCheck (api.nsw.gov.au), WA FuelWatch (fuelwatch.wa.gov.au), and Queensland Open Data Portal. Data refreshed every 30 minutes. Prices shown are average retail prices in cents per litre (¢/L) and may vary by station.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Index;
