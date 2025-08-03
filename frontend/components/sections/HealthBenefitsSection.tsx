
import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Heart, Flame, Droplets, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const HealthBenefitsSection = () => {
  const benefits = [
    {
      icon: Brain,
      title: "Supports Brain Health",
      description: "Rich in Omega-3 and Vitamin E, supports cognitive health and memory function"
    },
    {
      icon: Heart,
      title: "Boosts Heart Health", 
      description: "Contains good fats and unsaturated fatty acids that help maintain cholesterol levels"
    },
    {
      icon: Flame,
      title: "High Smoke Point",
      description: "Ideal for Indian cooking styles like tadka, frying, and sautéing without breaking down"
    },
    {
      icon: Droplets,
      title: "Easy to Digest",
      description: "Unrefined oils aid digestion and improve liver function naturally"
    },
    {
      icon: User,
      title: "Promotes Hair Growth",
      description: "Strengthens hair follicles and reduces hair fall when applied regularly"
    },
    {
      icon: Sparkles,
      title: "Nourishes the Skin",
      description: "Anti-inflammatory and moisturizing properties keep skin soft and clear"
    }
  ];

  return (
    <section className="py-20 bg-neutral-light">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-secondary">
            Health Benefits of Wood-Pressed Oils
          </h2>
          <p className="text-lg text-neutral-medium max-w-3xl mx-auto leading-relaxed">
            Naturally extracted using traditional wooden presses, our oils retain essential nutrients, flavor, and aroma—making them a healthier choice for your daily meals.
          </p>
          <p className="text-base text-neutral-medium max-w-4xl mx-auto">
            Wood-pressed oils, also known as cold-pressed or kachi ghani oils, are extracted at low temperatures without any chemicals or refining. This method preserves vital nutrients and antioxidants that offer real health benefits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-playfair font-semibold text-secondary mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-neutral-medium text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center space-x-4">
          <Link to="/products">
            <Button size="lg" className="btn-primary">
              Explore Our Oils
            </Button>
          </Link>
          <Link to="/about">
            <Button size="lg" variant="outline">
              Learn the Wood-Pressed Method
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HealthBenefitsSection;
