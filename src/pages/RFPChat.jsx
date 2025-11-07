import { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, ArrowLeft, Plus } from "lucide-react";
import { MOCK_RFP_PROJECTS } from "@/lib/mockData";

const RFPChat = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const project = useMemo(() => MOCK_RFP_PROJECTS.find(p => p.id === id), [id]);

  // Topic state
  const [topics, setTopics] = useState([
    { key: "transition", name: "Transition" },
    { key: "governance", name: "Governance" },
    { key: "continuity", name: "Business Continuity" },
  ]);
  const defaultTopic = searchParams.get("topic") || "transition";
  const [activeTopic, setActiveTopic] = useState(defaultTopic);
  useEffect(() => {
    // keep query param in sync
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set("topic", activeTopic);
      return next;
    });
  }, [activeTopic, setSearchParams]);

  // Per-topic chat threads
  const [threads, setThreads] = useState({
    transition: [{ role: "assistant", content: "Let's craft the Transition section for your proposal. What angle should we emphasize?" }],
    governance: [{ role: "assistant", content: "Ready to outline Governance. Any specific committees or KPIs to include?" }],
    continuity: [{ role: "assistant", content: "Let's detail Business Continuity. Do you have RTO/RPO targets?" }],
  });
  const [draft, setDraft] = useState("");

  const handleSend = () => {
    const content = draft.trim();
    if (!content) return;
    setThreads(prev => {
      const current = prev[activeTopic] || [];
      return { ...prev, [activeTopic]: [...current, { role: "user", content }] };
    });
    setDraft("");
    // Simulate assistant reply
    setTimeout(() => {
      setThreads(prev => {
        const current = prev[activeTopic] || [];
        return { ...prev, [activeTopic]: [...current, { role: "assistant", content: `Acknowledged. I'll refine the ${activeTopic.replace(/-/g, ' ')} section accordingly.` }] };
      });
    }, 600);
  };

  const [newTopicName, setNewTopicName] = useState("");
  const addTopic = () => {
    const name = newTopicName.trim();
    if (!name) return;
    const key = name.toLowerCase().replace(/\s+/g, "-");
    if (topics.some(t => t.key === key)) {
      setActiveTopic(key);
      setNewTopicName("");
      return;
    }
    setTopics(prev => [...prev, { key, name }]);
    setThreads(prev => ({ ...prev, [key]: [{ role: "assistant", content: `Created topic “${name}”. Share details to begin drafting.` }] }));
    setActiveTopic(key);
    setNewTopicName("");
  };

  if (!project) {
    return (
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <Card className="p-12 text-center">
            <p className="text-muted-foreground mb-4">Project not found</p>
            <Button onClick={() => navigate("/rfp-lifecycle")}>Back to RFP Lifecycle</Button>
          </Card>
        </div>
      </div>
    );
  }

  const currentMessages = threads[activeTopic] || [];

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(`/rfp-lifecycle/${project.id}`)} className="hover:bg-accent/50">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">AI Chat — {project.rfpTitle}</h1>
              <p className="text-sm text-muted-foreground mt-1">{project.uploadedFileName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Select value={activeTopic} onValueChange={setActiveTopic}>
              <SelectTrigger className="w-56">
                <SelectValue placeholder="Select topic" />
              </SelectTrigger>
              <SelectContent>
                {topics.map(t => (
                  <SelectItem key={t.key} value={t.key}>{t.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Topic Tabs + Create Topic */}
        <div className="flex items-center justify-between">
          <Tabs value={activeTopic} onValueChange={setActiveTopic} className="w-full">
            <TabsList className="flex flex-wrap">
              {topics.map(t => (
                <TabsTrigger key={t.key} value={t.key}>{t.name}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="flex items-center gap-2 ml-4">
            <Input placeholder="New topic name" value={newTopicName} onChange={e => setNewTopicName(e.target.value)} className="w-56" />
            <Button onClick={addTopic}><Plus className="h-4 w-4 mr-1" /> Create Topic</Button>
          </div>
        </div>

        {/* Chat Window */}
        <Card className="p-0 overflow-hidden h-[65vh] flex flex-col border-2 border-primary/20">
          <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ backgroundColor: 'hsl(var(--background))' }}>
            {currentMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted/50 text-foreground'}`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-border" style={{ backgroundColor: 'hsl(var(--card))' }}>
            <div className="flex gap-2">
              <Input placeholder={`Type a message for ${topics.find(t => t.key === activeTopic)?.name || 'Topic'}...`} value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} className="bg-background" />
              <Button onClick={handleSend} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RFPChat;
