import { getCompanyListForRentAction } from "@/app/actions/getCompanyListForRent";
import { getDriverListForRentAction } from "@/app/actions/getDriverListForRent";
import { getUserDataAction } from "@/app/actions/getUserdataAction";
import { getVehicleListForRentAction } from "@/app/actions/getVehicleListForRent";
import GenerateButton from "@/components/common/generate-button";
import NoPermission from "@/components/common/no-permission";
import RentTableWrapper from "@/components/dashboard/rents/rent-table-wrapper";
import AddRentForm from "@/components/forms/add-rent-form";

const RentsPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string; limit?: string }>;
}) => {
  const [profile, params, companiesForRent, driversForRent, vehiclesForRent] =
    await Promise.all([
      getUserDataAction(),
      searchParams,
      getCompanyListForRentAction(),
      getDriverListForRentAction(),
      getVehicleListForRentAction(),
    ]);

  const query = params?.query || "";
  const page = parseInt(params?.page || "1", 10);
  const limit = parseInt(params?.limit || "5", 10);

  if (!profile?.profile?.permissions?.includes("rent_list")) {
    return <NoPermission />;
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Rent Management</h1>
        {profile?.profile?.permissions?.includes("rent_create") && (
          <GenerateButton title="Create Rent">
            <AddRentForm
              companies={companiesForRent}
              vehicles={vehiclesForRent}
              drivers={driversForRent}
            />
          </GenerateButton>
        )}
      </div>
      <RentTableWrapper query={query} page={page} limit={limit} />
    </div>
  );
};

export default RentsPage;
