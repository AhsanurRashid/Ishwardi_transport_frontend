import { Suspense } from "react";
import VehicleDetails from "./vehicleDetails";
import { Loader2 } from "lucide-react";

const VehicleDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <Suspense
      fallback={
        <div className="flex justify-center w-full">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        </div>
      }
    >
      <VehicleDetails id={id} />
    </Suspense>
  );
};

export default VehicleDetailsPage;
