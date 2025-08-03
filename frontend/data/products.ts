
export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  category: string;
  images: string[];
  inStock: boolean;
  stockQuantity: number;
  benefits: string[];
  howToUse?: string;
  ingredients?: string[];
  sizes?: string[];
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wood-Pressed Coconut Oil',
    slug: 'wood-pressed-coconut-oil',
    price: 899,
    originalPrice: 1299,
    description: 'Pure, cold-pressed coconut oil extracted using traditional wooden presses. Rich in nutrients and perfect for cooking, skincare, and hair care.',
    shortDescription: 'Traditional wood-pressed coconut oil, rich in nutrients and versatility.',
    category: 'oils',
    images: [
      'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500&h=500&fit=crop'
    ],
    inStock: true,
    stockQuantity: 50,
    benefits: [
      'Rich in healthy saturated fats',
      'Natural antimicrobial properties',
      'Supports heart health',
      'Great for skin and hair care'
    ],
    howToUse: 'Use for cooking, oil pulling, or apply directly to skin and hair.',
    ingredients: ['100% Pure Coconut Oil'],
    sizes: ['500ml', '1L'],
    featured: true
  },
  {
    id: '2',
    name: 'Tribal-Sourced Coffee Beans',
    slug: 'tribal-sourced-coffee',
    price: 649,
    description: 'Ethically sourced coffee beans directly from tribal communities. Single-origin, medium roast with notes of chocolate and caramel.',
    shortDescription: 'Ethically sourced, single-origin coffee with rich chocolate notes.',
    category: 'coffee',
    images: [
      'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500&h=500&fit=crop'
    ],
    inStock: true,
    stockQuantity: 30,
    benefits: [
      'Direct trade with tribal communities',
      'Single-origin quality',
      'Rich antioxidants',
      'Sustainable farming practices'
    ],
    howToUse: 'Grind fresh and brew as preferred. Best enjoyed black or with minimal additions.',
    ingredients: ['100% Arabica Coffee Beans'],
    sizes: ['250g', '500g'],
    featured: true
  },
  {
    id: '3',
    name: 'Cold-Pressed Sesame Oil',
    slug: 'cold-pressed-sesame-oil',
    price: 759,
    originalPrice: 999,
    description: 'Traditional cold-pressed sesame oil with a rich, nutty flavor. Perfect for cooking and Ayurvedic practices.',
    shortDescription: 'Cold-pressed sesame oil with rich, nutty flavor and health benefits.',
    category: 'oils',
    images: [
      'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500&h=500&fit=crop'
    ],
    inStock: true,
    stockQuantity: 25,
    benefits: [
      'High in vitamin E',
      'Natural antioxidants',
      'Supports bone health',
      'Traditional Ayurvedic uses'
    ],
    howToUse: 'Use for cooking, massage, or oil pulling therapy.',
    ingredients: ['100% Pure Sesame Seeds'],
    sizes: ['500ml'],
    featured: false
  },
  {
    id: '4',
    name: 'Organic Turmeric Powder',
    slug: 'organic-turmeric-powder',
    price: 299,
    description: 'Premium organic turmeric powder sourced directly from organic farms. High curcumin content for maximum health benefits.',
    shortDescription: 'Premium organic turmeric with high curcumin content.',
    category: 'spices',
    images: [
      'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500&h=500&fit=crop'
    ],
    inStock: true,
    stockQuantity: 40,
    benefits: [
      'High curcumin content',
      'Anti-inflammatory properties',
      'Supports immune system',
      'Pure and organic'
    ],
    howToUse: 'Add to milk, smoothies, or use in cooking. Take with black pepper for better absorption.',
    ingredients: ['100% Organic Turmeric'],
    sizes: ['100g', '250g'],
    featured: true
  },
  {
    id: '5',
    name: 'Raw Forest Honey',
    slug: 'raw-forest-honey',
    price: 549,
    description: 'Pure, unprocessed honey collected from forest beehives. Rich in enzymes and natural nutrients.',
    shortDescription: 'Pure, unprocessed forest honey rich in natural enzymes.',
    category: 'honey',
    images: [
      'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500&h=500&fit=crop'
    ],
    inStock: true,
    stockQuantity: 35,
    benefits: [
      'Raw and unprocessed',
      'Rich in enzymes',
      'Natural energy source',
      'Supports immune health'
    ],
    howToUse: 'Consume directly, add to warm water, or use as a natural sweetener.',
    ingredients: ['100% Raw Forest Honey'],
    sizes: ['500g'],
    featured: false
  },
  {
    id: '6',
    name: 'Mustard Oil Traditional',
    slug: 'mustard-oil-traditional',
    price: 449,
    description: 'Traditional mustard oil extracted using age-old methods. Known for its pungent flavor and health benefits.',
    shortDescription: 'Traditional mustard oil with authentic flavor and health benefits.',
    category: 'oils',
    images: [
      'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500&h=500&fit=crop'
    ],
    inStock: true,
    stockQuantity: 20,
    benefits: [
      'Rich in omega-3 fatty acids',
      'Natural antimicrobial',
      'Supports heart health',
      'Traditional extraction'
    ],
    howToUse: 'Use for cooking traditional dishes or for massage therapy.',
    ingredients: ['100% Pure Mustard Seeds'],
    sizes: ['500ml', '1L'],
    featured: false
  }
];

export const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'oils', name: 'Wood-Pressed Oils' },
  { id: 'coffee', name: 'Coffee' },
  { id: 'spices', name: 'Spices' },
  { id: 'honey', name: 'Honey' }
];
