/**
 * MessageInput Component - Message composition interface
 *
 * This component provides:
 * - Text input for typing messages
 * - Attachment buttons (files, images, emojis)
 * - Send button with keyboard shortcuts
 * - Character limit and validation
 *
 * Features:
 * - Auto-resize textarea as user types
 * - Enter to send, Shift+Enter for new line
 * - File attachment support (UI only for now)
 * - Emoji picker integration (ready for implementation)
 * - Accessibility support with proper labels
 */

import React, { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Image, Smile } from "lucide-react";
import { MessageInputProps } from "@/types/messages";

/**
 * MessageInput Component
 *
 * @param onSendMessage - Callback when message is sent
 * @param disabled - Whether input is disabled
 * @param placeholder - Input placeholder text
 * @param maxLength - Maximum character limit (default: 1000)
 */
export const MessageInput: React.FC<
  MessageInputProps & { maxLength?: number }
> = ({
  onSendMessage,
  disabled = false,
  placeholder = "Type a message...",
  maxLength = 1000,
}) => {
  const [message, setMessage] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = "auto";
      // Set height to scrollHeight, but cap at reasonable max
      const newHeight = Math.min(textarea.scrollHeight, 120); // Max 120px height
      textarea.style.height = `${newHeight}px`;
    }
  }, [message]);

  // Focus textarea when component mounts
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  // Handle sending message
  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage && !disabled && trimmedMessage.length <= maxLength) {
      onSendMessage(trimmedMessage);
      setMessage("");

      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSend();
    }
  };

  // Handle file attachment (UI only - backend integration needed)
  const handleFileAttachment = () => {
    // In a real implementation, this would open file picker
    console.log("File attachment clicked");
  };

  // Handle image attachment (UI only - backend integration needed)
  const handleImageAttachment = () => {
    // In a real implementation, this would open image picker
    console.log("Image attachment clicked");
  };

  // Handle emoji picker (UI only - backend integration needed)
  const handleEmojiPicker = () => {
    // In a real implementation, this would open emoji picker
    console.log("Emoji picker clicked");
  };

  const isSendDisabled =
    !message.trim() || disabled || message.trim().length > maxLength;
  const characterCount = message.length;
  const isNearLimit = characterCount > maxLength * 0.9;

  return (
    <div className="space-y-2">
      {/* Main input area */}
      <div className="flex items-end space-x-2">
        {/* Attachment buttons */}
        <div className="flex space-x-1">
          <button
            onClick={handleFileAttachment}
            disabled={disabled}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Attach file"
            title="Attach file"
          >
            <Paperclip className="h-4 w-4 text-muted-foreground" />
          </button>

          <button
            onClick={handleImageAttachment}
            disabled={disabled}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Attach image"
            title="Attach image"
          >
            <Image className="h-4 w-4 text-muted-foreground" />
          </button>

          <button
            onClick={handleEmojiPicker}
            disabled={disabled}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Add emoji"
            title="Add emoji"
          >
            <Smile className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* Text input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            disabled={disabled}
            placeholder={placeholder}
            rows={1}
            className={`
              w-full resize-none rounded-2xl bg-muted px-4 py-2 pr-12 text-sm text-foreground 
              placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary 
              disabled:opacity-50 disabled:cursor-not-allowed max-h-30 min-h-9
              transition-all duration-200
            `}
            aria-label="Message input"
            aria-describedby={isNearLimit ? "char-count" : undefined}
          />

          {/* Character count (shown when near limit) */}
          {isNearLimit && (
            <div
              id="char-count"
              className={`
                absolute -top-5 right-0 text-xs
                ${characterCount > maxLength ? "text-destructive" : "text-muted-foreground"}
              `}
              aria-live="polite"
            >
              {characterCount}/{maxLength}
            </div>
          )}
        </div>

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={isSendDisabled}
          className={`
            flex h-8 w-8 items-center justify-center rounded-full transition-colors
            ${
              isSendDisabled
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }
          `}
          aria-label="Send message"
          title={
            message.trim() ? "Send message (Enter)" : "Type a message to send"
          }
        >
          <Send className="h-4 w-4" />
        </button>
      </div>

      {/* Helper text - Desktop only */}
      <div className="hidden md:flex items-center justify-between text-xs text-muted-foreground px-2">
        <span>
          Press{" "}
          <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Enter</kbd> to
          send,
          <kbd className="px-1 py-0.5 bg-muted rounded text-xs ml-1">
            Shift+Enter
          </kbd>{" "}
          for new line
        </span>

        {characterCount > 0 && (
          <span
            className={characterCount > maxLength ? "text-destructive" : ""}
          >
            {characterCount}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
};

export default MessageInput;
