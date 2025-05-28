import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ViewProfileSkeleton = () => {
  return (
    <Card className="p-4 animate-pulse">
      <div className="flex flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-muted shadow-md" />
        <div className="flex flex-col gap-2 flex-1">
          <div className="h-4 w-40 bg-muted rounded" />
          <div className="h-4 w-32 bg-muted rounded" />
          <div className="h-4 w-48 bg-muted rounded" />
          <div className="h-6 w-28 bg-muted rounded mt-2" />
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex flex-wrap gap-2">
        <div className="h-5 w-16 bg-muted rounded" />
        <div className="h-5 w-20 bg-muted rounded" />
        <div className="h-5 w-14 bg-muted rounded" />
      </div>
    </Card>
  );
};

export default ViewProfileSkeleton;
