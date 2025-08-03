
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Clock, ArrowLeft, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { products } from '@/data/products';
import SocialShare from '@/components/ui/SocialShare';
import PageSEO from '@/components/SEO/PageSEO';

const BlogPost = () => {
  const { slug } = useParams();

  // Mock blog post data - in real app, this would be fetched based on slug
  const post = {
    id: '1',
    title: 'The Art of Wood-Pressed Oil: Why Traditional Methods Matter',
    slug: 'wood-pressed-oil-traditional-methods',
    content: `
      <p>In our modern world of industrial processing and mass production, traditional methods of oil extraction might seem outdated. However, the ancient practice of wood-pressing oils offers benefits that modern techniques simply cannot match.</p>

      <h2>What is Wood-Pressed Oil?</h2>
      <p>Wood-pressed oil, also known as cold-pressed oil, is extracted using traditional wooden presses (called "ghani" in Hindi). This method has been used for centuries across India and other parts of the world. The process involves crushing oil seeds or nuts between wooden pestle and mortar, powered by bullocks or motors at very low speeds.</p>

      <h2>The Traditional Process</h2>
      <p>The wood-pressing process is slow and deliberate. Seeds are crushed at room temperature, ensuring that the oil retains its natural properties. This method typically yields less oil compared to modern techniques, but the quality is significantly superior.</p>

      <h2>Why Wood-Pressed Oils Are Superior</h2>
      <h3>1. Nutrient Retention</h3>
      <p>The low-temperature extraction process preserves heat-sensitive vitamins, antioxidants, and essential fatty acids that are often destroyed in high-heat industrial processes.</p>

      <h3>2. No Chemical Solvents</h3>
      <p>Unlike refined oils that use chemical solvents for extraction, wood-pressed oils are purely mechanical, ensuring no chemical residues in the final product.</p>

      <h3>3. Natural Flavor and Aroma</h3>
      <p>The gentle extraction preserves the natural taste and aroma of the source material, giving wood-pressed oils their distinctive, rich flavors.</p>

      <h2>Health Benefits</h2>
      <p>Wood-pressed oils offer numerous health benefits:</p>
      <ul>
        <li>Higher levels of antioxidants and vitamins</li>
        <li>Better absorption of fat-soluble vitamins</li>
        <li>Improved heart health due to balanced fatty acid profiles</li>
        <li>Enhanced immune system support</li>
      </ul>

      <h2>Environmental Impact</h2>
      <p>Traditional wood-pressing is environmentally sustainable. It requires less energy, produces no chemical waste, and supports local farming communities. By choosing wood-pressed oils, you're not just making a health-conscious choice, but also an environmentally responsible one.</p>

      <h2>Conclusion</h2>
      <p>While modern industrial processes might be faster and more cost-effective, they cannot replicate the quality and nutritional value of traditional wood-pressed oils. At Roots & Richness, we're committed to preserving these time-tested methods, ensuring that you receive oils in their purest, most nutritious form.</p>
    `,
    author: 'Priya Sharma',
    date: '2024-01-15',
    category: 'Health & Wellness',
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800&h=400&fit=crop',
    readTime: '5 min read',
    // SEO: Related product keywords for contextual linking
    relatedKeywords: ['wood-pressed', 'oil', 'coconut', 'sesame', 'groundnut', 'natural', 'organic']
  };

  // Find related products based on blog content keywords
  const getRelatedProducts = (keywords: string[]) => {
    return products.filter(product => {
      const productText = `${product.name} ${product.shortDescription} ${product.description}`.toLowerCase();
      return keywords.some(keyword => productText.includes(keyword.toLowerCase()));
    }).slice(0, 3);
  };

  const relatedProducts = getRelatedProducts(post.relatedKeywords);

  const relatedPosts = [
    {
      id: '2',
      title: 'Supporting Tribal Communities: Our Direct Trade Journey',
      slug: 'supporting-tribal-communities',
      image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=200&fit=crop',
      category: 'Sustainability'
    },
    {
      id: '3',
      title: '10 Health Benefits of Raw Forest Honey',
      slug: 'health-benefits-raw-forest-honey',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=200&fit=crop',
      category: 'Health & Wellness'
    }
  ];

  const currentUrl = window.location.href;

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-playfair font-bold text-secondary">Post Not Found</h1>
          <Link to="/blog">
            <Button className="btn-primary">
              <ArrowLeft size={16} className="mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-neutral-light py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-neutral-medium hover:text-primary">Home</Link>
            <span className="text-neutral-medium">/</span>
            <Link to="/blog" className="text-neutral-medium hover:text-primary">Blog</Link>
            <span className="text-neutral-medium">/</span>
            <span className="text-secondary font-medium">{post.title}</span>
          </div>
        </div>
      </div>

      <article className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="space-y-6 mb-12">
            <div className="flex items-center space-x-4">
              <Link to="/blog">
                <Button variant="outline" size="sm">
                  <ArrowLeft size={16} className="mr-2" />
                  Back to Blog
                </Button>
              </Link>
              <Badge>{post.category}</Badge>
            </div>

            <h1 className="text-3xl lg:text-5xl font-playfair font-bold text-secondary leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-col gap-4">
              <div className="flex items-center space-x-6 text-sm text-neutral-medium">
                <div className="flex items-center space-x-2">
                  <User size={16} />
                  <span>By {post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar size={16} />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={16} />
                  <span>{post.readTime}</span>
                </div>
              </div>
              
              <SocialShare 
                variant="blog-header" 
                url={currentUrl} 
                title={post.title}
                className="pt-2 border-t border-neutral-light"
              />
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative mb-12">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 lg:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div
              className="text-neutral-medium leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Related Products Section - SEO Backlinks */}
          {relatedProducts.length > 0 && (
            <section className="mt-12 p-8 bg-neutral-light rounded-2xl">
              <h3 className="text-2xl font-playfair font-bold text-secondary mb-6">
                Featured Products Mentioned in This Article
              </h3>
              <p className="text-neutral-medium mb-6">
                Experience the premium wood-pressed oils we discussed in this article. Each product is traditionally processed and sourced directly from farmers.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProducts.map((product) => (
                  <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={product.images[0]}
                        alt={`${product.name} - As featured in ${post.title}`}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.originalPrice && (
                        <Badge className="absolute top-3 left-3 bg-accent text-white">
                          Save ₹{product.originalPrice - product.price}
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-playfair font-semibold text-secondary mb-2 line-clamp-2">
                        {product.name}
                      </h4>
                      <p className="text-sm text-neutral-medium mb-3 line-clamp-2">
                        {product.shortDescription}
                      </p>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="text-lg font-bold text-secondary">
                            ₹{product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-neutral-medium line-through ml-2">
                              ₹{product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Link to={`/products/${product.slug}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">
                            View Product
                          </Button>
                        </Link>
                        <Link to={`/products/${product.slug}`}>
                          <Button size="sm" className="btn-primary">
                            <ShoppingCart size={14} />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* CTA to view all products */}
              <div className="text-center mt-8">
                <Link to="/products">
                  <Button className="btn-primary">
                    Explore All Our Premium Products
                  </Button>
                </Link>
              </div>
            </section>
          )}

          {/* Article Footer with Social Share */}
          <footer className="mt-16 pt-8 border-t border-neutral-light space-y-6">
            <SocialShare 
              variant="blog-footer" 
              url={currentUrl} 
              title={post.title}
            />
            
            <Separator />
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-2">
                <h3 className="font-playfair font-semibold text-secondary">About the Author</h3>
                <p className="text-sm text-neutral-medium">
                  {post.author} is our Quality Head with expertise in traditional processing methods and quality assurance.
                </p>
              </div>
              
              <Button variant="outline">
                View All Posts by {post.author}
              </Button>
            </div>
          </footer>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-neutral-light">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-playfair font-bold text-secondary mb-8">Related Articles</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="group hover:shadow-lg transition-shadow">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <Badge variant="outline" className="mb-3">{relatedPost.category}</Badge>
                      <Link to={`/blog/${relatedPost.slug}`}>
                        <h3 className="font-playfair font-semibold text-secondary group-hover:text-primary transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-playfair font-bold">
              Stay Informed
            </h2>
            <p className="text-gray-300">
              Get the latest articles on wellness, sustainability, and natural living delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-neutral-dark"
              />
              <Button className="btn-primary">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
