import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/fleetmate-logo.png';

const NAV_LINKS = [
  { label: 'Home', href: 'https://fleetmate.au/' },
  { label: 'About Us', href: 'https://fleetmate.au/about-us/' },
  { label: 'Services', href: 'https://fleetmate.au/services/' },
  { label: 'Industries', href: 'https://fleetmate.au/industries/' },
  { label: 'Blogs', href: 'https://fleetmate.au/blogs/' },
  { label: 'Shop', href: 'https://fleetmate.au/shop/' },
  { label: 'Contact Us', href: 'https://fleetmate.au/contacts/' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <nav
          className="bg-nav rounded-2xl px-6 py-3 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a href="https://fleetmate.au/" className="flex-shrink-0" aria-label="Fleet Mate home">
            <img src={logo} alt="Fleet Mate GPS fleet tracking Australia logo" className="h-12 w-auto" />
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="https://fleetmate.au/contacts/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-widest px-6 py-3 rounded-full hover:opacity-90 transition-all"
            >
              Get a Quote
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-primary-foreground p-1"
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-nav rounded-2xl mt-2 px-6 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground py-2 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://fleetmate.au/contacts/"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-3 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-widest px-6 py-3 rounded-full text-center hover:opacity-90 transition-all"
            >
              Get a Quote
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
