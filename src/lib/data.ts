/**
 * Core data types and mock data for the Elomaze real estate platform
 *
 * This file contains:
 * - TypeScript interfaces for type safety
 * - Mock data for development and demonstration
 * - Static data arrays for dropdowns and filters
 *
 * For production: Replace the mock data import with actual API calls
 * to your backend database or external property APIs.
 */

/**
 * Property interface defining the structure of real estate listings
 *
 * This interface ensures type safety across the application
 * when working with property data. All property-related components
 * and services should use this type.
 */
export interface Property {
  id: string;
  title: string;
  location: string;
  city: string;
  state: string;
  lga: string; // Local Government Area
  price: number;
  priceLabel: string; // Formatted price display (e.g., "₦2.5M/year")
  beds: number;
  baths: number;
  type: string; // Apartment, Duplex, Self Contain, etc.
  image: string;
  verified: boolean; // Property verification status
  featured: boolean; // Featured property for homepage
  furnished: boolean;
  sqm: number; // Square meters
  parking: number;
  amenities: string[];
  description: string;
  agent: { name: string; phone: string; image: string };
}

// Re-export all properties from the dedicated data file
// This keeps the main data.ts file clean while providing easy access
export { allProperties as properties } from "./properties-data";

/**
 * Array of major Nigerian cities where properties are available
 * Used in search filters, location dropdowns, and autocomplete
 */
export const cities = [
  "Lagos",
  "Abuja",
  "Benin City",
  "Port Harcourt",
  "Asaba",
  "Warri",
  "Enugu",
  "Awka",
  "Onitsha",
  "Ibadan",
  "Owerri",
  "Uyo",
  "Calabar",
  "Kaduna",
  "Kano",
];

/**
 * Available property types on the platform
 * These are the categories users can filter by
 */
export const propertyTypes = [
  "Apartment",
  "Duplex",
  "Self Contain",
  "Student Lodge",
  "Shortlet",
];

/**
 * Customer testimonials for social proof
 * Displayed on the homepage and marketing pages
 */
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

/**
 * Demo conversation data for the messaging feature
 *
 * This simulates the chat functionality between users and agents.
 * In production, this would come from a real-time messaging service
 * or your backend API with WebSocket support.
 */
export const demoMessages = [
  {
    id: "m1",
    agentName: "Chidi Okafor",
    propertyTitle: "Luxury 3-Bedroom Apartment",
    messages: [
      {
        sender: "user" as const,
        text: "Is this apartment still available?",
        time: "2:30 PM",
      },
      {
        sender: "agent" as const,
        text: "Yes it is! Would you like to schedule a visit?",
        time: "2:32 PM",
      },
      {
        sender: "user" as const,
        text: "Yes please. Is tomorrow afternoon good?",
        time: "2:33 PM",
      },
      {
        sender: "agent" as const,
        text: "Perfect. Let's do 3pm tomorrow. I'll send you the exact address.",
        time: "2:35 PM",
      },
    ],
  },
  {
    id: "m2",
    agentName: "Amina Bello",
    propertyTitle: "5-Bedroom Detached Duplex",
    messages: [
      {
        sender: "user" as const,
        text: "What's the final price for the duplex?",
        time: "10:15 AM",
      },
      {
        sender: "agent" as const,
        text: "The asking price is ₦85M but there's room for negotiation for serious buyers.",
        time: "10:20 AM",
      },
    ],
  },
  {
    id: "m3",
    agentName: "Efe Okoro",
    propertyTitle: "Furnished Shortlet Apartment",
    messages: [
      {
        sender: "user" as const,
        text: "Is this apartment available for next weekend?",
        time: "9:00 AM",
      },
      {
        sender: "agent" as const,
        text: "Yes, inspection tomorrow.",
        time: "9:05 AM",
      },
    ],
  },
];
