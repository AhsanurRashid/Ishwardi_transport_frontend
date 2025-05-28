import { Card } from "@/components/ui/card";

const EditProfileSkeleton = () => {
  return (
    <Card className="p-4 flex items-center justify-center h-full animate-pulse">
      <div className="h-10 w-32 bg-muted rounded-md" />
    </Card>
  );
};

export default EditProfileSkeleton;
