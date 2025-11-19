import React from "react";
import { Card } from "../ui/card";

const VehicleTableSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((row) => (
        <Card
          key={`vehicle_skeleton_${row}`}
          className="flex gap-2 items-center px-3 py-2"
        >
          <div className="border-b border-border w-full pb-2 flex items-center justify-between">
            <div className="w-12 h-12 bg-muted animate-pulse"></div>
            <div className="w-12 h-4 bg-muted animate-pulse"></div>
          </div>
          <div className="flex items-center gap-6 w-full">
            <div className="tracking-wide w-1/2">
              <div className="w-full h-12 bg-muted animate-pulse"></div>
            </div>
            <div className="tracking-wide w-1/2">
              <div className="w-full h-12 bg-muted animate-pulse"></div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default VehicleTableSkeleton;
