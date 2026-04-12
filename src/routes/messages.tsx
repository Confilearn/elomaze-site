import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { demoMessages } from "@/lib/data";
import { useState } from "react";

export const Route = createFileRoute("/messages")({
  head: () => ({
    meta: [
      { title: "Messages — Elomaze" },
      { name: "description", content: "Your messages on Elomaze. Chat with agents about properties." },
    ],
  }),
  component: MessagesPage,
});

function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(demoMessages[0].id);
  const activeChat = demoMessages.find((m) => m.id === selectedChat)!;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 pb-24 lg:pb-12">
      <div className="flex items-center gap-3 mb-8">
        <MessageCircle className="w-6 h-6 text-primary" />
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Messages</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 h-[calc(100vh-280px)] min-h-[500px]">
        {/* Chat List */}
        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="divide-y divide-border">
            {demoMessages.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`w-full text-left p-4 transition-colors ${
                  selectedChat === chat.id ? "bg-primary/5" : "hover:bg-secondary"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-primary">{chat.agentName[0]}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{chat.agentName}</p>
                    <p className="text-xs text-muted-foreground truncate">{chat.propertyTitle}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="rounded-2xl border border-border flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-border bg-secondary/30">
            <p className="text-sm font-semibold text-foreground">{activeChat.agentName}</p>
            <p className="text-xs text-muted-foreground">{activeChat.propertyTitle}</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeChat.messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                  msg.sender === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-secondary text-foreground rounded-bl-md"
                }`}>
                  <p>{msg.text}</p>
                  <p className={`text-[10px] mt-1 ${msg.sender === "user" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 h-11 px-4 rounded-full bg-secondary border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button variant="premium" size="icon" className="rounded-full w-11 h-11 shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
