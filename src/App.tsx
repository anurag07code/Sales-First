import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import Sidebar from "./components/Sidebar";
import TopNavigation from "./components/TopNavigation";
import AnimatedDataMesh from "./components/AnimatedDataMesh";
import Index from "./pages/Index";
import BrandAnalysis from "./pages/BrandAnalysis";
import CompanyDetail from "./pages/CompanyDetail";
import RFPLifecycle from "./pages/RFPLifecycle";
import Contracts from "./pages/Contracts";
import Deals from "./pages/Deals";
import NotFound from "./pages/NotFound";
import { ThemeToggle } from "./components/ThemeToggle";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className={isHomePage ? "min-h-screen" : "flex min-h-screen w-full relative"}>
      {/* Show TopNavigation on homepage, Sidebar on other pages */}
      {isHomePage ? (
        <>
          <TopNavigation />
          <main className="relative">
            {/* Background Animation - Same as RFP Lifecycle page */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              <AnimatedDataMesh />
            </div>
            
            {/* Page Content */}
            <div className="relative z-10">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/brand-analysis" element={<BrandAnalysis />} />
                <Route path="/company/:id" element={<CompanyDetail />} />
                <Route path="/rfp-lifecycle" element={<RFPLifecycle />} />
                <Route path="/contracts" element={<Contracts />} />
                <Route path="/deals" element={<Deals />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </main>
        </>
      ) : (
        <>
          <Sidebar />
          <main className="flex-1 overflow-x-hidden relative">
            {/* Background Animation - Appears on all pages */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              <AnimatedDataMesh />
            </div>
            
            {/* Theme Toggle Button - Top Right */}
            <div className="fixed top-4 right-4 z-50">
              <ThemeToggle />
            </div>
            
            {/* Page Content */}
            <div className="relative z-10">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/brand-analysis" element={<BrandAnalysis />} />
                <Route path="/company/:id" element={<CompanyDetail />} />
                <Route path="/rfp-lifecycle" element={<RFPLifecycle />} />
                <Route path="/contracts" element={<Contracts />} />
                <Route path="/deals" element={<Deals />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </main>
        </>
      )}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
