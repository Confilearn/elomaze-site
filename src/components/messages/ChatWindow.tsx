/**
 * ChatWindow Component - Right panel showing the active conversation
 *
 * This component displays:
 * - Chat header with user info and actions
 * - Message list with bubbles for sent/received messages
 * - Message input area with attachment and send functionality
 *
 * Features:
 * - Auto-scroll to latest message
 * - Different styling for sent/received messages
 * - Message timestamps and read receipts
 * - Responsive design with mobile back navigation
 */

import React, { useRef, useEffect } from "react";
import {
  ArrowLeft,
  MoreVertical,
  Paperclip,
  Image,
  Smile,
  Send,
} from "lucide-react";
import { ChatWindowProps } from "@/types/messages";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { CheckCircle } from "lucide-react";

/**
 * ChatWindow Component
 *
 * @param conversation - Current conversation to display
 * @param onSendMessage - Callback when message is sent
 * @param onBack - Callback for mobile back navigation
 * @param isLoading - Loading state indicator
 */
export const ChatWindow: React.FC<
  ChatWindowProps & { onBack?: () => void }
> = ({ conversation, onSendMessage, onBack, isLoading = false }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation?.messages]);

  if (!conversation) {
    return (
      <div className="flex h-full flex-col">
        {/* Empty header */}
        <div className="border-b border-border p-4">
          <div className="flex items-center space-x-3">
            {onBack && (
              <button
                onClick={onBack}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-accent"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
            <div className="h-4 w-32 animate-pulse rounded bg-muted" />
          </div>
        </div>

        {/* Empty state */}
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Send className="h-8 w-8 text-muted-foreground" />
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
      </div>
    );
  }

  const { participant, messages } = conversation;

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Chat Header */}
      <div className="border-b border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Mobile back button */}
            {onBack && (
              <button
                onClick={onBack}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-accent md:hidden"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}

            {/* User avatar */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-medium">
              {participant.avatar}
            </div>

            {/* User info */}
            <div>
              <div className="flex items-center space-x-1">
                <h2 className="font-semibold text-foreground">
                  {participant.name}
                </h2>
                {participant.isVerified && (
                  <CheckCircle className="h-4 w-4 text-primary" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {participant.isOnline ? "Active now" : "Offline"}
              </p>
            </div>
          </div>

          {/* Actions */}
          <button className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-accent">
            <MoreVertical className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {isLoading ? (
          // Loading state
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <p className="mt-2 text-sm text-muted-foreground">
                Loading messages...
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Message bubbles */}
            <div className="space-y-4">
              {messages.map((message, index) => {
                const isConsecutive =
                  index > 0 &&
                  messages[index - 1].isFromCurrentUser ===
                    message.isFromCurrentUser &&
                  message.timestamp.getTime() -
                    messages[index - 1].timestamp.getTime() <
                    5 * 60 * 1000; // 5 minutes

                return (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    isConsecutive={isConsecutive}
                  />
                );
              })}
            </div>

            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Message Input */}
      <div className="border-t border-border bg-card p-4">
        <MessageInput
          onSendMessage={onSendMessage}
          placeholder="Type a message..."
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
