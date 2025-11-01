import { useState } from "react";
import { Bot, X, Send, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const AIAssistantPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm your AI assistant. I can help you analyze this RFP, estimate costs, identify risks, and answer any questions about the project scope.",
    },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;

    setMessages([...messages, { role: "user", content: message }]);
    setMessage("");

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Based on the RFP analysis, I can provide detailed insights. What specific aspect would you like to explore?",
        },
      ]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button with Pulse Animation */}
      <Button
        size="icon"
        className={`fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-elegant glow-primary z-50 transition-all ${
          !isOpen ? "animate-pulse" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </Button>

      {/* Slide-in Panel */}
      {isOpen && (
        <>
          {/* Overlay for mobile */}
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="fixed right-[88px] top-6 bottom-6 w-full sm:w-80 rounded-2xl border border-sidebar-border z-50 flex flex-col animate-slide-in shadow-2xl" style={{ backgroundColor: 'hsl(var(--card))' }}>
            {/* Header */}
            <div className="p-4 border-b border-sidebar-border rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold">AI Assistant</h3>
                  <p className="text-xs text-muted-foreground">Always here to help</p>
                </div>
              </div>
            </div>

            {/* Upload New RFP Button */}
            <div className="px-4 pt-4 pb-4">
              <Button variant="outline" className="w-full gap-2 bg-card/50 hover:bg-card/80">
                <Upload className="h-4 w-4" />
                Upload New RFP
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <Card
                    className={`max-w-[80%] p-3 ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "gradient-card"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </Card>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-sidebar-border rounded-b-2xl">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask me anything..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  className="bg-card"
                />
                <Button onClick={handleSend} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AIAssistantPanel;
