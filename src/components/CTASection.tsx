const CTASection = () => (
  <section className="py-16 md:py-24 border-t border-border">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
        Ready to Take Control of Your Fleet's Fuel Bill?
      </h2>
      <div className="w-16 h-0.5 bg-primary mx-auto mb-6"></div>
      <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
        Join thousands of Australian businesses using Fleet Mate to monitor fuel usage, track vehicles in real time, and cut operational costs.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="https://fleetmate.au/contacts/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-primary-foreground font-heading font-semibold px-8 py-4 rounded-sm hover:opacity-90 transition-all"
          aria-label="Start a free trial with Fleet Mate fleet management"
        >
          Start Free Trial
        </a>
        <a
          href="https://fleetmate.au/services/"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-foreground text-foreground font-heading font-semibold px-8 py-4 rounded-sm hover:bg-foreground/10 transition-all"
          aria-label="View all Fleet Mate fleet management services"
        >
          View All Services
        </a>
      </div>
    </div>
  </section>
);

export default CTASection;
