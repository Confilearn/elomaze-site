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
    type: "Student Lodge",
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
    type: "Self Contain",
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
    type: "Duplex",
    image: "property-6",
    verified: true,
    featured: true,
    amenities: ["Borehole", "Security", "Parking", "Generator Backup", "Garden"],
    description: "Premium 4-bedroom detached house in the exclusive GRA area of Port Harcourt. Large compound, beautiful garden, and top-notch security.",
    agent: { name: "Ngozi Ibe", phone: "+234 806 789 0123", image: "" },
  },
  {
    id: "7",
    title: "2-Bedroom Flat in Enugu",
    location: "Independence Layout, Enugu",
    city: "Enugu",
    price: 800000,
    priceLabel: "₦800,000/yr",
    beds: 2,
    baths: 2,
    type: "Apartment",
    image: "property-1",
    verified: true,
    featured: false,
    amenities: ["Borehole", "Security", "Parking", "Prepaid Meter"],
    description: "Spacious 2-bedroom flat in the serene Independence Layout. Close to major amenities, schools, and markets.",
    agent: { name: "Emeka Nwosu", phone: "+234 807 890 1234", image: "" },
  },
  {
    id: "8",
    title: "Executive 3-Bed Apartment",
    location: "Awka, Anambra",
    city: "Awka",
    price: 1500000,
    priceLabel: "₦1,500,000/yr",
    beds: 3,
    baths: 2,
    type: "Apartment",
    image: "property-2",
    verified: true,
    featured: false,
    amenities: ["Borehole", "Security", "Parking", "Generator Backup"],
    description: "Executive 3-bedroom apartment in Awka with modern finishing. Quiet neighborhood ideal for families and professionals.",
    agent: { name: "Chioma Eze", phone: "+234 808 901 2345", image: "" },
  },
];

export const cities = ["Lagos", "Abuja", "Benin City", "Port Harcourt", "Delta", "Enugu", "Awka"];

export const propertyTypes = ["Apartment", "Duplex", "Self Contain", "Student Lodge", "Shortlet"];

export const testimonials = [
  {
    id: "t1",
    name: "Aisha Mohammed",
    location: "Abuja",
    text: "Elomaze helped me find a verified 3-bedroom in Gwarinpa within a week. The agent was professional and the listing was exactly as described.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Emeka Obi",
    location: "Lagos",
    text: "As a student, finding affordable accommodation in Lagos was stressful until I found Elomaze. Got a great mini flat in Yaba at a fair price.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Blessing Adekunle",
    location: "Port Harcourt",
    text: "The verified badge gave me so much confidence. I knew the property was real before I even visited. Highly recommend Elomaze!",
    rating: 5,
  },
];

export const demoMessages = [
  {
    id: "m1",
    agentName: "Chidi Okafor",
    propertyTitle: "Luxury 3-Bedroom Apartment",
    messages: [
      { sender: "user" as const, text: "Is this apartment still available?", time: "2:30 PM" },
      { sender: "agent" as const, text: "Yes it is! Would you like to schedule a visit?", time: "2:32 PM" },
      { sender: "user" as const, text: "Yes please. Is tomorrow afternoon good?", time: "2:33 PM" },
      { sender: "agent" as const, text: "Perfect. Let's do 3pm tomorrow. I'll send you the exact address.", time: "2:35 PM" },
    ],
  },
  {
    id: "m2",
    agentName: "Amina Bello",
    propertyTitle: "5-Bedroom Detached Duplex",
    messages: [
      { sender: "user" as const, text: "What's the final price for the duplex?", time: "10:15 AM" },
      { sender: "agent" as const, text: "The asking price is ₦85M but there's room for negotiation for serious buyers.", time: "10:20 AM" },
    ],
  },
  {
    id: "m3",
    agentName: "Efe Okoro",
    propertyTitle: "Furnished Shortlet Apartment",
    messages: [
      { sender: "user" as const, text: "Is this apartment available for next weekend?", time: "9:00 AM" },
      { sender: "agent" as const, text: "Yes, inspection tomorrow.", time: "9:05 AM" },
    ],
  },
];
