/**
 * Message-related type definitions for the messaging system
 * These interfaces define the structure of conversations, messages, and users
 */

/**
 * Represents a single message in a conversation
 */
export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  isFromCurrentUser: boolean;
  senderId: string;
}

/**
 * Represents a user/participant in the messaging system
 */
export interface User {
  id: string;
  name: string;
  avatar: string; // Initials or image URL
  isVerified: boolean;
  isOnline?: boolean;
}

/**
 * Represents a conversation thread between users
 */
export interface Conversation {
  id: string;
  participant: User;
  lastMessage: Message;
  unreadCount: number;
  updatedAt: Date;
  messages: Message[];
}

/**
 * Props for the main Messages component
 */
export interface MessagesProps {
  conversations?: Conversation[];
  selectedConversationId?: string;
  onConversationSelect?: (conversationId: string) => void;
  onSendMessage?: (conversationId: string, content: string) => void;
}

/**
 * Props for the ConversationList component
 */
export interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId?: string;
  onConversationSelect: (conversationId: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

/**
 * Props for the ChatWindow component
 */
export interface ChatWindowProps {
  conversation?: Conversation;
  onSendMessage: (content: string) => void;
  isLoading?: boolean;
}

/**
 * Props for the MessageBubble component
 */
export interface MessageBubbleProps {
  message: Message;
  showTimestamp?: boolean;
  isConsecutive?: boolean;
}

/**
 * Props for the MessageInput component
 */
export interface MessageInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
  placeholder?: string;
}
