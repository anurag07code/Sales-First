import { useState } from "react";
import * as icons from "lucide-react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface JourneyBlock {
  name: string;
  status: "completed" | "in-progress" | "pending";
  icon: string;
}

interface RFPFlowTimelineProps {
  blocks: JourneyBlock[];
}

const RFPFlowTimeline = ({ blocks }: RFPFlowTimelineProps) => {
  const [selectedBlock, setSelectedBlock] = useState<JourneyBlock | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success text-white";
      case "in-progress":
        return "bg-primary text-white glow-primary";
      case "pending":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted";
    }
  };

  const getConnectorColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success";
      case "in-progress":
        return "bg-primary";
      default:
        return "bg-border";
    }
  };

  const handleBlockClick = (block: JourneyBlock) => {
    setSelectedBlock(block);
    setIsDialogOpen(true);
  };

  const getBlockDetails = (block: JourneyBlock) => {
    if (block.status === "completed") {
      return {
        title: `${block.name} - Completed`,
        description: "This stage has been successfully completed.",
        content: "Status: Approved. Score: 92/100. All requirements met and validated."
      };
    } else if (block.status === "pending") {
      return {
        title: `${block.name} - Next Steps`,
        description: "This stage is blocked. Here's what needs to be done:",
        content: "This step requires the previous stages to be completed first. Please ensure all dependencies are met before proceeding."
      };
    } else {
      return {
        title: `${block.name} - In Progress`,
        description: "This stage is currently being processed.",
        content: "AI is actively analyzing this component. Estimated completion: 5 minutes."
      };
    }
  };

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-4">RFP Journey Flow</h2>
        
        {blocks.map((block, index) => {
          const IconComponent = icons[block.icon as keyof typeof icons] as React.ComponentType<{ className?: string }>;
          const isLast = index === blocks.length - 1;

          return (
            <div key={index} className="relative">
              <div 
                className="flex items-center gap-4 cursor-pointer group"
                onClick={() => handleBlockClick(block)}
              >
                <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full ${getStatusColor(block.status)} transition-all duration-300 group-hover:scale-110`}>
                  {IconComponent && <IconComponent className="h-5 w-5" />}
                </div>
                
                <div className="flex-1">
                  <Card className={`p-3 gradient-card border-l-4 transition-all group-hover:shadow-elegant ${
                    block.status === "completed"
                      ? "border-l-success"
                      : block.status === "in-progress"
                      ? "border-l-primary"
                      : "border-l-border"
                  }`}>
                    <p className="font-medium">{block.name}</p>
                    <p className="text-xs text-muted-foreground capitalize mt-1">{block.status.replace("-", " ")}</p>
                  </Card>
                </div>
              </div>

              {!isLast && (
                <div
                  className={`absolute left-6 top-12 w-0.5 h-8 -translate-x-1/2 ${getConnectorColor(block.status)}`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Block Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          {selectedBlock && (
            <>
              <DialogHeader>
                <DialogTitle>{getBlockDetails(selectedBlock).title}</DialogTitle>
                <DialogDescription>{getBlockDetails(selectedBlock).description}</DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <p className="text-sm leading-relaxed">{getBlockDetails(selectedBlock).content}</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RFPFlowTimeline;
