
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import SocialShare from '@/components/ui/SocialShare';

const Footer = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const footerSections = [
    {
      id: 'links',
      title: 'Quick Links',
      content: (
        <div className="space-y-2">
          <Link to="/products" className="block text-gray-300 hover:text-primary transition-colors text-sm py-1">
            All Products
          </Link>
          <Link to="/about" className="block text-gray-300 hover:text-primary transition-colors text-sm py-1">
            About Us
          </Link>
          <Link to="/blog" className="block text-gray-300 hover:text-primary transition-colors text-sm py-1">
            Blog
          </Link>
          <Link to="/contact" className="block text-gray-300 hover:text-primary transition-colors text-sm py-1">
            Contact
          </Link>
        </div>
      )
    },
    {
      id: 'care',
      title: 'Customer Care',
      content: (
        <div className="space-y-2">
          <Link to="/shipping-policy" className="block text-gray-300 hover:text-primary transition-colors text-sm py-1">
            Shipping Policy
          </Link>
          <Link to="/return-refund-policy" className="block text-gray-300 hover:text-primary transition-colors text-sm py-1">
            Return Policy
          </Link>
          <Link to="/privacy-policy" className="block text-gray-300 hover:text-primary transition-colors text-sm py-1">
            Privacy Policy
          </Link>
          <Link to="/terms-and-conditions" className="block text-gray-300 hover:text-primary transition-colors text-sm py-1">
            Terms of Service
          </Link>
        </div>
      )
    }
  ];

  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Mobile-First Layout */}
        <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Company Info - Always Visible */}
          <div className="space-y-4">
            <h3 className="text-xl font-playfair font-bold">Roots & Richness</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Bringing you premium, authentic products directly from nature's source. 
              Traditional methods, modern quality standards.
            </p>
            <div className="space-y-3">
              <p className="text-sm font-medium">Follow Us</p>
              <SocialShare variant="footer" />
            </div>
          </div>

          {/* Mobile Accordion Sections */}
          <div className="lg:hidden space-y-4">
            {footerSections.map((section) => (
              <div key={section.id} className="border-b border-gray-700 pb-4">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="flex items-center justify-between w-full text-left py-2"
                  aria-expanded={openSections[section.id]}
                >
                  <h4 className="text-lg font-playfair font-semibold">{section.title}</h4>
                  {openSections[section.id] ? (
                    <ChevronUp size={20} className="text-gray-400" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-400" />
                  )}
                </button>
                {openSections[section.id] && (
                  <div className="mt-3 pl-2">
                    {section.content}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:block space-y-4">
            <h4 className="text-lg font-playfair font-semibold">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/products" className="block text-gray-300 hover:text-primary transition-colors text-sm">
                All Products
              </Link>
              <Link to="/about" className="block text-gray-300 hover:text-primary transition-colors text-sm">
                About Us
              </Link>
              <Link to="/blog" className="block text-gray-300 hover:text-primary transition-colors text-sm">
                Blog
              </Link>
              <Link to="/contact" className="block text-gray-300 hover:text-primary transition-colors text-sm">
                Contact
              </Link>
            </div>
          </div>

          <div className="hidden lg:block space-y-4">
            <h4 className="text-lg font-playfair font-semibold">Customer Care</h4>
            <div className="space-y-2">
              <Link to="/shipping-policy" className="block text-gray-300 hover:text-primary transition-colors text-sm">
                Shipping Policy
              </Link>
              <Link to="/return-refund-policy" className="block text-gray-300 hover:text-primary transition-colors text-sm">
                Return Policy
              </Link>
              <Link to="/privacy-policy" className="block text-gray-300 hover:text-primary transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms-and-conditions" className="block text-gray-300 hover:text-primary transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-playfair font-semibold">Contact Info</h4>
            <div className="space-y-3">
              <a 
                href="mailto:hello@rootsandrichness.com"
                className="flex items-center space-x-3 hover:text-primary transition-colors"
              >
                <Mail size={16} className="text-primary flex-shrink-0" />
                <span className="text-gray-300 text-sm">hello@rootsandrichness.com</span>
              </a>
              <a 
                href="tel:+919876543210"
                className="flex items-center space-x-3 hover:text-primary transition-colors"
              >
                <Phone size={16} className="text-primary flex-shrink-0" />
                <span className="text-gray-300 text-sm">+91 98765 43210</span>
              </a>
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6 sm:pt-8 flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
          <p className="text-gray-400 text-sm text-center sm:text-left">
            © 2024 Roots & Richness. All rights reserved.
          </p>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-center sm:text-left">
            <span className="text-gray-400 text-sm">🚚 Free Shipping</span>
            <span className="text-gray-400 text-sm">🔒 Secure Payment</span>
            <span className="text-gray-400 text-sm">📞 24/7 Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
