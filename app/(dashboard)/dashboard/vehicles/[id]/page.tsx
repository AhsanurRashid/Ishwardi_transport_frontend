import { Suspense } from "react";
import VehicleDetails from "./vehicleDetails";
import { Loader2 } from "lucide-react";
import { getUserDataAction } from "@/app/actions/getUserdataAction";
import NoPermission from "@/components/common/no-permission";

const VehicleDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const [{ id }, profile] = await Promise.all([params, getUserDataAction()]);

  if (!profile?.profile?.permissions?.includes("vehicle_edit")) {
    return <NoPermission />;
  }

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
