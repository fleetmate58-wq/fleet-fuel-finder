import { Helmet } from 'react-helmet-async';

import HeroSection from '@/components/HeroSection';
import PriceTicker from '@/components/PriceTicker';
import FuelPriceTable from '@/components/FuelPriceTable';
import SuburbSearch from '@/components/SuburbSearch';
import FuelMap from '@/components/FuelMap';
import TrendChart from '@/components/TrendChart';
import FuelTips from '@/components/FuelTips';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import { useFuelPrices } from '@/hooks/useFuelPrices';

const Index = () => {
  const { prices, error, isLive, lastUpdated } = useFuelPrices();

  return (
    <>
      <Helmet>
        <title>Live NSW Fuel Prices Today | Petrol & Diesel Data for Fleets | Fleet Mate</title>
        <meta name="description" content="Track live NSW petrol and diesel prices from official FuelCheck data. Fleet Mate's real-time NSW fuel price tracker helps Australian fleet managers cut fuel costs by up to 15%." />
        <link rel="canonical" href="https://fleetmate.au/live-fuel-data/" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Live NSW Fuel Prices",
          "description": "Real-time NSW petrol and diesel prices for fleet managers.",
          "url": "https://fleetmate.au/live-fuel-data/",
          "publisher": { "@type": "Organization", "name": "Fleet Mate", "url": "https://fleetmate.au" }
        })}</script>
      </Helmet>

      <main className="min-h-screen bg-background">
        
        {error && (
          <div className="bg-primary/10 border-b border-primary/20 py-2 px-4 text-center text-sm text-primary">
            ⚠️ {error}
          </div>
        )}
        <HeroSection isLive={isLive} lastUpdated={lastUpdated} />
        <PriceTicker prices={prices.NSW} />
        <FuelPriceTable state="NSW" prices={prices} />
        <SuburbSearch />
        <FuelMap />
        <TrendChart />
        <section className="container mx-auto px-4 py-12">
          <div className="bg-card border border-border rounded-lg p-8 text-center orange-glow">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Fuel Cost Calculator Australia</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Work out your trip fuel cost, litres per 100 km, km per litre and cost per kilometre with live NSW fuel prices. Free Australian petrol & diesel calculator.
            </p>
            <a href="/fuel-cost-calculator/" className="inline-block bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-all uppercase tracking-wide text-sm">
              Open Fuel Cost Calculator →
            </a>
          </div>
        </section>
        <FuelTips />
        <FAQSection prices={prices.NSW} />
        <CTASection />

        <footer className="border-t border-border py-6">
          <div className="container mx-auto px-4">
            <p className="text-xs text-muted-foreground font-body leading-relaxed">
              NSW fuel price data sourced from official NSW FuelCheck (api.nsw.gov.au). Data refreshed every 30 minutes. Prices shown are average retail prices in cents per litre (¢/L) and may vary by station.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Index;
