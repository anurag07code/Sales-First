import { Building2, MapPin, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

interface CompanyCardProps {
  id: string;
  name: string;
  region: string;
  country: string;
  rank: number;
  logoUrl: string;
}

const CompanyCard = ({ id, name, region, country, rank, logoUrl }: CompanyCardProps) => {
  return (
    <Link to={`/company/${id}`}>
      <Card className="group relative overflow-hidden gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-elegant hover:glow-primary">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <img
              src={logoUrl}
              alt={`${name} logo`}
              className="w-16 h-16 rounded-lg object-cover bg-muted"
            />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-lg font-bold group-hover:text-primary transition-colors truncate">
                  {name}
                </h3>
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium whitespace-nowrap">
                  <Trophy className="h-3 w-3" />
                  #{rank}
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{country}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Building2 className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{region}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CompanyCard;
