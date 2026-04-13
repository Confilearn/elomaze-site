import { createFileRoute } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/messages")({
  component: AdminMessagesPage,
});

const demoChats = [
  {
    id: "ac1", name: "Chidi Okafor", role: "Agent", lastMessage: "The listing has been updated with new photos", time: "2 min ago",
    messages: [
      { sender: "agent" as const, text: "Hello admin, I've uploaded new photos for the Lekki listing", time: "10:30 AM" },
      { sender: "admin" as const, text: "Great, I'll review and approve shortly", time: "10:32 AM" },
      { sender: "agent" as const, text: "The listing has been updated with new photos", time: "10:35 AM" },
    ],
  },
  {
    id: "ac2", name: "Blessing Okoh", role: "User", lastMessage: "Thank you for resolving the report", time: "1 hr ago",
    messages: [
      { sender: "user" as const, text: "I reported a fake listing yesterday", time: "9:00 AM" },
      { sender: "admin" as const, text: "We've reviewed and removed the listing. Thank you for reporting.", time: "9:15 AM" },
      { sender: "user" as const, text: "Thank you for resolving the report", time: "9:20 AM" },
    ],
  },
  {
    id: "ac3", name: "Yemi Alade", role: "Agent", lastMessage: "When will my verification be processed?", time: "3 hrs ago",
    messages: [
      { sender: "agent" as const, text: "I submitted my documents 3 days ago", time: "7:00 AM" },
      { sender: "agent" as const, text: "When will my verification be processed?", time: "7:01 AM" },
    ],
  },
];

function AdminMessagesPage() {
  const [selectedChat, setSelectedChat] = useState(demoChats[0]);
  const [newMessage, setNewMessage] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Messages</h2>
        <p className="text-sm text-muted-foreground">Communicate with users and agents</p>
      </div>

      <div className="bg-card rounded-2xl border border-border/50 overflow-hidden premium-shadow h-[600px] flex">
        {/* Chat list */}
        <div className="w-full sm:w-80 border-r border-border/50 flex flex-col">
          <div className="p-3 border-b border-border/50">
            <input placeholder="Search messages..." className="w-full h-9 px-3 rounded-lg bg-secondary border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none" />
          </div>
          <div className="flex-1 overflow-y-auto">
            {demoChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`w-full text-left px-4 py-3 border-b border-border/30 transition-colors ${selectedChat.id === chat.id ? "bg-primary/5" : "hover:bg-secondary/50"}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-primary">{chat.name.split(" ").map(n => n[0]).join("")}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground truncate">{chat.name}</p>
                      <span className="text-[10px] text-muted-foreground shrink-0">{chat.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className="hidden sm:flex flex-1 flex-col">
          <div className="px-4 py-3 border-b border-border/50 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">{selectedChat.name.split(" ").map(n => n[0]).join("")}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{selectedChat.name}</p>
              <p className="text-[10px] text-muted-foreground">{selectedChat.role}</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {selectedChat.messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${msg.sender === "admin" ? "bg-primary text-primary-foreground rounded-br-md" : "bg-secondary text-foreground rounded-bl-md"}`}>
                  <p>{msg.text}</p>
                  <p className={`text-[10px] mt-1 ${msg.sender === "admin" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-border/50">
            <div className="flex gap-2">
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 h-10 px-4 rounded-full bg-secondary border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors">
                <Send className="w-4 h-4 text-primary-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
