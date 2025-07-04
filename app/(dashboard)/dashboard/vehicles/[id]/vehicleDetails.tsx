import { getVehicleForEditAction } from '@/app/actions/getVehicleForEdit';
import { EditVehicleForm } from '@/components/forms/edit-vehicle-form'

const VehicleDetails = async({ id }: { id: string }) => {
    const vehicle = await getVehicleForEditAction(id);
  return (
    <div>
      <EditVehicleForm vehicle={vehicle.data} />
    </div>
  );
}

export default VehicleDetails