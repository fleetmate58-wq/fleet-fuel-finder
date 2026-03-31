import { Fuel, Route, BarChart3, Wrench } from 'lucide-react';

const tips = [
  {
    icon: Route,
    title: 'Route Optimisation',
    text: 'Reducing idle kilometres by 10% can save a 20-vehicle fleet over $12,000 annually. GPS-based route optimisation identifies the most efficient paths, cutting fuel waste from unnecessary detours and traffic delays.',
    link: { href: 'https://fleetmate.au/services/gps-fleet-tracking-telematics/', label: 'Learn about GPS tracking' },
  },
  {
    icon: Fuel,
    title: 'Smart Refuelling Scheduling',
    text: "Fuel prices in Australia follow a weekly cycle. Prices are typically lowest on Tuesday and Wednesday. By scheduling fleet refuelling on these days, managers can save 5–8¢ per litre across the fleet.",
    link: { href: 'https://fleetmate.au/services/fleet-management/', label: 'Explore fleet management' },
  },
  {
    icon: BarChart3,
    title: 'Telematics & Fuel Monitoring',
    text: 'Fleet telematics systems like Fleet Mate track actual fuel consumption per vehicle, identifying outliers with excessive fuel use due to aggressive driving, idling, or mechanical issues.',
    link: { href: 'https://fleetmate.au/services/gps-fleet-tracking-telematics/', label: 'View telematics features' },
  },
  {
    icon: Wrench,
    title: 'Preventive Maintenance',
    text: 'Under-inflated tyres increase fuel consumption by up to 3%. Regular servicing, including air filter replacement and engine tuning, keeps vehicles running at optimal fuel efficiency.',
    link: { href: 'https://fleetmate.au/services/fleet-management/', label: 'Fleet maintenance tips' },
  },
];

const FuelTips = () => (
  <section className="container mx-auto px-4 py-12">
    <h2 className="text-2xl font-heading font-bold mb-2">How Australian Fleet Managers Can Reduce Fuel Costs</h2>
    <div className="w-12 h-0.5 bg-primary mb-8"></div>

    <div className="grid md:grid-cols-2 gap-6">
      {tips.map((tip) => (
        <div key={tip.title} className="bg-card border border-border rounded-lg p-6 hover:border-primary/30 transition-colors">
          <tip.icon className="w-8 h-8 text-primary mb-4" aria-hidden="true" />
          <h3 className="font-heading font-bold text-lg mb-3">{tip.title}</h3>
          <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">{tip.text}</p>
          <a href={tip.link.href} target="_blank" rel="noopener noreferrer" className="text-primary text-sm font-body font-medium hover:underline">
            {tip.link.label} →
          </a>
        </div>
      ))}
    </div>
  </section>
);

export default FuelTips;
