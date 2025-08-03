import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingCart, Star, Truck, Shield, Phone, Brain, Heart, Flame, Droplet, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import AutoplayHero from '@/components/ui/AutoplayHero';
import HomeSEO from '@/components/SEO/HomeSEO';
import HealthBenefitsSection from '@/components/sections/HealthBenefitsSection';
import StickyCheckoutButton from '@/components/ui/StickyCheckoutButton';

const Index = () => {
  const { dispatch } = useCart();
  const featuredProducts = products.filter(product => product.featured);

  const handleAddToCart = (product: any) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        slug: product.slug
      }
    });
  };

  return (
    <div className="min-h-screen">
      <HomeSEO />

      {/* Mobile-First Meta Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Autoplay Hero Section - Mobile Optimized */}
      <AutoplayHero interval={4000} />

      {/* Main Content with Mobile-First Structure */}
      <main>
        {/* Hero Content Section - Mobile First */}
        <section className="py-8 sm:py-12 lg:py-16 bg-white text-center">
          <div className="container mx-auto px-4 sm:px-6">
            <h1 className="text-2xl sm:text-3xl lg:text-6xl font-playfair font-bold text-secondary mb-4 sm:mb-6 leading-tight">
              Pure Wood-Pressed Oils, Handpicked from Indian Farms
            </h1>
            <p className="text-base sm:text-lg lg:text-2xl text-neutral-medium mb-6 sm:mb-8 max-w-2xl lg:max-w-4xl mx-auto leading-relaxed">
              Cold-pressed, chemical-free, and full of flavor — just like nature intended.
            </p>
            
            {/* Brand Pillars - Mobile Stacked */}
            <div className="flex flex-col sm:grid sm:grid-cols-3 gap-3 sm:gap-6 max-w-xs sm:max-w-3xl mx-auto mb-8 sm:mb-12">
              <div className="flex items-center justify-center space-x-3 p-3 sm:p-0">
                <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0"></div>
                <span className="text-sm sm:text-lg font-medium text-secondary">Wood-Pressed, Not Refined</span>
              </div>
              <div className="flex items-center justify-center space-x-3 p-3 sm:p-0">
                <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0"></div>
                <span className="text-sm sm:text-lg font-medium text-secondary">From Small Farms</span>
              </div>
              <div className="flex items-center justify-center space-x-3 p-3 sm:p-0">
                <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0"></div>
                <span className="text-sm sm:text-lg font-medium text-secondary">No Additives</span>
              </div>
            </div>

            <Link to="/products">
              <Button size="lg" className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 min-h-[48px]">
                Explore Our Oils
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </section>

        {/* Featured Products Grid - Mobile First */}
        <section id="featured-products" className="py-8 sm:py-12 lg:py-20 bg-neutral-light">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-bold text-secondary">
                Our Featured Products
              </h2>
              <p className="text-base sm:text-lg text-neutral-medium max-w-xl sm:max-w-2xl mx-auto px-4">
                Handpicked premium products that bring the best of nature's goodness to your doorstep
              </p>
            </div>

            {/* Mobile-First Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {featuredProducts.map((product, index) => (
                <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="relative overflow-hidden rounded-t-lg">
                    <picture>
                      <source 
                        media="(max-width: 640px)" 
                        srcSet={`${product.images[0]}?w=320&h=240`} 
                      />
                      <img
                        src={product.images[0]}
                        alt={`${product.name} - Pure wood-pressed oil from Roots and Richness, sourced directly from Indian farms`}
                        className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        loading={index < 3 ? 'eager' : 'lazy'}
                        width="320"
                        height="240"
                      />
                    </picture>
                    {product.originalPrice && (
                      <div className="absolute top-3 left-3 bg-accent text-white px-2 py-1 rounded-lg text-xs sm:text-sm font-medium">
                        Save ₹{product.originalPrice - product.price}
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4 sm:p-6">
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <h3 className="text-base sm:text-lg font-playfair font-semibold text-secondary group-hover:text-primary transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-sm text-neutral-medium mt-1 line-clamp-2">
                          {product.shortDescription}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-x-2">
                          <span className="text-lg sm:text-xl font-bold text-secondary">
                            ₹{product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-neutral-medium line-through">
                              ₹{product.originalPrice}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="text-primary fill-current" size={14} />
                          <span className="text-sm text-neutral-medium">4.8</span>
                        </div>
                      </div>

                      {/* Mobile-Friendly Button Layout */}
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                        <Link to={`/products/${product.slug}`} className="flex-1">
                          <Button variant="outline" className="w-full min-h-[44px] text-sm">
                            View Details
                          </Button>
                        </Link>
                        <Button 
                          onClick={() => handleAddToCart(product)}
                          className="btn-primary min-h-[44px] sm:w-auto w-full"
                          aria-label={`Add ${product.name} to cart`}
                        >
                          <ShoppingCart size={16} className="mr-2 sm:mr-0" />
                          <span className="sm:hidden">Add to Cart</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8 sm:mt-12">
              <Link to="/products">
                <Button size="lg" className="btn-primary min-h-[48px] px-6 sm:px-8">
                  View All Products
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Health Benefits Section - Mobile Optimized */}
        <HealthBenefitsSection />

        {/* Brand Story Section - Mobile First */}
        <section id="brand-story" className="py-8 sm:py-12 lg:py-20 bg-neutral-light">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-2xl lg:max-w-4xl mx-auto text-center space-y-4 sm:space-y-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-bold text-secondary">
                Purity, Tradition, and Transparency
              </h2>
              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-neutral-medium leading-relaxed">
                <p>
                  At Roots and Richness, we bring you pure, chemical-free wellness — sourced directly from Indian farms and tribal communities. Our products are made with traditional wood-pressed methods to preserve nutrition and authenticity.
                </p>
                <p className="hidden sm:block">
                  We started this journey to reconnect people with traditional Indian wellness practices. Every bottle tells a story of generations-old wisdom, sustainable farming, and the dedication of farmers who understand that the best products come from patience and care.
                </p>
                <blockquote className="text-lg sm:text-xl italic text-primary border-l-4 border-primary pl-4 sm:pl-6 my-6 sm:my-8">
                  "We never refine. We never rush. We never compromise."
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile-Optimized Testimonials Section */}
        <section id="testimonials" className="py-8 sm:py-12 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-bold text-secondary">
                What Our Customers Say
              </h2>
              <p className="text-base sm:text-lg text-neutral-medium max-w-xl sm:max-w-2xl mx-auto">
                Real experiences from our valued customers who trust our natural products
              </p>
            </div>

            <div className="space-y-6 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-8 max-w-4xl mx-auto">
              <blockquote className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
                <p className="text-base sm:text-lg text-neutral-dark italic mb-4 sm:mb-6 leading-relaxed">
                  "The groundnut oil reminds me of my grandmother's kitchen — so pure and flavorful. I can taste the difference in every dish I make."
                </p>
                <footer className="text-secondary font-semibold">
                  — Priya K., Mumbai
                </footer>
              </blockquote>

              <blockquote className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
                <p className="text-base sm:text-lg text-neutral-dark italic mb-4 sm:mb-6 leading-relaxed">
                  "Finally found authentic mustard oil that doesn't compromise on quality. The traditional wood-pressing method really makes a difference."
                </p>
                <footer className="text-secondary font-semibold">
                  — Rajesh S., Delhi
                </footer>
              </blockquote>
            </div>
          </div>
        </section>

        {/* Why Choose Us - Mobile Optimized */}
        <section className="py-8 sm:py-12 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-bold text-secondary">
                Why Choose Roots & Richness?
              </h2>
              <p className="text-base sm:text-lg text-neutral-medium max-w-xl sm:max-w-2xl mx-auto">
                We're committed to bringing you the finest natural products with complete transparency and care
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {[
                {
                  icon: "🌿",
                  title: "100% Natural & Pure",
                  description: "No artificial additives, preservatives, or chemicals. Every product is tested for purity and authenticity."
                },
                {
                  icon: "🏔️",
                  title: "Direct from Source",
                  description: "Sourced directly from farmers and tribal communities, ensuring fair trade and authentic quality."
                },
                {
                  icon: "🔬",
                  title: "Traditional Methods",
                  description: "Wood-pressed oils and time-honored processing techniques that preserve nutrition and flavor."
                },
                {
                  icon: "🚚",
                  title: "Fast & Secure Delivery",
                  description: "Quick delivery with proper packaging to ensure freshness reaches your doorstep safely."
                },
                {
                  icon: "💚",
                  title: "Sustainable & Ethical",
                  description: "Supporting sustainable farming practices and empowering rural farming communities."
                },
                {
                  icon: "🎯",
                  title: "Customer Satisfaction",
                  description: "Dedicated support team and 7-day easy return policy for your complete satisfaction."
                }
              ].map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="text-3xl sm:text-4xl mb-3 sm:mb-4" role="img" aria-label={feature.title}>{feature.icon}</div>
                    <h3 className="text-base sm:text-lg font-playfair font-semibold text-secondary mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-medium leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter - Mobile Optimized */}
        <section className="py-8 sm:py-12 lg:py-20 bg-secondary text-white">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <div className="max-w-xl sm:max-w-2xl mx-auto space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl font-playfair font-bold">
                Join the Roots & Richness Family
              </h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Subscribe to our newsletter for wellness tips, traditional recipes, product updates, and exclusive offers from our farming community
              </p>
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 max-w-sm sm:max-w-md mx-auto">
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-neutral-dark text-base min-h-[48px]"
                  aria-label="Enter your email for newsletter subscription"
                />
                <Button className="btn-primary min-h-[48px] px-6">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs sm:text-sm text-gray-400">
                Join 10,000+ customers who trust our natural wellness products
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky Checkout Button */}
      <StickyCheckoutButton />
    </div>
  );
};

export default Index;
