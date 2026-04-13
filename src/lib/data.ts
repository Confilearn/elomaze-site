export interface Property {
  id: string;
  title: string;
  location: string;
  city: string;
  state: string;
  lga: string;
  price: number;
  priceLabel: string;
  beds: number;
  baths: number;
  type: string;
  image: string;
  verified: boolean;
  featured: boolean;
  furnished: boolean;
  sqm: number;
  parking: number;
  amenities: string[];
  description: string;
  agent: { name: string; phone: string; image: string };
}

// Re-export all properties from the dedicated file
export { allProperties as properties } from "./properties-data";

export const cities = ["Lagos", "Abuja", "Benin City", "Port Harcourt", "Asaba", "Warri", "Enugu", "Awka", "Onitsha", "Ibadan", "Owerri", "Uyo", "Calabar", "Kaduna", "Kano"];

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
