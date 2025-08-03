import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import PageSEO from '@/components/SEO/PageSEO';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Form submitted:', formData);
  };

  // Enhanced structured data for Contact page
  const contactPageStructuredData = [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Roots and Richness",
      "url": "https://rootsandrichness.in/contact",
      "description": "Get in touch with Roots and Richness for premium wood-pressed oils and natural wellness products. We're here to help with any questions about our traditional, farm-sourced products."
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Roots and Richness",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Green Valley Road",
        "addressLocality": "Mumbai",
        "addressRegion": "Maharashtra",
        "postalCode": "400001",
        "addressCountry": "IN"
      },
      "telephone": "+91-98765-43210",
      "email": "hello@rootsandrichness.com",
      "url": "https://rootsandrichness.in/contact",
      "openingHours": [
        "Mo-Fr 09:00-18:00",
        "Sa 09:00-16:00"
      ],
      "priceRange": "$$",
      "paymentAccepted": ["Cash", "Credit Card", "UPI", "Bank Transfer"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageSEO 
        title="Contact Roots and Richness - Get in Touch | Premium Natural Products"
        description="Contact Roots and Richness for premium wood-pressed oils and natural wellness products. Call +91-98765-43210 or visit us in Mumbai. We're here to help with your natural wellness journey."
        keywords="contact roots and richness, wood-pressed oils contact, natural products support, customer service, mumbai location, premium oils contact"
        canonicalUrl="https://rootsandrichness.in/contact"
        structuredData={contactPageStructuredData}
      />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-light to-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-secondary">
              Get in Touch
            </h1>
            <p className="text-lg text-neutral-medium">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-playfair font-bold text-secondary mb-4">
                Send us a Message
              </h2>
              <p className="text-neutral-medium">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>

            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Button type="submit" className="btn-primary w-full" size="lg">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-playfair font-bold text-secondary mb-4">
                Contact Information
              </h2>
              <p className="text-neutral-medium">
                Reach out to us through any of these channels. We're here to help!
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: <MapPin className="text-primary" size={24} />,
                  title: "Visit Us",
                  details: [
                    "123 Green Valley Road",
                    "Mumbai, Maharashtra 400001",
                    "India"
                  ]
                },
                {
                  icon: <Phone className="text-primary" size={24} />,
                  title: "Call Us",
                  details: [
                    "+91 98765 43210",
                    "+91 87654 32109",
                    "Mon-Sat: 9:00 AM - 6:00 PM"
                  ]
                },
                {
                  icon: <Mail className="text-primary" size={24} />,
                  title: "Email Us",
                  details: [
                    "hello@rootsandrichness.com",
                    "support@rootsandrichness.com",
                    "We reply within 24 hours"
                  ]
                },
                {
                  icon: <Clock className="text-primary" size={24} />,
                  title: "Business Hours",
                  details: [
                    "Monday - Friday: 9:00 AM - 6:00 PM",
                    "Saturday: 9:00 AM - 4:00 PM",
                    "Sunday: Closed"
                  ]
                }
              ].map((item, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex space-x-4">
                      <div className="flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-playfair font-semibold text-secondary mb-2">
                          {item.title}
                        </h3>
                        <div className="space-y-1">
                          {item.details.map((detail, idx) => (
                            <p key={idx} className="text-sm text-neutral-medium">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* FAQ Link */}
            <Card className="bg-neutral-light">
              <CardContent className="p-6 text-center">
                <h3 className="font-playfair font-semibold text-secondary mb-2">
                  Frequently Asked Questions
                </h3>
                <p className="text-sm text-neutral-medium mb-4">
                  Looking for quick answers? Check out our FAQ section.
                </p>
                <Button variant="outline" size="sm">
                  View FAQ
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle className="font-playfair text-center">Find Us</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-neutral-light rounded-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <MapPin className="text-primary mx-auto" size={48} />
                  <p className="text-neutral-medium">Interactive map coming soon</p>
                  <p className="text-sm text-neutral-medium">
                    123 Green Valley Road, Mumbai, Maharashtra 400001
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
