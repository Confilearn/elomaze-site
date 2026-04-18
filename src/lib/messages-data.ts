/**
 * Demo data for the messaging system
 * This file contains sample conversations and messages that match the UI design
 * Later this will be replaced with backend API calls
 */

import { Conversation, Message, User } from "@/types/messages";

/**
 * Demo users that participate in conversations
 */
const demoUsers: User[] = [
  {
    id: "1",
    name: "Adebayo Johnson",
    avatar: "AJ",
    isVerified: true,
    isOnline: true,
  },
  {
    id: "2",
    name: "Chioma Okeke",
    avatar: "CO",
    isVerified: true,
    isOnline: false,
  },
  {
    id: "3",
    name: "Emeka Nwankwo",
    avatar: "EN",
    isVerified: false,
    isOnline: true,
  },
  {
    id: "4",
    name: "Fatima Abdullahi",
    avatar: "FA",
    isVerified: true,
    isOnline: false,
  },
  {
    id: "5",
    name: "Ibrahim Musa",
    avatar: "IM",
    isVerified: false,
    isOnline: false,
  },
  {
    id: "6",
    name: "Grace Okonkwo",
    avatar: "GO",
    isVerified: true,
    isOnline: true,
  },
  {
    id: "7",
    name: "Tunde Adeyemi",
    avatar: "TA",
    isVerified: false,
    isOnline: false,
  },
  {
    id: "8",
    name: "Ngozi Eze",
    avatar: "NE",
    isVerified: true,
    isOnline: true,
  },
  {
    id: "9",
    name: "David Okafor",
    avatar: "DO",
    isVerified: false,
    isOnline: false,
  },
  {
    id: "10",
    name: "Sarah Bello",
    avatar: "SB",
    isVerified: true,
    isOnline: true,
  },
];

/**
 * Demo messages for each conversation
 */
const demoMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "m1",
      content:
        "The apartment at Lekki is still available. Would you like to schedule a viewing?",
      timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      isFromCurrentUser: false,
      senderId: "1",
    },
    {
      id: "m2",
      content: "Yes, I'm interested. When can I come see it?",
      timestamp: new Date(Date.now() - 1 * 60 * 1000), // 1 minute ago
      isFromCurrentUser: true,
      senderId: "current-user",
    },
    {
      id: "m3",
      content:
        "Great! I'm available this afternoon from 2 PM to 6 PM. What time works best for you?",
      timestamp: new Date(Date.now() - 30 * 1000), // 30 seconds ago
      isFromCurrentUser: false,
      senderId: "1",
    },
    {
      id: "m10",
      content:
        "3 PM would be perfect for me. Should I bring anything for the viewing?",
      timestamp: new Date(Date.now() - 25 * 1000), // 25 seconds ago
      isFromCurrentUser: true,
      senderId: "current-user",
    },
    {
      id: "m11",
      content:
        "Perfect! Just bring a valid ID for verification. The address is 123 Lekki Phase 1, close to the shopping complex.",
      timestamp: new Date(Date.now() - 20 * 1000), // 20 seconds ago
      isFromCurrentUser: false,
      senderId: "1",
    },
  ],
  "2": [
    {
      id: "m4",
      content: "Thank you for your inquiry about the property in Ikoyi",
      timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      isFromCurrentUser: false,
      senderId: "2",
    },
    {
      id: "m5",
      content:
        "The price is ₦45,000,000 and it includes 4 bedrooms, 3 bathrooms",
      timestamp: new Date(Date.now() - 55 * 60 * 1000), // 55 minutes ago
      isFromCurrentUser: false,
      senderId: "2",
    },
    {
      id: "m12",
      content: "That sounds like a great property. Is the price negotiable?",
      timestamp: new Date(Date.now() - 50 * 60 * 1000), // 50 minutes ago
      isFromCurrentUser: true,
      senderId: "current-user",
    },
    {
      id: "m13",
      content:
        "There might be some room for negotiation for serious buyers. Are you ready to make a commitment?",
      timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
      isFromCurrentUser: false,
      senderId: "2",
    },
  ],
  "3": [
    {
      id: "m6",
      content: "Hello, I saw your listing for the office space",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      isFromCurrentUser: true,
      senderId: "current-user",
    },
    {
      id: "m7",
      content: "Is it still available for rent?",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      isFromCurrentUser: true,
      senderId: "current-user",
    },
    {
      id: "m14",
      content:
        "Yes, it's still available! The monthly rent is ₦250,000. Are you interested in a long-term lease?",
      timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000), // 2.5 hours ago
      isFromCurrentUser: false,
      senderId: "3",
    },
    {
      id: "m15",
      content: "That sounds reasonable. Can I schedule a visit for tomorrow?",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isFromCurrentUser: true,
      senderId: "current-user",
    },
  ],
  "4": [
    {
      id: "m8",
      content: "The documents have been sent to your email",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      isFromCurrentUser: false,
      senderId: "4",
    },
    {
      id: "m16",
      content: "Thank you! I've received them. Everything looks good.",
      timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000), // 23 hours ago
      isFromCurrentUser: true,
      senderId: "current-user",
    },
    {
      id: "m17",
      content: "Excellent! When would you like to proceed with the signing?",
      timestamp: new Date(Date.now() - 22 * 60 * 60 * 1000), // 22 hours ago
      isFromCurrentUser: false,
      senderId: "4",
    },
  ],
  "5": [
    {
      id: "m9",
      content: "Payment received. Thank you!",
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
      isFromCurrentUser: false,
      senderId: "5",
    },
    {
      id: "m18",
      content: "You're welcome! Looking forward to moving in next week.",
      timestamp: new Date(Date.now() - 47 * 60 * 60 * 1000), // 47 hours ago
      isFromCurrentUser: true,
      senderId: "current-user",
    },
  ],
  "6": [
    {
      id: "m19",
      content:
        "Hi! I'm interested in the 3-bedroom apartment in Victoria Island",
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      isFromCurrentUser: true,
      senderId: "current-user",
    },
    {
      id: "m20",
      content:
        "Hello! Yes, that property is available. The rent is ₦800,000 per month. Would you like more details?",
      timestamp: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
      isFromCurrentUser: false,
      senderId: "6",
    },
  ],
  "7": [
    {
      id: "m21",
      content:
        "Good morning! Is the shortlet apartment still available for this weekend?",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isFromCurrentUser: false,
      senderId: "7",
    },
    {
      id: "m22",
      content:
        "Yes, it's available! The rate is ₦25,000 per night. How many nights are you planning to stay?",
      timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000), // 1.5 hours ago
      isFromCurrentUser: true,
      senderId: "current-user",
    },
  ],
  "8": [
    {
      id: "m23",
      content: "Congratulations! Your rental application has been approved",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      isFromCurrentUser: false,
      senderId: "8",
    },
    {
      id: "m24",
      content:
        "Wow, that's amazing news! Thank you so much! What are the next steps?",
      timestamp: new Date(Date.now() - 3.5 * 60 * 60 * 1000), // 3.5 hours ago
      isFromCurrentUser: true,
      senderId: "current-user",
    },
  ],
  "9": [
    {
      id: "m25",
      content: "The maintenance team will fix the AC issue tomorrow by 10 AM",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      isFromCurrentUser: false,
      senderId: "9",
    },
    {
      id: "m26",
      content: "Thank you for the update. I appreciate the quick response!",
      timestamp: new Date(Date.now() - 5.5 * 60 * 60 * 1000), // 5.5 hours ago
      isFromCurrentUser: true,
      senderId: "current-user",
    },
  ],
  "10": [
    {
      id: "m27",
      content:
        "Welcome to our community! If you need any assistance, feel free to reach out",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      isFromCurrentUser: false,
      senderId: "10",
    },
    {
      id: "m28",
      content:
        "Thank you! I'm excited to be here. The apartment looks amazing!",
      timestamp: new Date(Date.now() - 11 * 60 * 60 * 1000), // 11 hours ago
      isFromCurrentUser: true,
      senderId: "current-user",
    },
  ],
};

/**
 * Generate demo conversations with realistic data matching the UI design
 */
export const generateDemoConversations = (): Conversation[] => {
  return [
    {
      id: "1",
      participant: demoUsers[0],
      lastMessage: demoMessages["1"][demoMessages["1"].length - 1],
      unreadCount: 2,
      updatedAt: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      messages: demoMessages["1"],
    },
    {
      id: "2",
      participant: demoUsers[1],
      lastMessage: demoMessages["2"][demoMessages["2"].length - 1],
      unreadCount: 0,
      updatedAt: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      messages: demoMessages["2"],
    },
    {
      id: "3",
      participant: demoUsers[2],
      lastMessage: demoMessages["3"][demoMessages["3"].length - 1],
      unreadCount: 1,
      updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      messages: demoMessages["3"],
    },
    {
      id: "4",
      participant: demoUsers[3],
      lastMessage: demoMessages["4"][demoMessages["4"].length - 1],
      unreadCount: 0,
      updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      messages: demoMessages["4"],
    },
    {
      id: "5",
      participant: demoUsers[4],
      lastMessage: demoMessages["5"][demoMessages["5"].length - 1],
      unreadCount: 0,
      updatedAt: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
      messages: demoMessages["5"],
    },
    {
      id: "6",
      participant: demoUsers[5],
      lastMessage: demoMessages["6"][demoMessages["6"].length - 1],
      unreadCount: 1,
      updatedAt: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
      messages: demoMessages["6"],
    },
    {
      id: "7",
      participant: demoUsers[6],
      lastMessage: demoMessages["7"][demoMessages["7"].length - 1],
      unreadCount: 0,
      updatedAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000), // 1.5 hours ago
      messages: demoMessages["7"],
    },
    {
      id: "8",
      participant: demoUsers[7],
      lastMessage: demoMessages["8"][demoMessages["8"].length - 1],
      unreadCount: 3,
      updatedAt: new Date(Date.now() - 3.5 * 60 * 60 * 1000), // 3.5 hours ago
      messages: demoMessages["8"],
    },
    {
      id: "9",
      participant: demoUsers[8],
      lastMessage: demoMessages["9"][demoMessages["9"].length - 1],
      unreadCount: 0,
      updatedAt: new Date(Date.now() - 5.5 * 60 * 60 * 1000), // 5.5 hours ago
      messages: demoMessages["9"],
    },
    {
      id: "10",
      participant: demoUsers[9],
      lastMessage: demoMessages["10"][demoMessages["10"].length - 1],
      unreadCount: 0,
      updatedAt: new Date(Date.now() - 11 * 60 * 60 * 1000), // 11 hours ago
      messages: demoMessages["10"],
    },
  ];
};

/**
 * Utility function to format timestamps relative to current time
 */
export const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays < 7) return `${diffInDays}d ago`;

  return date.toLocaleDateString();
};

/**
 * Utility function to format message time (HH:MM AM/PM format)
 */
export const formatMessageTime = (date: Date): string => {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};
