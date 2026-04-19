/**
 * Main Messages component - The root component for the messaging interface
 *
 * This component manages the overall messaging layout with:
 * - Left sidebar: Conversation list with search functionality
 * - Right panel: Active chat window or empty state
 * - State management for selected conversation and messages
 *
 * Features:
 * - Responsive design that works on mobile and desktop
 * - Real-time message updates (demo for now)
 * - Search and filter conversations
 * - Mark messages as read when conversation is selected
 */

import React, { useState, useMemo } from "react";
import { useNavigate, useSearch, useLocation } from "@tanstack/react-router";
import { Conversation, MessagesProps } from "@/types/messages";
import { generateDemoConversations } from "@/lib/messages-data";
import { ConversationList } from "./messages/ConversationList";
import ChatWindow from "./messages/ChatWindow";

/**
 * Main Messages Component
 *
 * @param conversations - Optional array of conversations (uses demo data if not provided)
 * @param selectedConversationId - ID of currently selected conversation
 * @param onConversationSelect - Callback when conversation is selected
 * @param onSendMessage - Callback when message is sent
 */
export const Messages: React.FC<MessagesProps> = ({
  conversations: propConversations,
  selectedConversationId: propSelectedConversationId,
  onConversationSelect: propOnConversationSelect,
  onSendMessage: propOnSendMessage,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const search = useSearch({ strict: false }) as Record<
    string,
    string | undefined
  >;

  // Determine the base route for navigation (admin vs agent vs user messages)
  const baseRoute = location.pathname.startsWith("/admin/messages")
    ? "/admin/messages"
    : location.pathname.startsWith("/agent/messages")
      ? "/agent/messages"
      : "/messages";

  // State management
  const [conversations, setConversations] = useState<Conversation[]>(
    propConversations || generateDemoConversations(),
  );
  const selectedConversationId =
    search.chat || propSelectedConversationId || "";
  const [searchQuery, setSearchQuery] = useState("");

  // Get the currently selected conversation
  const selectedConversation = useMemo(() => {
    return conversations.find((conv) => conv.id === selectedConversationId);
  }, [conversations, selectedConversationId]);

  // Filter conversations based on search query
  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversations;

    const query = searchQuery.toLowerCase();
    return conversations.filter(
      (conv) =>
        conv.participant.name.toLowerCase().includes(query) ||
        conv.lastMessage.content.toLowerCase().includes(query),
    );
  }, [conversations, searchQuery]);

  // Handle conversation selection
  const handleConversationSelect = (conversationId: string) => {
    // Update URL to include chat parameter with correct base route
    navigate({
      to: baseRoute,
      search: { chat: conversationId },
    });

    // Mark messages as read for the selected conversation
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId ? { ...conv, unreadCount: 0 } : conv,
      ),
    );

    // Call external handler if provided
    if (propOnConversationSelect) {
      propOnConversationSelect(conversationId);
    }
  };

  // Handle navigation back to conversation list
  const handleBack = () => {
    navigate({ to: baseRoute, search: {} });
  };

  // Handle sending a new message
  const handleSendMessage = (conversationId: string, content: string) => {
    const newMessage = {
      id: `m${Date.now()}`,
      content: content.trim(),
      timestamp: new Date(),
      isFromCurrentUser: true,
      senderId: "current-user",
    };

    // Update conversations with the new message
    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessage: newMessage,
            updatedAt: new Date(),
          };
        }
        return conv;
      }),
    );

    // Call external handler if provided
    if (propOnSendMessage) {
      propOnSendMessage(conversationId, content);
    }
  };

  // Handle sending message from chat window
  const handleChatWindowSendMessage = (content: string) => {
    if (selectedConversationId && content.trim()) {
      handleSendMessage(selectedConversationId, content);
    }
  };

  return (
    <div className="flex h-full bg-background overflow-hidden">
      {/* Left Sidebar - Conversation List */}
      <div className="w-full md:w-96 lg:w-105 border-r border-border shrink-0">
        <ConversationList
          conversations={filteredConversations}
          selectedConversationId={selectedConversationId}
          onConversationSelect={handleConversationSelect}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      {/* Right Panel - Chat Window */}
      <div className="flex-1 hidden md:flex min-w-0 h-full">
        {selectedConversation ? (
          <ChatWindow
            conversation={selectedConversation}
            onSendMessage={handleChatWindowSendMessage}
          />
        ) : (
          // Empty state when no conversation is selected
          <div className="flex flex-1 items-center justify-center w-full h-full">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Your Messages
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Select a conversation to start chatting with agents, sellers, or
                service providers.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Mobile: Show chat window when conversation is selected */}
      {selectedConversation && (
        <div className="fixed inset-0 z-50 md:hidden">
          <ChatWindow
            conversation={selectedConversation}
            onSendMessage={handleChatWindowSendMessage}
            onBack={handleBack}
          />
        </div>
      )}
    </div>
  );
};

/**
 * Default export for easy importing
 */
export default Messages;
