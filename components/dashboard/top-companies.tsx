import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Building2Icon } from "lucide-react";

interface TopCompaniesProps {
  companies: {
    id: number;
    name: string;
    totalRevenue: number;
    totalRents: number;
  }[];
}

export function TopCompanies({ companies }: TopCompaniesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2Icon className="h-5 w-5" />
          Top Companies
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {companies.map((company, index) => (
            <div key={company.id} className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {index + 1}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {company.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {company.totalRents} rents
                </p>
              </div>
              <div className="text-sm font-semibold text-primary">
                ৳{company.totalRevenue.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
