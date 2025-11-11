import Link from 'next/link';
import { Instagram, Youtube, Mail, MapPin, Phone, Heart } from 'lucide-react';
import { siteConfig, navItems } from '@/lib/config';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-warm border-t border-neutral-200">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-bold text-neutral-900">
              Artisanal Kaleidoscope
            </h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Handcrafted silk-thread jewelry from the heart of Mysuru. Each piece is a testament to tradition, artistry, and passion.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white hover:bg-primary-50 text-neutral-700 hover:text-primary-600 transition-all shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.links.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white hover:bg-primary-50 text-neutral-700 hover:text-primary-600 transition-all shadow-sm"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="p-2 rounded-full bg-white hover:bg-primary-50 text-neutral-700 hover:text-primary-600 transition-all shadow-sm"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold text-neutral-900">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-neutral-600 hover:text-primary-600 transition-colors text-sm"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold text-neutral-900">
              Collections
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/collections#bangles"
                  className="text-neutral-600 hover:text-primary-600 transition-colors text-sm"
                >
                  Silk Thread Bangles
                </Link>
              </li>
              <li>
                <Link
                  href="/collections#earrings"
                  className="text-neutral-600 hover:text-primary-600 transition-colors text-sm"
                >
                  Artisan Earrings
                </Link>
              </li>
              <li>
                <Link
                  href="/collections#bridal"
                  className="text-neutral-600 hover:text-primary-600 transition-colors text-sm"
                >
                  Bridal Collection
                </Link>
              </li>
              <li>
                <Link
                  href="/collections#festive"
                  className="text-neutral-600 hover:text-primary-600 transition-colors text-sm"
                >
                  Festive Designs
                </Link>
              </li>
              <li>
                <Link
                  href="/collections#custom"
                  className="text-neutral-600 hover:text-primary-600 transition-colors text-sm"
                >
                  Custom Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold text-neutral-900">
              Get in Touch
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 text-sm">
                <MapPin className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                <span className="text-neutral-600">
                  {siteConfig.contact.address}
                </span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="w-5 h-5 text-primary-600 flex-shrink-0" />
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="text-neutral-600 hover:text-primary-600 transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="w-5 h-5 text-primary-600 flex-shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-neutral-600 hover:text-primary-600 transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-300">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-600">
            <p className="flex items-center gap-1">
              © {currentYear} Artisanal Kaleidoscope. Handcrafted with
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              in Mysuru
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-primary-600 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary-600 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
