import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { type FuelPrices } from '@/utils/fuelData';

interface FAQSectionProps {
  prices: FuelPrices;
}

const FAQSection = ({ prices }: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: 'What are the current petrol prices in Australia?',
      a: `As of today, the national average for Unleaded 91 is approximately ${prices.ulp91}¢/L in NSW. Diesel averages around ${prices.diesel}¢/L. Prices vary by state and suburb — use our search tool above to find current prices near you.`,
    },
    {
      q: 'Why do fuel prices differ between states?',
      a: 'Fuel prices vary due to differences in state excise duties, transport and distribution costs, local competition between service stations, and proximity to refineries. Remote areas like the NT typically pay more due to higher transport costs.',
    },
    {
      q: 'When are fuel prices cheapest in Australia?',
      a: 'In most capital cities, fuel prices follow a weekly cycle. Prices are typically lowest on Tuesday and Wednesday, then rise through the week, peaking on Thursday or Friday. Filling up mid-week can save 5–10¢ per litre.',
    },
    {
      q: 'How does fleet fuel management reduce costs?',
      a: 'Fleet fuel management combines GPS tracking, route optimisation, driver behaviour monitoring, and refuelling scheduling to reduce waste. Fleet Mate customers typically see 8–15% reductions in fuel spend through these combined strategies.',
    },
    {
      q: 'What fuel is best for fleet vehicles?',
      a: 'Most commercial fleet vehicles run efficiently on Unleaded 91 (petrol) or standard Diesel. Premium fuels (95/98) are only recommended if the vehicle manufacturer specifies it. Diesel remains the most common fleet fuel due to its superior torque and fuel economy for heavy vehicles.',
    },
    {
      q: 'Is there a free fuel price API for Australia?',
      a: 'Yes. NSW provides the FuelCheck API (api.nsw.gov.au), Western Australia offers FuelWatch (fuelwatch.wa.gov.au), and Queensland publishes fuel data through the Queensland Open Data Portal. All are free to access.',
    },
  ];

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-heading font-bold mb-2">Frequently Asked Questions</h2>
      <div className="w-12 h-0.5 bg-primary mb-6"></div>

      <div className="space-y-2 max-w-3xl">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-card border border-border rounded-sm overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left font-heading font-semibold text-sm hover:bg-accent transition-colors"
              aria-expanded={openIndex === i}
              aria-label={faq.q}
            >
              {faq.q}
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${openIndex === i ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <p className="px-5 pb-4 text-sm text-muted-foreground font-body leading-relaxed">{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
