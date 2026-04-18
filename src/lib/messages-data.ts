/**
 * Demo data for the messaging system
 * This file contains sample conversations and messages that match the UI design
 * Later this will be replaced with backend API calls
 */

import { Conversation, Message, User } from '@/types/messages';

/**
 * Demo users that participate in conversations
 */
const demoUsers: User[] = [
  {
    id: '1',
    name: 'Adebayo Johnson',
    avatar: 'AJ',
    isVerified: true,
    isOnline: true,
  },
  {
    id: '2',
    name: 'Chioma Okeke',
    avatar: 'CO',
    isVerified: true,
    isOnline: false,
  },
  {
    id: '3',
    name: 'Emeka Nwankwo',
    avatar: 'EN',
    isVerified: false,
    isOnline: true,
  },
  {
    id: '4',
    name: 'Fatima Abdullahi',
    avatar: 'FA',
    isVerified: true,
    isOnline: false,
  },
  {
    id: '5',
    name: 'Ibrahim Musa',
    avatar: 'IM',
    isVerified: false,
    isOnline: false,
  },
];

/**
 * Demo messages for each conversation
 */
const demoMessages: Record<string, Message[]> = {
  '1': [
    {
      id: 'm1',
      content: 'The apartment at Lekki is still available. Would you like to schedule a viewing?',
      timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      isFromCurrentUser: false,
      senderId: '1',
    },
    {
      id: 'm2',
      content: 'Yes, I\'m interested. When can I come see it?',
      timestamp: new Date(Date.now() - 1 * 60 * 1000), // 1 minute ago
      isFromCurrentUser: true,
      senderId: 'current-user',
    },
    {
      id: 'm3',
      content: 'Great! I\'m available this afternoon from 2 PM to 6 PM. What time works best for you?',
      timestamp: new Date(Date.now() - 30 * 1000), // 30 seconds ago
      isFromCurrentUser: false,
      senderId: '1',
    },
  ],
  '2': [
    {
      id: 'm4',
      content: 'Thank you for your inquiry about the property in Ikoyi',
      timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      isFromCurrentUser: false,
      senderId: '2',
    },
    {
      id: 'm5',
      content: 'The price is ₦45,000,000 and it includes 4 bedrooms, 3 bathrooms',
      timestamp: new Date(Date.now() - 55 * 60 * 1000), // 55 minutes ago
      isFromCurrentUser: false,
      senderId: '2',
    },
  ],
  '3': [
    {
      id: 'm6',
      content: 'Hello, I saw your listing for the office space',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      isFromCurrentUser: true,
      senderId: 'current-user',
    },
    {
      id: 'm7',
      content: 'Is it still available for rent?',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      isFromCurrentUser: true,
      senderId: 'current-user',
    },
  ],
  '4': [
    {
      id: 'm8',
      content: 'The documents have been sent to your email',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      isFromCurrentUser: false,
      senderId: '4',
    },
  ],
  '5': [
    {
      id: 'm9',
      content: 'Payment received. Thank you!',
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
      isFromCurrentUser: false,
      senderId: '5',
    },
  ],
};

/**
 * Generate demo conversations with realistic data matching the UI design
 */
export const generateDemoConversations = (): Conversation[] => {
  return [
    {
      id: '1',
      participant: demoUsers[0],
      lastMessage: demoMessages['1'][demoMessages['1'].length - 1],
      unreadCount: 2,
      updatedAt: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      messages: demoMessages['1'],
    },
    {
      id: '2',
      participant: demoUsers[1],
      lastMessage: demoMessages['2'][demoMessages['2'].length - 1],
      unreadCount: 0,
      updatedAt: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      messages: demoMessages['2'],
    },
    {
      id: '3',
      participant: demoUsers[2],
      lastMessage: demoMessages['3'][demoMessages['3'].length - 1],
      unreadCount: 1,
      updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      messages: demoMessages['3'],
    },
    {
      id: '4',
      participant: demoUsers[3],
      lastMessage: demoMessages['4'][demoMessages['4'].length - 1],
      unreadCount: 0,
      updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      messages: demoMessages['4'],
    },
    {
      id: '5',
      participant: demoUsers[4],
      lastMessage: demoMessages['5'][demoMessages['5'].length - 1],
      unreadCount: 0,
      updatedAt: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
      messages: demoMessages['5'],
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

  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays < 7) return `${diffInDays}d ago`;
  
  return date.toLocaleDateString();
};

/**
 * Utility function to format message time (HH:MM AM/PM format)
 */
export const formatMessageTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};
