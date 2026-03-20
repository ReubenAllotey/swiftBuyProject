export const categories = [
  {
    id: "1",
    name: "Electronics",
    slug: "electronics",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=600&fit=crop",
  },
  {
    id: "2",
    name: "Fashion",
    slug: "fashion",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop",
  },
  {
    id: "3",
    name: "Home & Garden",
    slug: "home-garden",
    image:
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&h=600&fit=crop",
  },
  {
    id: "4",
    name: "Sports & Outdoors",
    slug: "sports-outdoors",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop",
  },
  {
    id: "5",
    name: "Books",
    slug: "books",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&h=600&fit=crop",
  },
  {
    id: "6",
    name: "Toys & Games",
    slug: "toys-games",
    image:
      "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=800&h=600&fit=crop",
  },
];

export const products = [
  {
    id: "1",
    name: "Wireless Noise-Cancelling Headphones",
    description:
      "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and spacious sound for work and travel.",
    price: 299.99,
    originalPrice: 349.99,
    category: "Electronics",
    brand: "AudioTech",
    rating: 4.8,
    reviewCount: 1234,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop",
    ],
    inStock: true,
    tags: ["bestseller", "new"],
    colors: ["Black", "Silver", "Blue"],
  },
  {
    id: "2",
    name: "Smart Watch Series 7",
    description:
      "A fitness-first smartwatch with GPS, heart-rate insights, notifications, and water resistance for everyday wear.",
    price: 399.99,
    category: "Electronics",
    brand: "TechWear",
    rating: 4.6,
    reviewCount: 892,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&h=800&fit=crop",
    ],
    inStock: true,
    tags: ["featured"],
    colors: ["Black", "Rose Gold", "Space Gray"],
  },
  {
    id: "3",
    name: "4K Ultra HD Camera",
    description:
      "A mirrorless camera with a 24.2 MP sensor, 4K capture, fast autofocus, and a flexible everyday kit lens.",
    price: 1299.99,
    originalPrice: 1499.99,
    category: "Electronics",
    brand: "PhotoPro",
    rating: 4.9,
    reviewCount: 567,
    images: [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=800&fit=crop",
    ],
    inStock: true,
    tags: ["bestseller"],
  },
  {
    id: "4",
    name: "Bluetooth Speaker Pro",
    description:
      "A rugged waterproof speaker with 360-degree sound, deep bass, and all-day battery life for outdoor sessions.",
    price: 149.99,
    category: "Electronics",
    brand: "SoundWave",
    rating: 4.5,
    reviewCount: 2103,
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&h=800&fit=crop",
    ],
    inStock: true,
    colors: ["Red", "Blue", "Black", "Green"],
  },
  {
    id: "5",
    name: "Premium Leather Jacket",
    description:
      "A genuine leather jacket with a timeless silhouette, polished hardware, and a comfortable inner lining.",
    price: 249.99,
    originalPrice: 299.99,
    category: "Fashion",
    brand: "StyleCo",
    rating: 4.7,
    reviewCount: 445,
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1520975867597-0af37a22e31e?w=800&h=800&fit=crop",
    ],
    inStock: true,
    tags: ["new"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Brown"],
  },
  {
    id: "6",
    name: "Designer Sunglasses",
    description:
      "Polarized sunglasses with UV400 protection, lightweight frames, and a classic everyday shape.",
    price: 179.99,
    category: "Fashion",
    brand: "VisionLux",
    rating: 4.4,
    reviewCount: 678,
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&h=800&fit=crop",
    ],
    inStock: true,
    colors: ["Black", "Tortoise", "Gold"],
  },
  {
    id: "7",
    name: "Classic Canvas Sneakers",
    description:
      "Comfortable low-top sneakers with a durable canvas upper and cushioned sole for daily wear.",
    price: 79.99,
    category: "Fashion",
    brand: "UrbanStep",
    rating: 4.3,
    reviewCount: 1567,
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop",
    ],
    inStock: true,
    tags: ["bestseller"],
    sizes: ["6", "7", "8", "9", "10", "11"],
    colors: ["White", "Black", "Red", "Navy"],
  },
  {
    id: "8",
    name: "Wool Blend Coat",
    description:
      "A structured wool-blend coat with a clean button front, warm feel, and easy day-to-night styling.",
    price: 199.99,
    originalPrice: 259.99,
    category: "Fashion",
    brand: "WinterWear",
    rating: 4.6,
    reviewCount: 334,
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=800&fit=crop",
    ],
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Camel", "Gray", "Navy"],
  },
  {
    id: "9",
    name: "Modern Table Lamp",
    description:
      "A minimalist LED lamp with adjustable brightness, touch controls, and a built-in USB charging port.",
    price: 89.99,
    category: "Home & Garden",
    brand: "LightHouse",
    rating: 4.5,
    reviewCount: 892,
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&h=800&fit=crop",
    ],
    inStock: true,
    tags: ["featured"],
    colors: ["White", "Black", "Wood"],
  },
  {
    id: "10",
    name: "Ceramic Plant Pot Set",
    description:
      "A handcrafted set of three ceramic pots with drainage, bamboo trays, and a clean indoor look.",
    price: 45.99,
    category: "Home & Garden",
    brand: "GreenSpace",
    rating: 4.7,
    reviewCount: 1245,
    images: [
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&h=800&fit=crop",
    ],
    inStock: true,
    tags: ["bestseller"],
  },
  {
    id: "11",
    name: "Premium Throw Pillow",
    description:
      "A soft velvet accent pillow with hypoallergenic fill and a machine-washable cover for easy upkeep.",
    price: 34.99,
    category: "Home & Garden",
    brand: "CozyHome",
    rating: 4.4,
    reviewCount: 567,
    images: [
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=800&fit=crop",
    ],
    inStock: true,
    colors: ["Navy", "Gray", "Blush", "Mustard"],
  },
  {
    id: "12",
    name: "Bamboo Cutting Board Set",
    description:
      "Three eco-friendly bamboo boards with juice grooves, handles, and long-lasting kitchen utility.",
    price: 49.99,
    category: "Home & Garden",
    brand: "EcoKitchen",
    rating: 4.8,
    reviewCount: 789,
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1565183928294-7d22f6c78a41?w=800&h=800&fit=crop",
    ],
    inStock: true,
    tags: ["new"],
  },
  {
    id: "13",
    name: "Yoga Mat Pro",
    description:
      "An extra-thick non-slip exercise mat made from eco-friendly TPE, complete with a carrying strap.",
    price: 59.99,
    originalPrice: 79.99,
    category: "Sports & Outdoors",
    brand: "FitLife",
    rating: 4.6,
    reviewCount: 1456,
    images: [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1592432678016-e910b452bdc1?w=800&h=800&fit=crop",
    ],
    inStock: true,
    tags: ["bestseller"],
    colors: ["Purple", "Blue", "Pink", "Black"],
  },
  {
    id: "14",
    name: "Camping Tent - 4 Person",
    description:
      "A weather-ready family tent with easy setup, UV protection, airflow windows, and generous floor space.",
    price: 189.99,
    category: "Sports & Outdoors",
    brand: "AdventureGear",
    rating: 4.5,
    reviewCount: 634,
    images: [
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=800&fit=crop",
    ],
    inStock: true,
    colors: ["Green", "Blue"],
  },
  {
    id: "15",
    name: "Stainless Steel Water Bottle",
    description:
      "A double-wall insulated bottle that keeps drinks cold for 24 hours and hot for 12 hours.",
    price: 29.99,
    category: "Sports & Outdoors",
    brand: "HydroMax",
    rating: 4.7,
    reviewCount: 2234,
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&h=800&fit=crop",
    ],
    inStock: true,
    tags: ["featured"],
    colors: ["Black", "White", "Blue", "Pink", "Green"],
  },
  {
    id: "16",
    name: "Adjustable Dumbbells Set",
    description:
      "Space-saving dumbbells with quick dial adjustments, a storage tray, and a full at-home strength range.",
    price: 349.99,
    originalPrice: 399.99,
    category: "Sports & Outdoors",
    brand: "PowerFit",
    rating: 4.9,
    reviewCount: 456,
    images: [
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=800&fit=crop",
    ],
    inStock: true,
    tags: ["bestseller"],
  },
  {
    id: "17",
    name: "The Art of Programming",
    description:
      "A modern software guide that covers algorithms, patterns, data structures, and practical engineering habits.",
    price: 49.99,
    category: "Books",
    brand: "TechBooks",
    rating: 4.8,
    reviewCount: 1123,
    images: [
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&h=800&fit=crop",
    ],
    inStock: true,
    tags: ["bestseller"],
  },
  {
    id: "18",
    name: "Mindfulness for Beginners",
    description:
      "An approachable introduction to meditation, stress reduction, and daily mindfulness habits.",
    price: 24.99,
    category: "Books",
    brand: "WellnessPress",
    rating: 4.5,
    reviewCount: 889,
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop",
    ],
    inStock: true,
  },
  {
    id: "19",
    name: "Cookbook: World Flavors",
    description:
      "A richly photographed cookbook packed with more than 200 globally inspired recipes and kitchen guidance.",
    price: 39.99,
    originalPrice: 49.99,
    category: "Books",
    brand: "CulinaryArts",
    rating: 4.7,
    reviewCount: 567,
    images: [
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&h=800&fit=crop",
    ],
    inStock: true,
    tags: ["new"],
  },
  {
    id: "20",
    name: "Science Fiction Collection",
    description:
      "A boxed set of award-winning science fiction novels spanning space opera, cyberpunk, and dystopian worlds.",
    price: 69.99,
    category: "Books",
    brand: "Epic Tales",
    rating: 4.9,
    reviewCount: 345,
    images: [
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=800&fit=crop",
    ],
    inStock: true,
    tags: ["featured"],
  },
  {
    id: "21",
    name: "Building Blocks Set - 1000 Pieces",
    description:
      "A creative block set with specialty parts, wheels, windows, and plenty of room for imaginative builds.",
    price: 59.99,
    category: "Toys & Games",
    brand: "BuildMaster",
    rating: 4.6,
    reviewCount: 1678,
    images: [
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=800&h=800&fit=crop",
    ],
    inStock: true,
    tags: ["bestseller"],
  },
  {
    id: "22",
    name: "Strategy Board Game",
    description:
      "A family-friendly strategy game with rich artwork, deep choices, and a satisfying 60 to 90 minute playtime.",
    price: 44.99,
    category: "Toys & Games",
    brand: "GameNight",
    rating: 4.8,
    reviewCount: 892,
    images: [
      "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=800&h=800&fit=crop",
    ],
    inStock: true,
    tags: ["featured"],
  },
  {
    id: "23",
    name: "Remote Control Race Car",
    description:
      "A fast rechargeable RC car with 2.4 GHz control, sharp handling, and a playful weekend-ready design.",
    price: 79.99,
    originalPrice: 99.99,
    category: "Toys & Games",
    brand: "SpeedToy",
    rating: 4.4,
    reviewCount: 567,
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=800&fit=crop",
    ],
    inStock: true,
    colors: ["Red", "Blue"],
  },
  {
    id: "24",
    name: "Puzzle - 1000 Piece Landscape",
    description:
      "A premium jigsaw puzzle featuring scenic photography, sturdy pieces, and a full-size reference poster.",
    price: 24.99,
    category: "Toys & Games",
    brand: "PuzzlePro",
    rating: 4.5,
    reviewCount: 1234,
    images: [
      "https://images.unsplash.com/photo-1587731556938-38755b4803a6?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1543107677-9d77fe40d4cd?w=800&h=800&fit=crop",
    ],
    inStock: true,
  },
];

export const heroSlides = [
  {
    eyebrow: "Flash deals live now",
    title: "Next-level electronics for everyday momentum",
    copy:
      "Shop premium gear, audio, wearables, and work-from-anywhere essentials with limited-time savings.",
    cta: "Shop electronics",
    secondaryCta: "Browse all products",
    ctaPath: "/products?category=electronics",
    secondaryPath: "/products",
    image:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1600&h=900&fit=crop",
    accent: "electric",
  },
  {
    eyebrow: "New collection 2026",
    title: "Fresh fashion built for the modern routine",
    copy:
      "From premium outerwear to everyday sneakers, discover confident pieces with comfort-first details.",
    cta: "Explore fashion",
    secondaryCta: "See lookbook",
    ctaPath: "/products?category=fashion",
    secondaryPath: "/about",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=900&fit=crop",
    accent: "violet",
  },
  {
    eyebrow: "Home refresh",
    title: "Calm spaces, better routines, brighter rooms",
    copy:
      "Bring warmth to your setup with practical home goods, clean lines, and small details that feel considered.",
    cta: "Shop home",
    secondaryCta: "See story",
    ctaPath: "/products?category=home-garden",
    secondaryPath: "/about",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&h=900&fit=crop",
    accent: "cyan",
  },
];

export const homeBenefits = [
  { icon: "truck", title: "Free shipping", detail: "On orders over $50" },
  { icon: "shield", title: "Secure payments", detail: "Encrypted checkout flow" },
  { icon: "rotate", title: "Easy returns", detail: "30-day hassle-free window" },
  { icon: "sparkles", title: "Smart discovery", detail: "Curated picks across every page" },
];

export const aiSuggestions = [
  "Trending audio gear near you",
  "Fresh sneaker drops matched to your taste",
  "Highly rated tech deals this week",
  "Home essentials for a calmer setup",
  "Workout favorites aligned to your wishlist",
];

export const faqItems = [
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit cards, PayPal, Apple Pay, and other standard digital checkout options in this demo storefront.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping usually takes 5 to 7 business days. Express delivery options can arrive in 2 to 3 business days.",
  },
  {
    question: "What is your return policy?",
    answer:
      "Most items can be returned within 30 days if they are unused and in their original packaging.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes. Delivery windows and costs vary by location, but the storefront is set up to represent a global-friendly catalog.",
  },
  {
    question: "How can I track my order?",
    answer:
      "You will see new orders in the order history area after checkout, and customers typically receive tracking updates by email.",
  },
  {
    question: "Can I cancel or edit an order?",
    answer:
      "Orders can usually be updated shortly after purchase. For this demo, order updates are mocked and shown as standard support guidance.",
  },
];

export const contactCards = [
  {
    icon: "mail",
    title: "Email us",
    info: "support@swiftbuy.com",
    detail: "Expect a reply within one business day.",
  },
  {
    icon: "phone",
    title: "Call us",
    info: "1-800-SWIFTBUY",
    detail: "Monday to Friday, 9 AM to 6 PM EST.",
  },
  {
    icon: "mapPin",
    title: "Visit us",
    info: "123 Commerce Street, New York, NY 10001",
    detail: "Come by for brand and partner meetings.",
  },
];

export const trustedBrands = [
  "AudioTech",
  "TechWear",
  "PhotoPro",
  "StyleCo",
  "FitLife",
  "GameNight",
];

export const mockOrders = [
  {
    id: "12345",
    date: "2026-02-15",
    status: "Delivered",
    total: 299.99,
    itemsCount: 3,
    items: [],
  },
  {
    id: "12346",
    date: "2026-02-28",
    status: "Shipped",
    total: 149.99,
    itemsCount: 1,
    items: [],
  },
  {
    id: "12347",
    date: "2026-03-01",
    status: "Processing",
    total: 89.99,
    itemsCount: 2,
    items: [],
  },
];
