import { Building2, FileText, FileCheck, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
const FeatureCards = () => {
  const features = [{
    title: "Brand Analysis",
    description: "Deep insights into company profiles, market position, and competitive intelligence",
    icon: Building2,
    to: "/brand-analysis",
    gradient: "from-primary/20 to-primary/5",
    isFlow: true
  }, {
    title: "RFP Lifecycle",
    description: "AI-powered RFP analysis, estimation, and proposal generation",
    icon: FileText,
    to: "/rfp-lifecycle",
    gradient: "from-accent/20 to-accent/5",
    isFlow: true
  }, {
    title: "Legal Contracts",
    description: "Automated contract review, risk assessment, and compliance tracking",
    icon: FileCheck,
    to: "/contracts",
    gradient: "from-warning/20 to-warning/5",
    isFlow: true
  }, {
    title: "Deals Tracker",
    description: "Real-time deal pipeline management and revenue forecasting",
    icon: TrendingUp,
    to: "/deals",
    gradient: "from-success/20 to-success/5",
    isFlow: false
  }];
  const flowTooltips = ["Brand Analysis provides deep insights into companies", "Data from Brand Analysis automatically seeds RFP insights", "RFP data flows into contract review and risk assessment"];
  return <TooltipProvider>
      <div className="relative">
        {/* Flow Connection Lines - Desktop Only */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" style={{
        zIndex: 0
      }}>
          <defs>
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(0 0% 70%)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(0 0% 70%)" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          {/* Line from card 1 to 2 */}
          <Tooltip>
            <TooltipTrigger asChild>
              <line x1="50%" y1="25%" x2="50%" y2="42%" stroke="url(#flowGradient)" strokeWidth="1" strokeDasharray="4 4" className="animate-pulse-glow hover:stroke-foreground cursor-pointer transition-all pointer-events-auto" style={{
              strokeOpacity: 0.3
            }} />
            </TooltipTrigger>
            <TooltipContent>
              <p>{flowTooltips[1]}</p>
            </TooltipContent>
          </Tooltip>
          
          {/* Line from card 2 to 3 */}
          <Tooltip>
            <TooltipTrigger asChild>
              <line x1="50%" y1="58%" x2="50%" y2="75%" stroke="url(#flowGradient)" strokeWidth="1" strokeDasharray="4 4" className="animate-pulse-glow hover:stroke-foreground cursor-pointer transition-all pointer-events-auto" style={{
              strokeOpacity: 0.3
            }} />
            </TooltipTrigger>
            <TooltipContent>
              <p>{flowTooltips[2]}</p>
            </TooltipContent>
          </Tooltip>
          
          {/* Arrow markers */}
          <polygon points="0,0 10,5 0,10" fill="hsl(0 0% 70%)" opacity="0.4" transform="translate(calc(50% - 5), 42%) rotate(90)" />
          <polygon points="0,0 10,5 0,10" fill="hsl(0 0% 70%)" opacity="0.4" transform="translate(calc(50% - 5), 75%) rotate(90)" />
        </svg>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {features.map((feature, index) => <Link key={feature.title} to={feature.to}>
              <Card className="group relative overflow-hidden gradient-card border border-border hover:border-foreground/20 transition-all duration-300 hover:shadow-elegant hover:scale-[1.01]">
                <div className="relative p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="p-3 rounded-xl border border-border group-hover:border-foreground/30 transition-colors">
                      <feature.icon className="h-6 w-6 text-foreground" />
                    </div>
                    {feature.isFlow && <div className="px-2 py-1 rounded-full border border-border text-muted-foreground text-xs font-medium">
                        Core Flow
                      </div>}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-2 text-foreground transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-foreground text-sm font-medium">
                    <span className="group-hover:translate-x-1 transition-transform inline-block">Explore</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Card>
            </Link>)}
        </div>
      </div>
    </TooltipProvider>;
};
export default FeatureCards;