/**
 * MessageBubble Component - Individual message display
 *
 * This component renders a single message with:
 * - Different styling for sent vs received messages
 * - Message content and timestamp
 * - Proper spacing for consecutive messages
 * - Read receipt indicators for sent messages
 *
 * Features:
 * - Responsive design that works on all screen sizes
 * - Smooth animations for new messages
 * - Accessibility support with proper ARIA labels
 * - Time formatting (HH:MM AM/PM format)
 */

import React from "react";
import { MessageBubbleProps } from "@/types/messages";
import { formatMessageTime } from "@/lib/messages-data";
import { Check, CheckCheck } from "lucide-react";

/**
 * MessageBubble Component
 *
 * @param message - Message object to display
 * @param showTimestamp - Whether to show timestamp (default: true)
 * @param isConsecutive - Whether this message follows another from same sender
 */
export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  showTimestamp = true,
  isConsecutive = false,
}) => {
  const { content, timestamp, isFromCurrentUser } = message;

  return (
    <div
      className={`
        flex 
        ${isFromCurrentUser ? "justify-end" : "justify-start"}
        ${!isConsecutive ? "mt-3" : "mt-1"}
      `}
    >
      <div
        className={`
          max-w-[85%] xs:max-w-[80%] sm:max-w-[70%] md:max-w-[60%] lg:max-w-[50%] min-w-0
          ${isFromCurrentUser ? "order-2" : "order-1"}
        `}
      >
        {/* Message bubble */}
        <div
          className={`
            relative rounded-2xl px-4 py-2
            ${
              isFromCurrentUser
                ? "bg-primary text-primary-foreground rounded-br-sm"
                : "bg-muted text-muted-foreground rounded-bl-sm"
            }
            ${!isConsecutive ? "rounded-t-2xl" : "rounded-t-lg"}
          `}
          aria-label={`Message: ${content}`}
        >
          {/* Message content */}
          <p className="text-sm leading-relaxed wrap-break-word overflow-wrap-anywhere line-clamp-6">
            {content}
          </p>

          {/* Timestamp and read status (for sent messages) */}
          {showTimestamp && (
            <div
              className={`
                mt-1 flex items-center justify-end space-x-1
                ${isFromCurrentUser ? "flex-row-reverse space-x-reverse" : ""}
              `}
            >
              <span
                className={`
                text-xs
                ${
                  isFromCurrentUser
                    ? "text-primary-foreground/70"
                    : "text-muted-foreground/60"
                }
              `}
              >
                {formatMessageTime(timestamp)}
              </span>

              {/* Read receipt indicators for sent messages */}
              {isFromCurrentUser && (
                <ReadReceipt
                  message={message}
                  className="h-3 w-3 text-primary-foreground/50"
                />
              )}
            </div>
          )}
        </div>

        {/* Spacing for consecutive messages */}
        {isConsecutive && (
          <div
            className={`
            h-0.5
            ${isFromCurrentUser ? "mr-6" : "ml-6"}
          `}
          />
        )}
      </div>
    </div>
  );
};

/**
 * Read receipt component showing message status
 * - Single check: Sent to server
 * - Double check: Delivered to device
 * - Blue double check: Read by recipient
 */
interface ReadReceiptProps {
  message: MessageBubbleProps["message"];
  className?: string;
}

const ReadReceipt: React.FC<ReadReceiptProps> = ({ message, className }) => {
  // In a real app, this would be determined by message status from backend
  // For demo purposes, we'll simulate different read states
  const isRead = Math.random() > 0.5; // Random demo state
  const isDelivered = true; // Assume delivered if sent

  if (!isDelivered) {
    return <Check className={className} />;
  }

  if (isRead) {
    return <CheckCheck className={className} />;
  }

  return <Check className={className} />;
};

/**
 * Typing indicator component (for future use)
 */
export const TypingIndicator: React.FC<{ senderName: string }> = ({
  senderName,
}) => {
  return (
    <div className="flex justify-start mt-4">
      <div className="max-w-[70%] lg:max-w-[50%]">
        <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3">
          <div className="flex items-center space-x-1">
            <span className="text-xs text-muted-foreground/60 mr-2">
              {senderName} is typing
            </span>
            <div className="flex space-x-1">
              <div
                className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
