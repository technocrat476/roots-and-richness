import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

// Safe hook that works during SSR
const useSafeLocation = () => {
  try {
    const { useLocation } = require('react-router-dom');
    return useLocation();
  } catch {
    return { pathname: '/' };
  }
};

const useSafeNavigate = () => {
  try {
    const { useNavigate } = require('react-router-dom');
    return useNavigate();
  } catch {
    return () => {};
  }
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const { state: cartState } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    // If already on the same page, don't navigate
    if (location.pathname === href) return;
    
    // Navigate immediately without any delay
    navigate(href);
    
    // Reset any loading state immediately
    setIsNavigating(false);
  };

  const isHomePage = location.pathname === '/';

  return (
    <header className="bg-white shadow-sm border-b border-neutral-light sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Mobile Menu Button - Left Side */}
          <Sheet open={isMenuOpen} onOpenChange={(open) => {
            console.log('Sheet onOpenChange:', open);
            setIsMenuOpen(open);
          }}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden min-w-[48px] min-h-[48px] p-0 mr-3"
                aria-label="Open menu"
                onClick={() => console.log('Menu button clicked')}
              >
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:w-80 p-0">
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="p-6 border-b border-neutral-light">
                  <div className="text-xl font-playfair font-bold text-secondary">
                    Roots & Richness
                  </div>
                </div>
                
                {/* Mobile Navigation */}
                <nav className="flex-1 px-6 py-4">
                  <div className="space-y-1">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        className={`block font-medium text-lg py-3 px-4 rounded-lg transition-colors hover:bg-neutral-light ${
                          isActive(item.href) ? 'text-primary bg-primary/10' : 'text-neutral-dark'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </nav>

                {/* Mobile Search */}
                <div className="p-6 border-t border-neutral-light">
                  <button className="flex items-center space-x-3 w-full p-4 hover:bg-neutral-light rounded-lg transition-colors">
                    <Search size={20} className="text-neutral-dark" />
                    <span className="text-neutral-dark font-medium">Search Products</span>
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo - Mobile Optimized */}
          <Link to="/" className="flex items-center space-x-2 min-w-0 flex-1 sm:flex-none">
            <div className="text-lg sm:text-2xl font-playfair font-bold text-secondary truncate">
              Roots & Richness
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`font-medium transition-colors hover:text-primary text-sm xl:text-base ${
                  isActive(item.href) ? 'text-primary' : 'text-neutral-dark'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Section - Mobile Optimized */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Icon (Desktop only) */}
            <button className="hidden md:flex p-2 hover:bg-neutral-light rounded-lg transition-colors">
              <Search size={18} className="text-neutral-dark" />
            </button>

            {/* Cart - Touch Friendly */}
            <Link
              to="/cart"
              className="flex items-center space-x-1 p-2 sm:p-3 hover:bg-neutral-light rounded-lg transition-colors relative min-w-[48px] min-h-[48px] justify-center"
            >
              <ShoppingCart size={20} className="text-neutral-dark" />
              {cartState.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {cartState.itemCount}
                </span>
              )}
            </Link>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
