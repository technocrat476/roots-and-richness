
import { Users, Leaf, Heart, Award, MapPin, Clock, Handshake } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import PageSEO from '@/components/SEO/PageSEO';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

const About = () => {
  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us' }
  ];

  // Enhanced structured data for About page
  const aboutPageStructuredData = [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Roots and Richness - Our Story of Traditional Wellness",
      "description": "Learn about Roots and Richness - India's trusted source for wood-pressed oils and natural wellness products, sourced directly from tribal communities and small farms",
      "url": "https://rootsandrichness.in/about",
      "mainEntity": {
        "@type": "Organization",
        "name": "Roots and Richness",
        "foundingDate": "2018",
        "founder": {
          "@type": "Person",
          "name": "Rajesh Kumar"
        },
        "mission": "To bring pure, traditional wellness products from Indian farms and tribal communities to modern homes",
        "numberOfEmployees": "25-50",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "123 Green Valley Road",
          "addressLocality": "Mumbai",
          "addressRegion": "Maharashtra",
          "postalCode": "400001",
          "addressCountry": "IN"
        }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Roots and Richness",
      "url": "https://rootsandrichness.in",
      "logo": "https://rootsandrichness.in/logo.png",
      "description": "Premium natural wellness products including wood-pressed oils, tribal-sourced coffee, and traditional wellness items sourced directly from Indian farms and tribal communities.",
      "foundingDate": "2018",
      "sameAs": [
        "https://www.instagram.com/rootsandrichness",
        "https://www.facebook.com/rootsandrichness"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageSEO 
        title="About Roots and Richness - Traditional Wellness from Indian Farms | Our Story"
        description="Discover the story behind Roots and Richness - India's trusted source for authentic wood-pressed oils and natural wellness products. Learn about our mission to connect you with traditional Indian wellness through direct partnerships with farmers and tribal communities."
        keywords="about roots and richness, wood-pressed oils story, traditional indian wellness, farm direct products, tribal partnerships, sustainable farming india, authentic oil processing"
        canonicalUrl="https://rootsandrichness.in/about"
        structuredData={aboutPageStructuredData}
      />

      {/* Breadcrumb */}
      <div className="bg-neutral-light py-4">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-light to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-secondary">
                Our Story of
                <span className="text-primary block">Traditional Wellness</span>
              </h1>
              <p className="text-lg text-neutral-medium leading-relaxed">
                Born from a deep respect for ancient Indian wisdom and a commitment to bringing you 
                the purest natural products, Roots & Richness connects modern wellness seekers 
                directly with the time-honored traditions of Indian farms and tribal communities.
              </p>
              <p className="text-neutral-medium leading-relaxed">
                We believe that the best wellness products come from the earth, crafted by hands that 
                understand generations-old wisdom. Every product tells a story of tradition, 
                sustainability, and genuine care for both people and planet.
              </p>
              
              {/* Key stats */}
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-sm text-neutral-medium">Farm Families</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">6</div>
                  <div className="text-sm text-neutral-medium">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">10,000+</div>
                  <div className="text-sm text-neutral-medium">Happy Customers</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=600&fit=crop"
                alt="Traditional Indian farming - Roots and Richness partners with local farmers for authentic wood-pressed oils"
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">100%</div>
                  <div className="text-sm text-neutral-medium">Chemical-Free</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission - Enhanced */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-secondary">
              Our Mission & Core Values
            </h2>
            <p className="text-lg text-neutral-medium max-w-3xl mx-auto">
              We're driven by principles that guide every partnership we form and every product we bring to your table
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Leaf className="text-primary" size={40} />,
                title: "Sustainability First",
                description: "Supporting regenerative farming practices that heal the soil and protect biodiversity. Our partners use traditional methods that have sustained Indian agriculture for centuries."
              },
              {
                icon: <Handshake className="text-primary" size={40} />,
                title: "Fair Trade Partners",
                description: "Direct partnerships with tribal communities and small farmers, ensuring fair prices and supporting local livelihoods. No middlemen, just honest relationships."
              },
              {
                icon: <Heart className="text-primary" size={40} />,
                title: "Pure & Authentic",
                description: "Zero compromise on quality. Every product is 100% natural, traditionally processed, and free from chemicals, preservatives, and artificial additives."
              },
              {
                icon: <Award className="text-primary" size={40} />,
                title: "Ancient Wisdom",
                description: "Preserving time-tested processing techniques like wood-pressing and sun-drying that maintain nutritional integrity and authentic flavors our ancestors knew."
              }
            ].map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8">
                  <div className="mb-4">{value.icon}</div>
                  <h3 className="text-xl font-playfair font-semibold text-secondary mb-3">
                    {value.title}
                  </h3>
                  <p className="text-neutral-medium text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* The Roots & Richness Difference */}
      <section className="py-20 bg-neutral-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-secondary">
              The Roots & Richness Difference
            </h2>
            <div className="bg-primary text-white p-8 rounded-2xl">
              <blockquote className="text-xl lg:text-2xl italic font-light">
                "We never refine. We never rush. We never compromise."
              </blockquote>
              <p className="mt-4 text-lg opacity-90">Our founding principle</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-playfair font-semibold text-secondary mb-4">What We Do Differently</h3>
                <ul className="space-y-3 text-left">
                  <li className="flex items-start space-x-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-neutral-medium">Direct sourcing from farmers - no middlemen, no price inflation</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-neutral-medium">Traditional wood-pressing that preserves nutrients and flavor</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-neutral-medium">Small-batch processing to ensure freshness and quality</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-neutral-medium">Complete transparency - from farm to your kitchen table</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-playfair font-semibold text-secondary mb-4">What We Never Do</h3>
                <ul className="space-y-3 text-left">
                  <li className="flex items-start space-x-3">
                    <span className="text-red-500 font-bold">✗</span>
                    <span className="text-neutral-medium">Chemical refining or processing</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-red-500 font-bold">✗</span>
                    <span className="text-neutral-medium">High-heat extraction that destroys nutrients</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-red-500 font-bold">✗</span>
                    <span className="text-red-500 font-bold">✗</span>
                    <span className="text-neutral-medium">Artificial preservatives or additives</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-red-500 font-bold">✗</span>
                    <span className="text-neutral-medium">Mass production that compromises quality</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Farmer Partners */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-secondary">
              Meet Our Farmer Partners
            </h2>
            <p className="text-lg text-neutral-medium max-w-2xl mx-auto">
              The heart of Roots & Richness lies in our partnerships with dedicated farmers and tribal communities across India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Kamla Devi",
                location: "Araku Valley, Andhra Pradesh",
                specialty: "Arabica Coffee Cultivation",
                image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
                story: "A tribal farmer leading her community in sustainable coffee cultivation at 3,000+ feet elevation. Her coffee represents generations of indigenous farming wisdom.",
                icon: <MapPin className="text-primary" size={16} />
              },
              {
                name: "Raman Singh",
                location: "Sikar, Rajasthan", 
                specialty: "Mustard Oil Production",
                image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
                story: "Third-generation mustard farmer who has perfected the art of traditional wood-pressing. His family has been producing pure mustard oil for over 60 years.",
                icon: <Clock className="text-primary" size={16} />
              },
              {
                name: "Meera Patel",
                location: "Saurashtra, Gujarat",
                specialty: "Groundnut Cultivation",
                image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
                story: "Pioneer in organic groundnut farming, her cold-pressed oils retain the rich, nutty flavor that makes our groundnut oil extraordinary.",
                icon: <Leaf className="text-primary" size={16} />
              }
            ].map((farmer, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-neutral-light rounded-full mx-auto mb-4 overflow-hidden">
                    <img
                      src={farmer.image}
                      alt={`${farmer.name} - ${farmer.specialty} partner at Roots and Richness`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-playfair font-semibold text-secondary mb-1 text-center">
                    {farmer.name}
                  </h3>
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    {farmer.icon}
                    <p className="text-primary font-medium text-sm">
                      {farmer.location}
                    </p>
                  </div>
                  <p className="text-accent text-sm font-medium text-center mb-3">
                    {farmer.specialty}
                  </p>
                  <p className="text-neutral-medium text-sm text-center leading-relaxed">
                    {farmer.story}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey & Timeline */}
      <section className="py-20 bg-neutral-light">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-secondary">
              Our Journey: From Idea to Impact
            </h2>
            <p className="text-lg text-neutral-medium max-w-2xl mx-auto">
              The story of how we're revolutionizing the way India thinks about traditional wellness
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  year: "2018",
                  title: "The Beginning",
                  description: "Started with a simple mission: bring authentic, unprocessed oils from Indian farms to urban kitchens."
                },
                {
                  year: "2019", 
                  title: "First Partnerships",
                  description: "Formed direct relationships with 50+ farming families across Rajasthan and Gujarat."
                },
                {
                  year: "2021",
                  title: "Tribal Connections",
                  description: "Expanded to partner with tribal communities in Araku Valley, introducing authentic Arabica coffee."
                },
                {
                  year: "2023",
                  title: "Digital Growth",
                  description: "Launched online platform, reaching 10,000+ customers nationwide while maintaining quality standards."
                },
                {
                  year: "2024",
                  title: "Sustainability Focus",
                  description: "Initiated regenerative farming programs, supporting 500+ families in sustainable agriculture practices."
                }
              ].map((milestone, index) => (
                <div key={index} className="flex items-start space-x-6 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex-shrink-0 w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {milestone.year}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-playfair font-semibold text-secondary mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-neutral-medium">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-secondary">
              Meet Our Leadership Team
            </h2>
            <p className="text-lg text-neutral-medium max-w-2xl mx-auto">
              Passionate individuals dedicated to revolutionizing traditional wellness in modern India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Rajesh Kumar",
                role: "Founder & CEO",
                image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
                description: "20+ years in sustainable agriculture and a vision to connect traditional Indian wellness with modern lifestyles.",
                expertise: "Sustainable Agriculture"
              },
              {
                name: "Priya Sharma", 
                role: "Head of Quality & Sourcing",
                image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
                description: "Expert in traditional processing methods and guardian of our quality standards across all product lines.",
                expertise: "Quality Assurance"
              },
              {
                name: "Arjun Patel",
                role: "Community Relations Director",
                image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
                description: "Building meaningful partnerships with farming communities and ensuring fair trade practices across India.",
                expertise: "Community Partnerships"
              }
            ].map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-neutral-light rounded-full mx-auto mb-4 overflow-hidden">
                    <img
                      src={member.image}
                      alt={`${member.name} - ${member.role} at Roots and Richness`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-playfair font-semibold text-secondary mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium text-sm mb-2">
                    {member.role}
                  </p>
                  <p className="text-accent text-xs font-medium mb-3">
                    {member.expertise}
                  </p>
                  <p className="text-neutral-medium text-sm leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-playfair font-bold">
              Join the Traditional Wellness Revolution
            </h2>
            <p className="text-gray-300 text-lg">
              Experience the difference that comes from products made with care, tradition, and a deep 
              respect for nature's wisdom. Every purchase supports farming families and preserves 
              generations of indigenous knowledge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/products" className="btn-primary inline-flex items-center justify-center px-8 py-4 rounded-lg font-medium transition-colors">
                Explore Our Products
              </a>
              <a href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-secondary px-8 py-4 rounded-lg font-medium transition-colors inline-flex items-center justify-center">
                Partner With Us
              </a>
            </div>
            
            {/* Trust indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-600">
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">500+</div>
                <div className="text-sm text-gray-300">Farm Families Supported</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">100%</div>
                <div className="text-sm text-gray-300">Chemical-Free Promise</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">6+</div>
                <div className="text-sm text-gray-300">Years of Trust</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
