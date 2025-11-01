import * as icons from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

interface Section {
  heading: string;
  content: string;
}

interface Tab {
  title: string;
  icon: string;
  sections: Section[];
}

interface RFPSummaryAccordionProps {
  tabs: Tab[];
}

const RFPSummaryAccordion = ({ tabs }: RFPSummaryAccordionProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">RFP Summary</h2>
      
      <Accordion type="single" collapsible defaultValue="item-0" className="space-y-3">
        {tabs.map((tab, index) => {
          const IconComponent = icons[tab.icon as keyof typeof icons] as React.ComponentType<{ className?: string }>;
          
          return (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-none"
            >
              <Card className="gradient-card overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3 flex-1">
                    {IconComponent && (
                      <div className="p-2 rounded-lg bg-primary/10">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                    )}
                    <span className="font-bold text-left">{tab.title}</span>
                    <span className="ml-auto text-xs text-muted-foreground font-normal">
                      ({tab.sections.length})
                    </span>
                  </div>
                </AccordionTrigger>
                
                <AccordionContent className="px-6 pb-4">
                  <div className="space-y-4 pt-2">
                    {tab.sections.map((section, sectionIndex) => (
                      <div
                        key={sectionIndex}
                        className="p-4 rounded-lg bg-muted/30 border border-border"
                      >
                        <h4 className="font-semibold mb-2 text-primary">
                          {section.heading}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {section.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </Card>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default RFPSummaryAccordion;
