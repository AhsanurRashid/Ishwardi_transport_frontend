import { getUserDataAction } from "@/app/actions/getUserdataAction";
import NoPermission from "@/components/common/no-permission";
import { VehicleRegistrationForm } from "@/components/forms/vehicle-registration-form";

const AddVehicle = async () => {
  const profile = await getUserDataAction();
  if (!profile?.profile?.permissions?.includes("vehicle_create")) {
    return <NoPermission />;
  }
  return <VehicleRegistrationForm />;
};

export default AddVehicle;
