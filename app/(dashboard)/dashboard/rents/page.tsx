import { getCompanyListForRentAction } from "@/app/actions/getCompanyListForRent";
import { getDriverListForRentAction } from "@/app/actions/getDriverListForRent";
import { getUserDataAction } from "@/app/actions/getUserdataAction";
import { getVehicleListForRentAction } from "@/app/actions/getVehicleListForRent";
import DataFetchingFailed from "@/components/common/date-fetching-failed";
import NoPermission from "@/components/common/no-permission";
import AddRentFormWrapper from "@/components/dashboard/rents/add-rent-form-wrapper";

const RentPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string; limit?: string }>;
}) => {
  const [params, companies, vehicles, drivers, profile] = await Promise.all([
    searchParams,
    getCompanyListForRentAction(),
    getVehicleListForRentAction(),
    getDriverListForRentAction(),
    getUserDataAction(),
  ]);

  const query = params?.query || "";
  const page = parseInt(params?.page || "1", 10);
  const limit = parseInt(params?.limit || "5", 10);

  if (!profile?.profile?.permissions?.includes("rent_list")) {
    return <NoPermission />;
  }

  if (!companies || !vehicles || !drivers)
    return <DataFetchingFailed error="Something went wrong!" />;

  return (
    <div className="w-full">
      <AddRentFormWrapper
        companies={companies?.list}
        vehicles={vehicles?.list}
        drivers={drivers?.list}
      />
    </div>
  );
};

export default RentPage;
