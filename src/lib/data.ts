export interface Property {
  id: string;
  title: string;
  location: string;
  city: string;
  price: number;
  priceLabel: string;
  beds: number;
  baths: number;
  type: string;
  image: string;
  verified: boolean;
  featured: boolean;
  amenities: string[];
  description: string;
  agent: { name: string; phone: string; image: string };
}

export interface Service {
  id: string;
  name: string;
  category: string;
  location: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
  verified: boolean;
  description: string;
}

export interface CommunityQuestion {
  id: string;
  question: string;
  answer: string;
  location: string;
  upvotes: number;
  helpful: boolean;
  author: string;
  date: string;
}

export const properties: Property[] = [
  {
    id: "1",
    title: "Luxury 3-Bedroom Apartment",
    location: "Lekki Phase 1, Lagos",
    city: "Lagos",
    price: 4500000,
    priceLabel: "₦4,500,000/yr",
    beds: 3,
    baths: 3,
    type: "Apartment",
    image: "property-1",
    verified: true,
    featured: true,
    amenities: ["Borehole", "24/7 Security", "Parking", "Generator Backup", "Prepaid Meter", "Swimming Pool"],
    description: "Exquisite 3-bedroom apartment in the heart of Lekki Phase 1. Features modern finishes, spacious living areas, and stunning city views. Fully serviced estate with 24/7 security, swimming pool, and gym access.",
    agent: { name: "Chidi Okafor", phone: "+234 801 234 5678", image: "" },
  },
  {
    id: "2",
    title: "5-Bedroom Detached Duplex",
    location: "Gwarinpa, Abuja",
    city: "Abuja",
    price: 85000000,
    priceLabel: "₦85,000,000",
    beds: 5,
    baths: 5,
    type: "Duplex",
    image: "property-2",
    verified: true,
    featured: true,
    amenities: ["Borehole", "Security", "Parking", "Generator Backup", "Boys Quarter"],
    description: "Massive 5-bedroom fully detached duplex in Gwarinpa estate. Well-maintained compound with beautiful garden, security fence, and spacious rooms. Perfect for families.",
    agent: { name: "Amina Bello", phone: "+234 802 345 6789", image: "" },
  },
  {
    id: "3",
    title: "Student Hostel near UNIBEN",
    location: "Ugbowo, Benin City",
    city: "Benin City",
    price: 250000,
    priceLabel: "₦250,000/yr",
    beds: 1,
    baths: 1,
    type: "Hostel",
    image: "property-3",
    verified: true,
    featured: false,
    amenities: ["Borehole", "Security", "Prepaid Meter"],
    description: "Clean and affordable student accommodation near the University of Benin. Ugbowo axis with easy access to campus. Includes wardrobe and study space.",
    agent: { name: "Osaze Omoruyi", phone: "+234 803 456 7890", image: "" },
  },
  {
    id: "4",
    title: "Furnished Shortlet Apartment",
    location: "Asaba, Delta",
    city: "Delta",
    price: 35000,
    priceLabel: "₦35,000/night",
    beds: 2,
    baths: 2,
    type: "Shortlet",
    image: "property-4",
    verified: true,
    featured: true,
    amenities: ["AC", "WiFi", "Generator Backup", "Parking", "Smart TV"],
    description: "Beautifully furnished shortlet apartment in Asaba. Fully air-conditioned with smart TV, reliable WiFi, and backup generator. Perfect for business travelers.",
    agent: { name: "Efe Okoro", phone: "+234 804 567 8901", image: "" },
  },
  {
    id: "5",
    title: "Modern Mini Flat",
    location: "Yaba, Lagos",
    city: "Lagos",
    price: 1200000,
    priceLabel: "₦1,200,000/yr",
    beds: 1,
    baths: 1,
    type: "Mini Flat",
    image: "property-5",
    verified: true,
    featured: false,
    amenities: ["Prepaid Meter", "Security", "Parking"],
    description: "Contemporary mini flat in the heart of Yaba. Perfect for young professionals. Close to tech hubs, restaurants, and public transport.",
    agent: { name: "Tunde Adeyemi", phone: "+234 805 678 9012", image: "" },
  },
  {
    id: "6",
    title: "4-Bedroom Detached House",
    location: "GRA, Port Harcourt",
    city: "Port Harcourt",
    price: 65000000,
    priceLabel: "₦65,000,000",
    beds: 4,
    baths: 4,
    type: "House",
    image: "property-6",
    verified: true,
    featured: true,
    amenities: ["Borehole", "Security", "Parking", "Generator Backup", "Garden"],
    description: "Premium 4-bedroom detached house in the exclusive GRA area of Port Harcourt. Large compound, beautiful garden, and top-notch security.",
    agent: { name: "Ngozi Ibe", phone: "+234 806 789 0123", image: "" },
  },
];

export const services: Service[] = [
  {
    id: "s1",
    name: "QuickMove Logistics",
    category: "Movers",
    location: "Lagos",
    price: "From ₦25,000",
    rating: 4.8,
    reviews: 234,
    image: "🚚",
    verified: true,
    description: "Professional moving and logistics services across Lagos. We handle packing, loading, transportation, and unpacking with care.",
  },
  {
    id: "s2",
    name: "SparkFix Electricals",
    category: "Electricians",
    location: "Abuja",
    price: "From ₦5,000",
    rating: 4.9,
    reviews: 189,
    image: "⚡",
    verified: true,
    description: "Licensed electricians for all your electrical needs. From wiring to repairs, we've got you covered.",
  },
  {
    id: "s3",
    name: "PipeWorks NG",
    category: "Plumbers",
    location: "Lagos",
    price: "From ₦8,000",
    rating: 4.7,
    reviews: 156,
    image: "🔧",
    verified: true,
    description: "Expert plumbing solutions for homes and offices. Available 24/7 for emergencies.",
  },
  {
    id: "s4",
    name: "FreshPress Laundry",
    category: "Laundry",
    location: "Port Harcourt",
    price: "From ₦3,000",
    rating: 4.6,
    reviews: 312,
    image: "👕",
    verified: true,
    description: "Premium laundry and dry cleaning services with free pickup and delivery.",
  },
  {
    id: "s5",
    name: "CleanSpace NG",
    category: "Cleaning",
    location: "Lagos",
    price: "From ₦15,000",
    rating: 4.8,
    reviews: 278,
    image: "✨",
    verified: true,
    description: "Professional home and office cleaning services. Deep cleaning, regular maintenance, and post-construction cleanup.",
  },
  {
    id: "s6",
    name: "NetConnect Pro",
    category: "Internet Setup",
    location: "Abuja",
    price: "From ₦10,000",
    rating: 4.5,
    reviews: 145,
    image: "📡",
    verified: true,
    description: "Fast internet installation and setup. We work with all major ISPs for the best rates.",
  },
  {
    id: "s7",
    name: "SwiftRider Dispatch",
    category: "Dispatch Riders",
    location: "Lagos",
    price: "From ₦1,500",
    rating: 4.7,
    reviews: 456,
    image: "🏍️",
    verified: true,
    description: "Fast and reliable dispatch services across Lagos. Same-day delivery guaranteed.",
  },
  {
    id: "s8",
    name: "GuardForce Security",
    category: "Security",
    location: "Benin City",
    price: "From ₦50,000/mo",
    rating: 4.9,
    reviews: 98,
    image: "🛡️",
    verified: true,
    description: "Professional security guard services and CCTV installation for homes and businesses.",
  },
];

export const communityQuestions: CommunityQuestion[] = [
  {
    id: "q1",
    question: "Best route to Apapa from Festac?",
    answer: "Leave before 6:30am to avoid traffic. Use the Amuwo-Odofin link bridge — it's faster than going through Mile 2.",
    location: "Apapa",
    upvotes: 47,
    helpful: true,
    author: "Lagos Commuter",
    date: "2 days ago",
  },
  {
    id: "q2",
    question: "Is Yaba safe for students?",
    answer: "Yes, but stay near main roads. Areas around Unilag and Yaba Tech are well-populated. Avoid walking alone late at night in quiet streets.",
    location: "Yaba",
    upvotes: 83,
    helpful: true,
    author: "UNILAG Grad",
    date: "1 week ago",
  },
  {
    id: "q3",
    question: "Affordable hostels near UNIBEN?",
    answer: "Ugbowo axis has the cheapest options — ₦150k-₦300k range. Ekosodin is also good but slightly pricier. Check early before school resumes.",
    location: "Benin City",
    upvotes: 62,
    helpful: true,
    author: "UNIBEN Student",
    date: "3 days ago",
  },
  {
    id: "q4",
    question: "Best areas to live in Abuja on a budget?",
    answer: "Kubwa, Lugbe, and Karu are affordable with decent infrastructure. Kubwa has the best road network among the three.",
    location: "Abuja",
    upvotes: 91,
    helpful: true,
    author: "Abuja Resident",
    date: "5 days ago",
  },
  {
    id: "q5",
    question: "How is the water situation in Warri?",
    answer: "Most estates have boreholes. Public water supply is unreliable. Budget ₦200k-₦400k for a borehole installation.",
    location: "Warri",
    upvotes: 34,
    helpful: true,
    author: "Delta Native",
    date: "1 week ago",
  },
  {
    id: "q6",
    question: "Internet providers in Lekki — which is best?",
    answer: "Spectranet and Tizeti are the most reliable. Spectranet is faster but pricier. Tizeti offers unlimited plans from ₦9,800/month.",
    location: "Lekki",
    upvotes: 156,
    helpful: true,
    author: "Tech Worker",
    date: "4 days ago",
  },
];

export const cities = ["Lagos", "Abuja", "Benin City", "Port Harcourt", "Delta", "Enugu", "Awka"];

export const serviceCategories = ["Movers", "Electricians", "Plumbers", "Laundry", "Cleaning", "Internet Setup", "Dispatch Riders", "Security"];

export const trendingLocations = ["Lekki", "Yaba", "Apapa", "Gwarinpa", "Festac", "Awka", "Benin City", "Asaba", "Warri", "Enugu"];
