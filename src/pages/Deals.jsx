import { TrendingUp } from "lucide-react";
const Deals = () => {
  return <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-2xl">
        <div className="inline-flex p-6 rounded-full bg-success/10">
          <TrendingUp className="h-16 w-16 text-success" />
        </div>
        <h1 className="text-4xl font-bold">Deals Tracker</h1>
        <p className="text-xl text-muted-foreground">
          Real-time deal pipeline management and revenue forecasting features coming soon.
        </p>
        <div className="pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm">
            <div className="w-2 h-2 bg-warning rounded-full animate-pulse-glow" />
            Under Development
          </div>
        </div>
      </div>
    </div>;
};
export default Deals;