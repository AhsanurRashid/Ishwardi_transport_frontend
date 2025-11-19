import { getUserDataAction } from "@/app/actions/getUserdataAction";
import { getVehicleForEditAction } from "@/app/actions/getVehicleForEdit";
import NoPermission from "@/components/common/no-permission";
import { EditVehicleForm } from "@/components/forms/edit-vehicle-form";

const VehicleDetails = async ({ id }: { id: string }) => {
  const [profile, vehicle] = await Promise.all([
    getUserDataAction(),
    getVehicleForEditAction(id),
  ]);
  if (!profile?.profile?.permissions?.includes("vehicle_edit")) {
    return <NoPermission />;
  }
  return (
    <div>
      <EditVehicleForm vehicle={vehicle.data} />
    </div>
  );
};

export default VehicleDetails;
