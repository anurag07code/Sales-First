import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Building2, Calendar, MapPin, TrendingUp, ExternalLink, RefreshCw, Clock, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import StockSparkline from "@/components/StockSparkline";
import { MOCK_COMPANY_DETAILS, MOCK_COMPANY_LIST } from "@/lib/mockData";

const CompanyDetail = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  useEffect(() => {
    // Simulate loading with pulse animation
    setTimeout(() => setIsLoading(false), 400);
  }, [id]);

  const company = MOCK_COMPANY_DETAILS[id as keyof typeof MOCK_COMPANY_DETAILS];
  const companyBasic = MOCK_COMPANY_LIST.find((c) => c.id === id);

  if (!company || !companyBasic) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Company Not Found</h2>
          <Link to="/brand-analysis">
            <Button>Back to Brand Analysis</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="skeleton h-10 w-48 animate-pulse" />
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="skeleton h-64 animate-pulse" />
              <div className="skeleton h-48 animate-pulse" />
            </div>
            <div className="space-y-6">
              <div className="skeleton h-96 animate-pulse" />
              <div className="skeleton h-48 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Back Button */}
        <Link to="/brand-analysis">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Companies
          </Button>
        </Link>

        {/* Company Header */}
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <img
            src={companyBasic.logoUrl}
            alt={`${company.name} logo`}
            className="w-24 h-24 rounded-xl bg-muted"
          />
          <div className="flex-1">
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">{company.name}</h1>
            <p className="text-lg text-primary font-medium mb-4">{company.industry}</p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Founded {company.founded}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {company.headquarters}
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar - Pill-shaped Button Group */}
        <div className="flex flex-wrap gap-3 p-4 bg-muted/30 rounded-xl border border-border">
          <Button variant="outline" className="gap-2 rounded-full">
            <Clock className="h-4 w-4" />
            View Expiring Deals
          </Button>
          <Button variant="outline" className="gap-2 rounded-full">
            <RefreshCw className="h-4 w-4" />
            Refresh Company Data
          </Button>
          <Button variant="outline" className="gap-2 rounded-full">
            <ExternalLink className="h-4 w-4" />
            Visit Website
          </Button>
        </div>

        {/* Two-Column Layout (Single column on mobile) */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Company Data */}
          <div className="space-y-6">
            {/* About - Expandable */}
            <Card className="gradient-card p-6">
              <h2 className="text-xl font-bold mb-4">About</h2>
              <div className="relative">
                <p 
                  className={`text-muted-foreground leading-relaxed transition-all duration-300 ${
                    isDescriptionExpanded ? "" : "line-clamp-3"
                  }`}
                >
                  {company.description}
                </p>
                {!isDescriptionExpanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-card to-transparent" />
                )}
              </div>
              <div className="flex justify-center mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="gap-2"
                >
                  <ChevronDown className={`h-4 w-4 transition-transform ${isDescriptionExpanded ? "rotate-180" : ""}`} />
                  {isDescriptionExpanded ? "Show Less" : "Expand"}
                </Button>
              </div>
            </Card>

            {/* Stock Performance */}
            <Card className="gradient-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">Stock Performance</h2>
              </div>
              <StockSparkline data={company.stockData} />
            </Card>
          </div>

          {/* Right Column - Context & News */}
          <div className="space-y-6">
            {/* Recent News */}
            <Card className="gradient-card p-6">
              <h2 className="text-xl font-bold mb-4">Recent News</h2>
              <div className="space-y-4">
                {company.news.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <h3 className="font-medium mb-2 leading-snug">{item.title}</h3>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{item.source}</span>
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Key Customers */}
            <Card className="gradient-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">Key Customers</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {company.keyCustomers.map((customer, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 rounded-lg bg-primary/10 text-sm font-medium text-center"
                  >
                    {customer}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
