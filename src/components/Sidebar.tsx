import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  FileText,
  FileCheck,
  TrendingUp,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: "/", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/brand-analysis", icon: Building2, label: "Brand Analysis" },
    { to: "/rfp-lifecycle", icon: FileText, label: "RFP Lifecycle" },
    { to: "/contracts", icon: FileCheck, label: "Legal Contracts" },
    { to: "/deals", icon: TrendingUp, label: "Deals Tracker" },
  ];

  const NavContent = ({ toggleButton }: { toggleButton?: React.ReactNode }) => (
    <>
      <div className="p-6 border-b border-sidebar-border relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">
              SalesFirst
            </h1>
            <p className="text-xs text-muted-foreground mt-1">AI-Powered Sales Intelligence</p>
          </div>
          {toggleButton && (
            <div className="lg:hidden flex-shrink-0">
              {toggleButton}
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-sidebar-accent text-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="bg-gradient-card rounded-lg p-4 border border-border">
          <p className="text-xs text-muted-foreground mb-2">AI Assistant Active</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-foreground rounded-full animate-pulse-glow" />
            <span className="text-sm font-medium text-foreground">Online</span>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Toggle - Shows outside sidebar when closed */}
      {!isOpen && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 lg:hidden transition-all duration-300 ease-in-out"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      )}

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen
          border-r border-sidebar-border
          flex flex-col w-64 z-40
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0 bg-background" : "-translate-x-full lg:translate-x-0 bg-background"}
        `}
      >
        <NavContent 
          toggleButton={isOpen ? (
            <Button
              variant="ghost"
              size="icon"
              className="transition-all duration-300 ease-in-out"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          ) : undefined} 
        />
      </aside>
    </>
  );
};

export default Sidebar;
