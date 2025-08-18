import DriverTableWrapper from "@/components/dashboard/drivers/driver-table-wrapper";
import AddDriverForm from "@/components/forms/add-driver-form";
import GenerateButton from "@/components/common/generate-button";
import { getUserDataAction } from "@/app/actions/getUserdataAction";
import NoPermission from "@/components/common/no-permission";

const Drivers = async ({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string; limit?: string }>;
}) => {
  const [profile, params] = await Promise.all([
    getUserDataAction(),
    searchParams,
  ]);

  const query = params?.query || "";
  const page = parseInt(params?.page || "1", 10);
  const limit = parseInt(params?.limit || "5", 10);

  if (!profile?.profile?.permissions?.includes("driver_list")) {
    return <NoPermission />;
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Drivers List</h1>
        {profile?.profile?.permissions?.includes("driver_create") && (
          <GenerateButton title="Create Driver">
            <AddDriverForm />
          </GenerateButton>
        )}
      </div>
      <DriverTableWrapper query={query} page={page} limit={limit} />
    </div>
  );
};

export default Drivers;
