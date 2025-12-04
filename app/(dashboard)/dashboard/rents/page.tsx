import { getCompanyListForRentAction } from "@/app/actions/getCompanyListForRent";
import { getDriverListForRentAction } from "@/app/actions/getDriverListForRent";
import { getUserDataAction } from "@/app/actions/getUserdataAction";
import { getVehicleListForRentAction } from "@/app/actions/getVehicleListForRent";
import GenerateButton from "@/components/common/generate-button";
import NoPermission from "@/components/common/no-permission";
import RentTableWrapper from "@/components/dashboard/rents/rent-table-wrapper";
import AddRentForm from "@/components/forms/add-rent-form";
import { ICompanyForRent, IDriversForRent, IVehicleForRent } from "@/lib/types";

const RentsPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    limit?: string;
    from?: string;
    to?: string;
  }>;
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
  const from = params?.from || "";
  const to = params?.to || "";

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
              companies={companiesForRent?.list as ICompanyForRent[]}
              vehicles={vehiclesForRent?.list as IVehicleForRent[]}
              drivers={driversForRent?.list as IDriversForRent[]}
            />
          </GenerateButton>
        )}
      </div>
      <RentTableWrapper
        query={query}
        page={page}
        limit={limit}
        from={from}
        to={to}
      />
    </div>
  );
};

export default RentsPage;
