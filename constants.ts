
import { Product } from './types';
import { PRODUCT_IMAGES } from './assets/images';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'AeroPeak Pro Headphones',
    description: 'Noise-cancelling wireless headphones with 40-hour battery life and spatial audio support.',
    price: 299.99,
    image: PRODUCT_IMAGES.HEADPHONES,
    category: 'Electronics'
  },
  {
    id: '2',
    name: 'Lumina Smart Watch',
    description: 'Track your fitness, heart rate, and sleep with this sleek, water-resistant smartwatch.',
    price: 199.50,
    image: PRODUCT_IMAGES.SMARTWATCH,
    category: 'Wearables'
  },
  {
    id: '3',
    name: 'Everlasting Leather Bag',
    description: 'Handcrafted premium leather messenger bag with multiple compartments for your tech gear.',
    price: 145.00,
    image: PRODUCT_IMAGES.LEATHER_BAG,
    category: 'Accessories'
  },
  {
    id: '4',
    name: 'Nebula Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with tactile brown switches for ultimate typing comfort.',
    price: 129.99,
    image: PRODUCT_IMAGES.KEYBOARD,
    category: 'Computing'
  },
  {
    id: '5',
    name: 'Vantage Pro DSLR Camera',
    description: 'Professional-grade mirrorless camera with 45MP sensor and 8K video capabilities for creators.',
    price: 1249.00,
    image: PRODUCT_IMAGES.DSLR_CAMERA,
    category: 'Photography'
  },
  {
    id: '6',
    name: 'SonicSphere Smart Speaker',
    description: 'Premium home audio with deep bass, 360-degree sound, and integrated voice assistant.',
    price: 179.00,
    image: PRODUCT_IMAGES.SMART_SPEAKER,
    category: 'Audio'
  }
];
