import { Product, Category, Deal, Coupon, BlogPost, AffiliateClickLog, NotificationItem, AdminStats } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'all', name: 'All Categories', slug: 'all', iconName: 'Grid', count: 24, subcategories: [] },
  { id: 'mobiles', name: 'Mobiles', slug: 'mobiles', iconName: 'Smartphone', count: 6, subcategories: ['Flagship', 'Mid-Range', 'Budget 5G', 'Foldable'] },
  { id: 'laptops', name: 'Laptops', slug: 'laptops', iconName: 'Laptop', count: 5, subcategories: ['Gaming', 'Ultrabooks', 'Student', 'MacBook'] },
  { id: 'smartwatches', name: 'Smart Watches', slug: 'smartwatches', iconName: 'Watch', count: 3, subcategories: ['Fitness Tracker', 'Premium Smartwatch', 'Calling Watch'] },
  { id: 'earbuds', name: 'Earbuds & Audio', slug: 'earbuds', iconName: 'Headphones', count: 3, subcategories: ['TWS Earbuds', 'ANC Headphones', 'Soundbars'] },
  { id: 'tvs', name: 'TVs & Entertainment', slug: 'tvs', iconName: 'Tv', count: 2, subcategories: ['OLED 4K', 'QLED', 'Smart LED'] },
  { id: 'home-appliances', name: 'Home Appliances', slug: 'home-appliances', iconName: 'Home', count: 2, subcategories: ['Washing Machine', 'Air Conditioner', 'Refrigerator'] },
  { id: 'kitchen', name: 'Kitchen', slug: 'kitchen', iconName: 'Coffee', count: 1, subcategories: ['Air Fryer', 'Mixer Grinder', 'Coffee Maker'] },
  { id: 'fashion', name: 'Fashion', slug: 'fashion', iconName: 'ShoppingBag', count: 1, subcategories: ['Sneakers', 'Jackets', 'Watches'] },
  { id: 'beauty', name: 'Beauty & Care', slug: 'beauty', iconName: 'Sparkles', count: 1, subcategories: ['Skincare', 'Grooming Tools'] },
  { id: 'furniture', name: 'Furniture', slug: 'furniture', iconName: 'Armchair', count: 1, subcategories: ['Ergonomic Chairs', 'Desks'] },
  { id: 'grocery', name: 'Grocery & Essentials', slug: 'grocery', iconName: 'ShoppingBasket', count: 1, subcategories: ['Superfoods', 'Organic Coffee'] }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Apple iPhone 15 Pro Max (256GB, Natural Titanium)',
    slug: 'apple-iphone-15-pro-max-256gb',
    brand: 'Apple',
    category: 'mobiles',
    subcategory: 'Flagship',
    mainImage: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80'
    ],
    bestPrice: 134900,
    originalPrice: 159900,
    discountPercentage: 16,
    rating: 4.8,
    reviewCount: 3420,
    badge: 'Best Seller',
    isFeatured: true,
    isTrending: true,
    isTodayDeal: true,
    createdDate: '2026-01-15',
    seoTitle: 'Buy Apple iPhone 15 Pro Max at Lowest Price | Price Comparison',
    metaDescription: 'Compare prices for iPhone 15 Pro Max across Amazon, Flipkart, and Croma. Save up to ₹25,000 with instant bank offers.',
    stores: [
      {
        store: 'Amazon',
        price: 134900,
        originalPrice: 159900,
        discount: 16,
        url: 'https://www.amazon.in/dp/B0CHX6869F?tag=intellibuy-21',
        inStock: true,
        shipping: 'Free Express Shipping',
        rating: 4.8,
        badge: 'Lowest Price',
        couponCode: 'HDFCINSTANT3000'
      },
      {
        store: 'Flipkart',
        price: 137490,
        originalPrice: 159900,
        discount: 14,
        url: 'https://www.flipkart.com/apple-iphone-15-pro-max-natural-titanium-256-gb/p/itm',
        inStock: true,
        shipping: 'Free Delivery by Tomorrow',
        rating: 4.7,
        couponCode: 'AXIS1500OFF'
      },
      {
        store: 'Croma',
        price: 139900,
        originalPrice: 159900,
        discount: 13,
        url: 'https://www.croma.com/apple-iphone-15-pro-max',
        inStock: true,
        shipping: 'Store Pickup Available',
        rating: 4.6
      },
      {
        store: 'Reliance Digital',
        price: 138900,
        originalPrice: 159900,
        discount: 13,
        url: 'https://www.reliancedigital.in/apple-iphone-15-pro-max',
        inStock: true,
        shipping: 'Express Delivery',
        rating: 4.5
      }
    ],
    specs: {
      'Display': '6.7-inch Super Retina XDR OLED, 120Hz ProMotion',
      'Processor': 'Apple A17 Pro (3nm)',
      'Camera': '48MP Main + 12MP Ultra-wide + 12MP 5x Telephoto',
      'RAM & Storage': '8GB RAM | 256GB NVMe',
      'Battery': '4422 mAh with 25W MagSafe Charging',
      'Weight & Build': '221g, Grade 5 Titanium Frame, Ceramic Shield Front'
    },
    pros: [
      'Stunning Grade 5 Titanium lightweight design',
      'Unmatched A17 Pro ray-tracing gaming performance',
      'Versatile 5x optical telephoto zoom camera',
      'Customizable Action Button and USB-C 3.0 speeds'
    ],
    cons: [
      '25W charging speed is slower than competitors',
      'High premium price tag'
    ],
    priceHistory: [
      { date: 'Jul 1', amazon: 144900, flipkart: 146900, croma: 149900 },
      { date: 'Jul 10', amazon: 141900, flipkart: 143900, croma: 145900 },
      { date: 'Jul 20', amazon: 138900, flipkart: 139900, croma: 142900 },
      { date: 'Aug 1', amazon: 134900, flipkart: 137490, croma: 139900 }
    ],
    reviewsList: [
      {
        id: 'rev-1',
        userName: 'Aarav Sharma',
        rating: 5,
        title: 'Worth every rupee!',
        comment: 'Upgraded from iPhone 12 Pro. The natural titanium finish feels ultra-premium and battery easily lasts 1.5 days.',
        date: '2026-07-28',
        verifiedPurchase: true,
        store: 'Amazon'
      },
      {
        id: 'rev-2',
        userName: 'Priya Nair',
        rating: 4,
        title: 'Awesome cameras, great battery',
        comment: 'The 5x zoom lens is phenomenal for concert photos. Only downside is slow charging.',
        date: '2026-08-02',
        verifiedPurchase: true,
        store: 'Flipkart'
      }
    ]
  },
  {
    id: 'prod-2',
    title: 'Samsung Galaxy S24 Ultra 5G (12GB RAM, 512GB, Titanium Gray)',
    slug: 'samsung-galaxy-s24-ultra-5g',
    brand: 'Samsung',
    category: 'mobiles',
    subcategory: 'Flagship',
    mainImage: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80'
    ],
    bestPrice: 129999,
    originalPrice: 144999,
    discountPercentage: 10,
    rating: 4.7,
    reviewCount: 2890,
    badge: 'Galaxy AI Enabled',
    isFeatured: true,
    isTrending: true,
    isTodayDeal: true,
    createdDate: '2026-01-20',
    seoTitle: 'Samsung Galaxy S24 Ultra Lowest Price Offer',
    metaDescription: 'Get the best deal on Galaxy S24 Ultra with Galaxy AI features and built-in S-Pen.',
    stores: [
      {
        store: 'Amazon',
        price: 129999,
        originalPrice: 144999,
        discount: 10,
        url: 'https://www.amazon.in/dp/B0CS5XMR3Q?tag=intellibuy-21',
        inStock: true,
        shipping: 'Free One-Day Delivery',
        rating: 4.7,
        badge: 'Top Deal'
      },
      {
        store: 'Flipkart',
        price: 131999,
        originalPrice: 144999,
        discount: 9,
        url: 'https://www.flipkart.com/samsung-galaxy-s24-ultra',
        inStock: true,
        shipping: 'Free Express Shipping',
        rating: 4.7
      },
      {
        store: 'Reliance Digital',
        price: 132990,
        originalPrice: 144999,
        discount: 8,
        url: 'https://www.reliancedigital.in/samsung-s24-ultra',
        inStock: true,
        shipping: 'Free Installation & Setup',
        rating: 4.6
      }
    ],
    specs: {
      'Display': '6.8-inch Dynamic AMOLED 2X, 120Hz, 2600 nits peak',
      'Processor': 'Snapdragon 8 Gen 3 for Galaxy',
      'Camera': '200MP Main + 50MP 5x Zoom + 10MP 3x Zoom + 12MP Ultra-wide',
      'RAM & Storage': '12GB LPDDR5X | 512GB UFS 4.0',
      'Battery': '5000 mAh, 45W Fast Charging',
      'S-Pen': 'Integrated Bluetooth Low Energy S-Pen'
    },
    pros: [
      'Incredible 200MP camera with Circle to Search Galaxy AI',
      'Anti-reflective Gorilla Armor glass display',
      'Built-in S-Pen for quick note taking',
      '7 Years of Android OS updates'
    ],
    cons: [
      'Box does not include charger brick',
      'Large footprint might feel bulky in small hands'
    ],
    priceHistory: [
      { date: 'Jul 1', amazon: 139999, flipkart: 140999, croma: 142999 },
      { date: 'Jul 15', amazon: 134999, flipkart: 136999, croma: 138999 },
      { date: 'Aug 1', amazon: 129999, flipkart: 131999, croma: 132990 }
    ]
  },
  {
    id: 'prod-3',
    title: 'Apple MacBook Air M3 (15.3-inch, 16GB RAM, 512GB SSD, Midnight)',
    slug: 'apple-macbook-air-m3-15-inch',
    brand: 'Apple',
    category: 'laptops',
    subcategory: 'MacBook',
    mainImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80'
    ],
    bestPrice: 144900,
    originalPrice: 154900,
    discountPercentage: 6,
    rating: 4.9,
    reviewCount: 1520,
    badge: '18hr Battery',
    isFeatured: true,
    isTrending: true,
    createdDate: '2026-02-10',
    stores: [
      {
        store: 'Amazon',
        price: 144900,
        originalPrice: 154900,
        discount: 6,
        url: 'https://www.amazon.in/dp/B0CX24D85Y?tag=intellibuy-21',
        inStock: true,
        shipping: 'Free Next-Day Shipping',
        rating: 4.9,
        badge: 'Lowest Price'
      },
      {
        store: 'Croma',
        price: 149900,
        originalPrice: 154900,
        discount: 3,
        url: 'https://www.croma.com/macbook-air-m3',
        inStock: true,
        shipping: 'Store Pickup Available',
        rating: 4.8
      },
      {
        store: 'Vijay Sales',
        price: 147900,
        originalPrice: 154900,
        discount: 5,
        url: 'https://www.vijaysales.com/macbook-air-m3',
        inStock: true,
        shipping: 'Free Shipping',
        rating: 4.7
      }
    ],
    specs: {
      'Display': '15.3-inch Liquid Retina Display with True Tone, 500 nits',
      'Processor': 'Apple M3 Chip (8-Core CPU, 10-Core GPU)',
      'RAM & Storage': '16GB Unified Memory | 512GB SSD',
      'Battery Life': 'Up to 18 hours wireless web browsing',
      'Audio & Mic': 'Six-speaker sound system with Spatial Audio, 3-mic array',
      'Ports': 'MagSafe 3, 2x Thunderbolt / USB 4 ports, 3.5mm headphone jack'
    },
    pros: [
      'Fanless completely silent design',
      'Expansive vibrant 15.3-inch Retina screen',
      'Blazing fast M3 chip video editing performance',
      'MagSafe magnetic charging cable included'
    ],
    cons: [
      'Supports only up to two external displays with lid closed',
      'RAM and SSD non-upgradable after purchase'
    ],
    priceHistory: [
      { date: 'Jul 1', amazon: 152900, flipkart: 153900, croma: 154900 },
      { date: 'Jul 15', amazon: 148900, flipkart: 149900, croma: 151900 },
      { date: 'Aug 1', amazon: 144900, flipkart: 146900, croma: 149900 }
    ]
  },
  {
    id: 'prod-4',
    title: 'ASUS ROG Zephyrus G16 OLED Gaming Laptop (Intel Core Ultra 9, RTX 4070, 32GB, 1TB SSD)',
    slug: 'asus-rog-zephyrus-g16-oled',
    brand: 'ASUS',
    category: 'laptops',
    subcategory: 'Gaming',
    mainImage: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80'
    ],
    bestPrice: 189990,
    originalPrice: 219990,
    discountPercentage: 14,
    rating: 4.8,
    reviewCount: 840,
    badge: '240Hz OLED',
    isFeatured: true,
    createdDate: '2026-03-01',
    stores: [
      {
        store: 'Amazon',
        price: 189990,
        originalPrice: 219990,
        discount: 14,
        url: 'https://www.amazon.in/dp/B0CS3511GZ?tag=intellibuy-21',
        inStock: true,
        shipping: 'Free Express Shipping',
        rating: 4.8,
        badge: 'Editor Choice'
      },
      {
        store: 'Flipkart',
        price: 194990,
        originalPrice: 219990,
        discount: 11,
        url: 'https://www.flipkart.com/asus-rog-zephyrus-g16',
        inStock: true,
        shipping: 'Free Delivery',
        rating: 4.7
      }
    ],
    specs: {
      'Display': '16-inch ROG Nebula 2.5K OLED, 240Hz, 0.2ms, G-Sync',
      'Processor': 'Intel Core Ultra 9 185H (16 Cores, 22 Threads)',
      'Graphics': 'NVIDIA GeForce RTX 4070 8GB GDDR6 (105W TGP)',
      'RAM & Storage': '32GB LPDDR5X 7467MHz | 1TB PCIe 4.0 NVMe SSD',
      'Chassis': 'CNC Aluminium Unibody, 1.85 kg weight, 1.49cm thin'
    },
    pros: [
      'GORGEOUS 240Hz ROG Nebula OLED Panel',
      'Ultra-thin 1.49cm CNC aluminium chassis',
      'Tri-Fan Cooling with Liquid Metal on CPU',
      'Crisp 6-Speaker sound system with force-cancelling woofers'
    ],
    cons: [
      'Soldered RAM cannot be upgraded',
      'Premium price tag for portability'
    ],
    priceHistory: [
      { date: 'Jul 1', amazon: 209990, flipkart: 211990, croma: 214990 },
      { date: 'Jul 15', amazon: 199990, flipkart: 202990, croma: 205990 },
      { date: 'Aug 1', amazon: 189990, flipkart: 194990, croma: 199990 }
    ]
  },
  {
    id: 'prod-5',
    title: 'Sony WF-1000XM5 ANC Wireless Earbuds (Black)',
    slug: 'sony-wf-1000xm5-wireless-earbuds',
    brand: 'Sony',
    category: 'earbuds',
    subcategory: 'TWS Earbuds',
    mainImage: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&auto=format&fit=crop&q=80'
    ],
    bestPrice: 19990,
    originalPrice: 24990,
    discountPercentage: 20,
    rating: 4.6,
    reviewCount: 1920,
    badge: 'Best ANC',
    isFeatured: true,
    isTodayDeal: true,
    createdDate: '2026-02-05',
    stores: [
      {
        store: 'Amazon',
        price: 19990,
        originalPrice: 24990,
        discount: 20,
        url: 'https://www.amazon.in/dp/B0C895M134?tag=intellibuy-21',
        inStock: true,
        shipping: 'Free One-Day Delivery',
        rating: 4.6,
        badge: 'Best Price'
      },
      {
        store: 'Flipkart',
        price: 20990,
        originalPrice: 24990,
        discount: 16,
        url: 'https://www.flipkart.com/sony-wf-1000xm5',
        inStock: true,
        shipping: 'Free Express Shipping',
        rating: 4.5
      },
      {
        store: 'Croma',
        price: 21990,
        originalPrice: 24990,
        discount: 12,
        url: 'https://www.croma.com/sony-wf-1000xm5',
        inStock: true,
        shipping: 'Store Pickup',
        rating: 4.6
      }
    ],
    specs: {
      'Audio Driver': 'Dynamic Driver X 8.4mm with LDAC Hi-Res Audio',
      'Noise Cancellation': 'Dual Processors V2 + QN2e Active Noise Cancelling',
      'Battery Life': '8 hrs earbuds + 16 hrs charging case (Total 24 hrs with ANC)',
      'Water Resistance': 'IPX4 Water Splash Resistant',
      'Microphones': '6 microphones total with AI bone-conduction voice extraction'
    },
    pros: [
      'World-class noise cancellation in small lightweight body',
      'Rich, warm, detailed audio quality with LDAC support',
      'Multipoint connection to two devices simultaneously',
      'Quick charging: 3 min charge gives 60 min playback'
    ],
    cons: [
      'Foam ear tips require proper fitting insertion',
      'Case finish can show minor scuffs'
    ],
    priceHistory: [
      { date: 'Jul 1', amazon: 22990, flipkart: 23490, croma: 23990 },
      { date: 'Jul 15', amazon: 21490, flipkart: 21990, croma: 22990 },
      { date: 'Aug 1', amazon: 19990, flipkart: 20990, croma: 21990 }
    ]
  },
  {
    id: 'prod-6',
    title: 'Apple Watch Ultra 2 (GPS + Cellular, 49mm Titanium, Ocean Band)',
    slug: 'apple-watch-ultra-2-49mm',
    brand: 'Apple',
    category: 'smartwatches',
    subcategory: 'Premium Smartwatch',
    mainImage: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'
    ],
    bestPrice: 84900,
    originalPrice: 89900,
    discountPercentage: 6,
    rating: 4.9,
    reviewCount: 1120,
    badge: '3000 Nits Brightness',
    isFeatured: true,
    createdDate: '2026-01-10',
    stores: [
      {
        store: 'Amazon',
        price: 84900,
        originalPrice: 89900,
        discount: 6,
        url: 'https://www.amazon.in/dp/B0CHX319GF?tag=intellibuy-21',
        inStock: true,
        shipping: 'Free One-Day Delivery',
        rating: 4.9,
        badge: 'Lowest Price'
      },
      {
        store: 'Flipkart',
        price: 86900,
        originalPrice: 89900,
        discount: 3,
        url: 'https://www.flipkart.com/apple-watch-ultra-2',
        inStock: true,
        shipping: 'Free Delivery',
        rating: 4.8
      },
      {
        store: 'Reliance Digital',
        price: 87900,
        originalPrice: 89900,
        discount: 2,
        url: 'https://www.reliancedigital.in/apple-watch-ultra-2',
        inStock: true,
        shipping: 'Store Pickup',
        rating: 4.7
      }
    ],
    specs: {
      'Display': '49mm Always-On Retina Display, 3000 nits peak brightness',
      'Processor': 'S9 SiP with Double Tap gesture control',
      'Water & Depth': '100m Water Resistant, EN13319 certified dive computer',
      'Battery Life': 'Up to 36 hours normal use (72 hours Low Power Mode)',
      'Sensors': 'Precision Dual-Frequency GPS, Blood Oxygen, ECG, Temperature sensing'
    },
    pros: [
      'Unbelievably bright 3000 nits display visible in scorching sun',
      'Rugged aerospace grade titanium case',
      'S9 SiP Double Tap hand gesture control',
      'Precision Dual GPS for ultra-accurate trail mapping'
    ],
    cons: [
      'Heavy 61.4g weight on wrist',
      'Requires iPhone to function'
    ],
    priceHistory: [
      { date: 'Jul 1', amazon: 88900, flipkart: 89900, croma: 89900 },
      { date: 'Jul 15', amazon: 86900, flipkart: 87900, croma: 88900 },
      { date: 'Aug 1', amazon: 84900, flipkart: 86900, croma: 87900 }
    ]
  },
  {
    id: 'prod-7',
    title: 'LG C3 55-inch 4K Smart OLED TV (OLED55C3PSA, 120Hz, Dolby Vision)',
    slug: 'lg-c3-55-inch-4k-oled-tv',
    brand: 'LG',
    category: 'tvs',
    subcategory: 'OLED 4K',
    mainImage: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=80'
    ],
    bestPrice: 119990,
    originalPrice: 169990,
    discountPercentage: 29,
    rating: 4.8,
    reviewCount: 760,
    badge: '120Hz Gaming',
    isTodayDeal: true,
    createdDate: '2026-02-18',
    stores: [
      {
        store: 'Amazon',
        price: 119990,
        originalPrice: 169990,
        discount: 29,
        url: 'https://www.amazon.in/dp/B0C3MB17GL?tag=intellibuy-21',
        inStock: true,
        shipping: 'Free Scheduled Delivery & Wall Mount installation',
        rating: 4.8,
        badge: 'Huge Savings'
      },
      {
        store: 'Reliance Digital',
        price: 124990,
        originalPrice: 169990,
        discount: 26,
        url: 'https://www.reliancedigital.in/lg-c3-55-oled',
        inStock: true,
        shipping: 'Free Installation',
        rating: 4.7
      }
    ],
    specs: {
      'Display': '55-inch 4K Self-Lit OLED Panel, 120Hz Refresh Rate',
      'Processor': 'α9 AI Processor 4K Gen6',
      'HDR Format': 'Dolby Vision IQ, HDR10 Pro, HLG',
      'Gaming': 'NVIDIA G-Sync, AMD FreeSync Premium, 4x HDMI 2.1 ports',
      'Sound': '40W 2.2 Ch Dolby Atmos audio with WOW Orchestra'
    },
    pros: [
      'Infinite contrast with perfect deep blacks',
      'Ideal for PS5 & Xbox Series X with 0.1ms response time',
      'WebOS 23 with smooth Magic Remote navigation'
    ],
    cons: [
      'OLED panel reflections in bright sunlit rooms',
      'Audio is good but benefits from external soundbar'
    ],
    priceHistory: [
      { date: 'Jul 1', amazon: 129990, flipkart: 134990, croma: 139990 },
      { date: 'Aug 1', amazon: 119990, flipkart: 124990, croma: 129990 }
    ]
  },
  {
    id: 'prod-8',
    title: 'Dyson V15 Detect Cordless Vacuum Cleaner (Gold/Nickel)',
    slug: 'dyson-v15-detect-cordless-vacuum',
    brand: 'Dyson',
    category: 'home-appliances',
    subcategory: 'Vacuum Cleaners',
    mainImage: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&auto=format&fit=crop&q=80'
    ],
    bestPrice: 59900,
    originalPrice: 65900,
    discountPercentage: 9,
    rating: 4.7,
    reviewCount: 540,
    badge: 'Laser Dust Reveal',
    createdDate: '2026-03-12',
    stores: [
      {
        store: 'Amazon',
        price: 59900,
        originalPrice: 65900,
        discount: 9,
        url: 'https://www.amazon.in/dp/B0B5LN8X27?tag=intellibuy-21',
        inStock: true,
        shipping: 'Free Express Shipping',
        rating: 4.7,
        badge: 'Lowest Price'
      },
      {
        store: 'Croma',
        price: 61900,
        originalPrice: 65900,
        discount: 6,
        url: 'https://www.croma.com/dyson-v15',
        inStock: true,
        shipping: 'Free Home Delivery',
        rating: 4.6
      }
    ],
    specs: {
      'Motor': 'Dyson Hyperdymium Motor spinning up to 125,000 rpm',
      'Suction Power': '240 AW (Air Watts) intense suction',
      'Filtration': 'Fully-sealed 5-stage HEPA filtration trapping 99.99% particles down to 0.1 microns',
      'Run Time': 'Up to 60 minutes fade-free power',
      'Special Features': 'Laser Fluffy Cleaner Head + Piezo Sensor particle counter'
    },
    pros: [
      'Illuminating laser reveals invisible microscopic dust on hard floors',
      'Piezo sensor automatically increases suction power on heavy dirt',
      'LCD screen displays real-time particle proof counts'
    ],
    cons: [
      'Trigger needs to be held down during cleaning',
      'Relatively high investment cost'
    ],
    priceHistory: [
      { date: 'Jul 1', amazon: 63900, flipkart: 64900, croma: 65900 },
      { date: 'Aug 1', amazon: 59900, flipkart: 61900, croma: 62900 }
    ]
  }
];

export const INITIAL_DEALS: Deal[] = [
  {
    id: 'deal-1',
    title: 'Apple iPhone 15 Pro Max Flat ₹25,000 Off + HDFC Card Cashback',
    store: 'Amazon',
    discount: '16% OFF',
    originalPrice: 159900,
    dealPrice: 134900,
    category: 'mobiles',
    link: 'https://www.amazon.in/dp/B0CHX6869F?tag=intellibuy-21',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
    badge: 'Lightning Deal',
    description: 'Instant ₹3,000 additional discount on HDFC Bank Credit Card EMI.',
    endsInHours: 6
  },
  {
    id: 'deal-2',
    title: 'Sony WF-1000XM5 ANC Earbuds ₹5,000 Price Drop',
    store: 'Amazon',
    discount: '20% OFF',
    originalPrice: 24990,
    dealPrice: 19990,
    category: 'earbuds',
    link: 'https://www.amazon.in/dp/B0C895M134?tag=intellibuy-21',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
    badge: 'Limited Stock',
    description: 'Includes 6 months complimentary Spotify Premium subscription.',
    endsInHours: 14
  },
  {
    id: 'deal-3',
    title: 'LG 55" OLED C3 TV Super Clearance Offer',
    store: 'Amazon',
    discount: '29% OFF',
    originalPrice: 169990,
    dealPrice: 119990,
    category: 'tvs',
    link: 'https://www.amazon.in/dp/B0C3MB17GL?tag=intellibuy-21',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=80',
    badge: 'Festival Mega Deal',
    description: 'Free wall mount installation and 3-Year comprehensive LG warranty.',
    endsInHours: 24
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'coup-1',
    code: 'INTELLI_HDFC3000',
    store: 'Amazon',
    discountText: 'Flat ₹3,000 Instant Discount',
    minSpend: '₹50,000',
    category: 'Electronics',
    expiresAt: '2026-08-31',
    verified: true,
    description: 'Valid on HDFC Bank Credit Cards & Credit Card EMI transactions.'
  },
  {
    id: 'coup-2',
    code: 'FLIPKART_AXIS1500',
    store: 'Flipkart',
    discountText: '10% Cashback up to ₹1,500',
    minSpend: '₹10,000',
    category: 'Mobiles',
    expiresAt: '2026-08-28',
    verified: true,
    description: 'Applicable on Flipkart Axis Bank Co-Branded Credit Card.'
  },
  {
    id: 'coup-3',
    code: 'CROMA_SAVE500',
    store: 'Croma',
    discountText: 'Flat ₹500 Off on Store Pickup',
    minSpend: '₹5,000',
    category: 'Home Appliances',
    expiresAt: '2026-09-05',
    verified: true,
    description: 'Use coupon during checkout when opting for click & collect.'
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Top 5 Flagship Smartphones of 2026: Camera & Battery Showdown',
    slug: 'top-5-flagship-smartphones-2026',
    author: 'Vikram Sethi',
    authorRole: 'Senior Tech Analyst',
    date: '2026-08-01',
    readTime: '6 min read',
    category: 'Buying Guide',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
    summary: 'We tested the camera, gaming frame rates, and real-world battery endurance of the iPhone 15 Pro Max, Galaxy S24 Ultra, and Pixel 8 Pro.',
    content: `Finding the perfect flagship smartphone can feel overwhelming with all the AI features, camera zoom specifications, and titanium builds available today. In this comprehensive guide, we compare real-world performance metrics between Apple, Samsung, and Google flagship phones.

### 1. Camera Comparison: Natural vs Vibrant
The iPhone 15 Pro Max excels in color science accuracy and 4K 60fps video Recording. Meanwhile, the Galaxy S24 Ultra dominates zoom clarity with its 200MP sensor and Galaxy AI generative edit tools.

### 2. Battery & Thermal Management
Apple's 3nm A17 Pro chip provides exceptional power efficiency during standby and social media browsing. However, Samsung's Snapdragon 8 Gen 3 for Galaxy leads during intensive 3D gaming sessions.

### Final Verdict
If video recording and ecosystem longevity are your top priorities, choose the **iPhone 15 Pro Max**. If you love customizing your phone and taking telephoto photos, the **Galaxy S24 Ultra** is an unmatched powerhouse.`,
    tags: ['Smartphones', 'Apple', 'Samsung', 'Camera Test'],
    relatedProductId: 'prod-1'
  },
  {
    id: 'blog-2',
    title: 'OLED vs QLED TVs: Which Display Tech Should You Buy in 2026?',
    slug: 'oled-vs-qled-tvs-buying-guide',
    author: 'Neha Sharma',
    authorRole: 'Home Tech Specialist',
    date: '2026-07-25',
    readTime: '8 min read',
    category: 'Televisions',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=80',
    summary: 'Everything you need to know about self-lit OLED pixels versus bright QLED backlights before spending your hard-earned money.',
    content: `When purchasing a 55-inch or 65-inch Smart TV, the biggest decision is picking between OLED and QLED technology. Both offer incredible picture quality, but perform best under completely different lighting environments.

### OLED: Infinite Contrast for Dark Rooms
OLED (Organic Light Emitting Diode) displays produce true, absolute blacks because each individual pixel turns completely off. This creates stunning depth in cinematic movies and gaming.

### QLED: Peak Brightness for Bright Living Rooms
QLED (Quantum Dot LED) TVs use traditional backlighting enhanced by quantum dots. They can achieve over 2000 nits of peak brightness, making them glare-resistant in sunny rooms.`,
    tags: ['OLED', 'QLED', 'LG C3', 'Gaming TV'],
    relatedProductId: 'prod-7'
  }
];

export const INITIAL_AFFILIATE_LOGS: AffiliateClickLog[] = [
  {
    id: 'log-101',
    productId: 'prod-1',
    productTitle: 'Apple iPhone 15 Pro Max (256GB)',
    store: 'Amazon',
    timestamp: '2026-08-06 16:20',
    commissionEarned: 2698,
    status: 'Converted',
    userRegion: 'Mumbai, MH'
  },
  {
    id: 'log-102',
    productId: 'prod-3',
    productTitle: 'Apple MacBook Air M3 (15.3-inch)',
    store: 'Amazon',
    timestamp: '2026-08-06 15:45',
    commissionEarned: 2898,
    status: 'Converted',
    userRegion: 'Bengaluru, KA'
  },
  {
    id: 'log-103',
    productId: 'prod-2',
    productTitle: 'Samsung Galaxy S24 Ultra 5G',
    store: 'Flipkart',
    timestamp: '2026-08-06 15:10',
    commissionEarned: 0,
    status: 'Clicked',
    userRegion: 'Delhi, NCR'
  },
  {
    id: 'log-104',
    productId: 'prod-5',
    productTitle: 'Sony WF-1000XM5 ANC Wireless Earbuds',
    store: 'Amazon',
    timestamp: '2026-08-06 14:30',
    commissionEarned: 799,
    status: 'Converted',
    userRegion: 'Hyderabad, TS'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Price Drop Alert! 📉',
    message: 'iPhone 15 Pro Max (256GB) dropped by ₹4,000 on Amazon! Now ₹1,34,900.',
    timestamp: '10 mins ago',
    type: 'price_drop',
    productId: 'prod-1',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Exclusive Coupon Active 🎟️',
    message: 'Use code INTELLI_HDFC3000 for extra ₹3,000 instant discount on electronics.',
    timestamp: '2 hours ago',
    type: 'deal',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Back in Stock Alert 📦',
    message: 'ASUS ROG Zephyrus G16 OLED Gaming Laptop is now back in stock on Amazon.',
    timestamp: 'Yesterday',
    type: 'stock',
    productId: 'prod-4',
    read: true
  }
];

export const INITIAL_ADMIN_STATS: AdminStats = {
  totalProducts: 104280,
  totalAffiliateClicks: 48920,
  conversionRate: 4.82,
  totalRevenue: 348290,
  activeDealsCount: 24,
  activeCouponsCount: 18,
  topStore: 'Amazon'
};
