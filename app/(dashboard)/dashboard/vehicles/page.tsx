import CreateVehicleBtn from "@/components/dashboard/vehicle/create-vehicle-btn";
import VehicleTableWrapper from "@/components/dashboard/vehicle/vehicle-table-wrapper";

const VehiclesPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string; limit?: string }>;
}) => {
  const params = await searchParams;
  const query = params?.query || "";
  const page = parseInt(params?.page || "1", 10);
  const limit = parseInt(params?.limit || "5", 10);
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Vehicle Management</h1>
        <CreateVehicleBtn />
      </div>
      <VehicleTableWrapper query={query} page={page} limit={limit} />
    </div>
  );
};

export default VehiclesPage;
