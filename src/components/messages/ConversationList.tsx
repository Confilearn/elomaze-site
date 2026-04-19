/**
 * ConversationList Component - Left sidebar showing all conversations
 *
 * This component displays:
 * - Messages header
 * - Search bar for filtering conversations
 * - List of conversation items with avatars, names, last messages, and unread counts
 *
 * Features:
 * - Real-time search filtering
 * - Visual indicators for unread messages and verified users
 * - Responsive design with proper hover states
 * - Time formatting (e.g., "2m ago", "1h ago")
 */

import React from "react";
import { Search, CheckCircle } from "lucide-react";
import { ConversationListProps, Conversation } from "@/types/messages";
import { formatTimeAgo } from "@/lib/messages-data";

/**
 * ConversationList Component
 *
 * @param conversations - Array of conversations to display
 * @param selectedConversationId - ID of currently selected conversation
 * @param onConversationSelect - Callback when conversation is clicked
 * @param searchQuery - Current search query
 * @param onSearchChange - Callback when search query changes
 */
export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedConversationId,
  onConversationSelect,
  searchQuery = "",
  onSearchChange,
}) => {
  return (
    <div className="flex h-full flex-col bg-card max-w-full overflow-hidden">
      {/* Header */}
      <div className="shrink-0 border-b border-border p-6">
        <h1 className="text-2xl font-bold text-foreground">Messages</h1>
      </div>

      {/* Search Bar */}
      <div className="shrink-0 border-b border-border p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-full rounded-lg bg-muted pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {conversations.length === 0 ? (
          // Empty state when no conversations match search
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-sm font-medium text-foreground">
              No conversations found
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Try adjusting your search terms
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {conversations.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                isSelected={conversation.id === selectedConversationId}
                onClick={() => onConversationSelect(conversation.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Individual conversation item component
 */
interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onClick: () => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  isSelected,
  onClick,
}) => {
  const { participant, lastMessage, unreadCount } = conversation;

  return (
    <div
      onClick={onClick}
      className={`
        relative cursor-pointer p-3 sm:p-4 transition-colors hover:bg-accent/50
        ${isSelected ? "bg-accent" : ""}
      `}
    >
      <div className="flex items-start space-x-3">
        {/* Avatar */}
        <div className="shrink-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-medium">
            {participant.avatar}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            {/* Name with verification badge */}
            <div className="flex items-center space-x-1">
              <h3 className="truncate text-sm font-medium text-foreground">
                {participant.name}
              </h3>
              {participant.isVerified && (
                <CheckCircle className="h-3 w-3 text-primary" />
              )}
            </div>

            {/* Timestamp */}
            <span className="text-xs text-muted-foreground">
              {formatTimeAgo(conversation.updatedAt)}
            </span>
          </div>

          {/* Last message preview */}
          <div className="mt-0.5 flex items-center justify-between gap-2">
            <p className="line-clamp-1 text-sm text-muted-foreground flex-1 min-w-0">
              {lastMessage.content}
            </p>

            {/* Unread count indicator */}
            {unreadCount > 0 && (
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-destructive text-xs font-medium text-destructive-foreground">
                {unreadCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Active conversation indicator */}
      {isSelected && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
      )}
    </div>
  );
};

export default ConversationList;
