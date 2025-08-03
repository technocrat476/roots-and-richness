
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface AutoplayHeroProps {
  interval?: number;
}

const AutoplayHero: React.FC<AutoplayHeroProps> = ({ interval = 1000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=1920&h=1080&fit=crop&crop=center",
      headline: "Purity from the Source",
      subtext: "Farm-sourced, untouched, and natural",
      alt: "Traditional mustard field in India"
    },
    {
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1920&h=1080&fit=crop&crop=center",
      headline: "Wood-Pressed. No Compromise.",
      subtext: "Retaining nutrition, flavor, and texture",
      alt: "Cold-pressed mustard oil production"
    },
    {
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1920&h=1080&fit=crop&crop=center",
      headline: "From Araku with Love",
      subtext: "Sustainably grown Arabica coffee",
      alt: "Araku tribal women harvesting coffee"
    },
    {
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1920&h=1080&fit=crop&crop=center",
      headline: "Natural. Unrefined. Real.",
      subtext: "Pure goodness in every drop",
      alt: "Pouring pure groundnut oil in bottle"
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, isPaused, slides.length]);

  return (
    <section 
      className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero banner showcasing Roots and Richness products"
    >
      {/* Image Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <picture>
              <source 
                media="(max-width: 640px)" 
                srcSet={`${slide.image}&w=640&h=480`} 
              />
              <source 
                media="(max-width: 1024px)" 
                srcSet={`${slide.image}&w=1024&h=768`} 
              />
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover"
                loading={index === 0 ? 'eager' : 'lazy'}
                style={{
                  transform: index === currentSlide ? 'scale(1)' : 'scale(1.05)',
                  transition: 'transform 1000ms ease-in-out'
                }}
              />
            </picture>
            
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/40 sm:bg-black/30" />
          </div>
        ))}
      </div>

      {/* Text Overlay - Mobile First */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-4 sm:px-6">
        <div className="max-w-sm sm:max-w-2xl lg:max-w-4xl mx-auto space-y-3 sm:space-y-6">
          <h1 
            className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-white leading-tight animate-fade-in"
            key={`headline-${currentSlide}`}
          >
            {slides[currentSlide].headline}
          </h1>
          <p 
            className="text-sm sm:text-lg md:text-xl text-white/90 max-w-xs sm:max-w-2xl mx-auto animate-fade-in"
            key={`subtext-${currentSlide}`}
            style={{ animationDelay: '0.2s' }}
          >
            {slides[currentSlide].subtext}
          </p>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white w-6 sm:w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Scroll Hint - Hidden on mobile for space */}
      <div className="hidden sm:block absolute bottom-12 lg:bottom-16 left-1/2 transform -translate-x-1/2 text-center animate-bounce">
        <div className="text-white/80 text-sm mb-2">Scroll to discover</div>
        <ChevronDown className="text-white/80 mx-auto" size={24} />
      </div>

      {/* Pause Indicator (shows on hover) */}
      {isPaused && (
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          Paused
        </div>
      )}
    </section>
  );
};

export default AutoplayHero;
