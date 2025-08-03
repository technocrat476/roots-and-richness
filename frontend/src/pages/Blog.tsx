
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Clock, Search } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import SocialShare from '@/components/ui/SocialShare';
import PageSEO from '@/components/SEO/PageSEO';
import { usePerformance } from '@/hooks/usePerformance';

const Blog = () => {
  usePerformance('Blog Page');
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const blogPosts = [
    {
      id: '1',
      title: 'Wood-Pressed Oils vs Refined Oils: Complete Comparison Guide',
      slug: 'wood-pressed-oil-traditional-methods',
      excerpt: 'Discover why wood-pressed oils retain 40% more nutrients than refined oils and how traditional extraction methods preserve essential vitamins and antioxidants.',
      author: 'Priya Sharma',
      date: '2024-01-15',
      category: 'Health & Wellness',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=400&fit=crop',
      readTime: '5 min read',
      featured: true,
      tags: ['wood-pressed oil', 'health benefits', 'nutrition']
    },
    {
      id: '2',
      title: 'Supporting Tribal Communities Through Fair Trade Practices',
      slug: 'supporting-tribal-communities',
      excerpt: 'How our direct partnerships with 150+ tribal farmers ensure fair wages, sustainable farming, and preserve traditional agricultural knowledge.',
      author: 'Arjun Patel',
      date: '2024-01-10',
      category: 'Sustainability',
      image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600&h=400&fit=crop',
      readTime: '7 min read',
      featured: true,
      tags: ['fair trade', 'tribal farmers', 'sustainability']
    },
    {
      id: '3',
      title: '10 Science-Backed Benefits of Raw Forest Honey',
      slug: 'health-benefits-raw-forest-honey',
      excerpt: 'Clinical studies reveal how raw forest honey boosts immunity, aids digestion, and provides powerful antioxidants missing in processed honey.',
      author: 'Dr. Meera Singh',
      date: '2024-01-05',
      category: 'Health & Wellness',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=400&fit=crop',
      readTime: '6 min read',
      featured: false,
      tags: ['raw honey', 'immunity', 'antioxidants']
    },
    {
      id: '4',
      title: 'Sustainable Farming: Regenerative Agriculture Impact',
      slug: 'sustainable-farming-future',
      excerpt: 'How regenerative farming practices increase soil health by 60% while producing higher-quality natural products with minimal environmental impact.',
      author: 'Rajesh Kumar',
      date: '2024-01-01',
      category: 'Sustainability',
      image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=400&fit=crop',
      readTime: '8 min read',
      featured: false,
      tags: ['regenerative farming', 'soil health', 'environment']
    },
    {
      id: '5',
      title: 'Turmeric: Golden Spice with Proven Anti-Inflammatory Power',
      slug: 'turmeric-golden-spice-wellness',
      excerpt: 'Research shows organic turmeric contains 3x more curcumin than conventional varieties, offering superior anti-inflammatory and healing properties.',
      author: 'Dr. Meera Singh',
      date: '2023-12-28',
      category: 'Health & Wellness',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=400&fit=crop',
      readTime: '4 min read',
      featured: false,
      tags: ['turmeric', 'curcumin', 'anti-inflammatory']
    },
    {
      id: '6',
      title: 'Single-Origin Coffee: From Tribal Farms to Your Cup',
      slug: 'tribal-coffee-journey',
      excerpt: 'Follow the journey of shade-grown Arabica coffee from 4,000ft elevation tribal farms, processed using traditional methods for exceptional flavor.',
      author: 'Arjun Patel',
      date: '2023-12-25',
      category: 'Products',
      image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600&h=400&fit=crop',
      readTime: '6 min read',
      featured: false,
      tags: ['coffee', 'single-origin', 'tribal farms']
    }
  ];

  const categories = ['All', 'Health & Wellness', 'Sustainability', 'Products'];
  
  // Filter posts based on category and search
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const seoData = {
    title: "Natural Wellness Blog - Health Tips & Sustainable Living | Roots & Richness",
    description: "Discover expert insights on natural wellness, traditional remedies, and sustainable living. Learn about wood-pressed oils, organic products, and healthy lifestyle tips.",
    keywords: "natural wellness blog, wood-pressed oils, organic products, sustainable living, traditional remedies, health tips, tribal farming",
    canonicalUrl: "https://rootsandrichness.in/blog",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Roots & Richness Wellness Blog",
      "description": "Expert insights on natural wellness, traditional remedies, and sustainable living",
      "url": "https://rootsandrichness.in/blog",
      "author": {
        "@type": "Organization",
        "name": "Roots & Richness"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Roots & Richness",
        "logo": {
          "@type": "ImageObject",
          "url": "https://rootsandrichness.in/logo.png"
        }
      }
    }
  };

  return (
    <>
      <PageSEO {...seoData} />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-16 lg:py-20 bg-gradient-to-br from-neutral-light to-white">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              <h1 className="text-3xl lg:text-5xl font-playfair font-bold text-secondary">
                Natural Wellness & Traditional Wisdom
              </h1>
              <p className="text-lg lg:text-xl text-neutral-medium leading-relaxed">
                Expert insights on sustainable living, traditional remedies, and the science behind natural products. 
                Learn from our community of wellness experts and farming partners.
              </p>
              
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto pt-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-medium" size={20} />
                  <Input
                    type="text"
                    placeholder="Search articles, topics, or ingredients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <SocialShare variant="blog-header" className="justify-center" />
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12 lg:py-16">
          {/* Category Filter */}
          <section className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button 
                  key={category} 
                  variant={selectedCategory === category ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "btn-primary" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </section>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl lg:text-3xl font-playfair font-bold text-secondary mb-8">Featured Articles</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredPosts.map((post, index) => (
                  <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={post.image}
                        alt={`${post.title} - Featured article on ${post.category.toLowerCase()}`}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-4 left-4 bg-primary text-white">
                        Featured
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm text-neutral-medium">
                          <Badge variant="outline">{post.category}</Badge>
                          <div className="flex items-center space-x-1">
                            <Clock size={14} />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        
                        <div>
                          <Link to={`/blog/${post.slug}`}>
                            <h3 className="text-xl font-playfair font-bold text-secondary group-hover:text-primary transition-colors line-clamp-2 mb-2">
                              {post.title}
                            </h3>
                          </Link>
                          <p className="text-neutral-medium line-clamp-3">
                            {post.excerpt}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-neutral-medium">
                            <div className="flex items-center space-x-1">
                              <User size={14} />
                              <span>{post.author}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar size={14} />
                              <span>{new Date(post.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                          
                          <Link to={`/blog/${post.slug}`}>
                            <Button variant="ghost" size="sm" className="group">
                              Read More
                              <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Regular Posts */}
          <section>
            <h2 className="text-2xl font-playfair font-bold text-secondary mb-8">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <Card key={post.id} className="group hover:shadow-lg transition-shadow duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={post.image}
                      alt={`${post.title} - Article about ${post.tags.join(', ')}`}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <Badge variant="outline">{post.category}</Badge>
                        <div className="flex items-center space-x-1 text-neutral-medium">
                          <Clock size={14} />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      
                      <div>
                        <Link to={`/blog/${post.slug}`}>
                          <h3 className="text-lg font-playfair font-semibold text-secondary group-hover:text-primary transition-colors line-clamp-2 mb-2">
                            {post.title}
                          </h3>
                        </Link>
                        <p className="text-sm text-neutral-medium line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-xs text-neutral-medium">
                        <div className="flex items-center space-x-1">
                          <User size={12} />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar size={12} />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <Link to={`/blog/${post.slug}`}>
                        <Button variant="ghost" size="sm" className="w-full group">
                          Read Article
                          <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-playfair font-semibold text-secondary mb-2">No articles found</h3>
              <p className="text-neutral-medium mb-4">Try adjusting your search or category filter</p>
              <Button onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}>
                Clear Filters
              </Button>
            </div>
          )}

          {/* Load More */}
          {filteredPosts.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          )}
        </div>

        {/* Newsletter Subscription */}
        <section className="py-16 bg-secondary text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl font-playfair font-bold">
                Stay Informed on Natural Wellness
              </h2>
              <p className="text-gray-300">
                Get weekly insights on natural remedies, sustainable living tips, and exclusive product updates
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-neutral-dark"
                  aria-label="Email address for newsletter subscription"
                />
                <Button className="btn-primary">
                  Subscribe
                </Button>
              </div>
              <div className="pt-4">
                <SocialShare variant="footer" className="justify-center" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog;
