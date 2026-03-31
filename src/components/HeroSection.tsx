interface HeroSectionProps {
  isLive: boolean;
  lastUpdated: Date;
}

const HeroSection = ({ isLive, lastUpdated }: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-secondary grid-pattern">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-flex items-center gap-2 bg-background px-3 py-1.5 text-sm font-medium rounded-full border border-border shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-destructive"></span>
            </span>
            <span className="text-primary font-semibold">{isLive ? 'LIVE' : 'CACHED'}</span>
          </span>
          <span className="text-muted-foreground text-sm">
            Updated {lastUpdated.toLocaleTimeString('en-AU')}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-4xl text-foreground">
          Live Fuel Prices Australia — <span className="text-primary">Real-Time Petrol & Diesel Data</span> for Fleet Managers
        </h1>
        <div className="w-20 h-1 bg-primary mb-6 rounded-full"></div>
        <p className="text-muted-foreground text-lg md:text-xl max-w-3xl leading-relaxed">
          Stop guessing at the bowser. Fleet Mate tracks live petrol, diesel and LPG prices across NSW, VIC, QLD, WA and SA — so your fleet always fuels up at the right price.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
