import { getCompanyListForRentAction } from "@/app/actions/getCompanyListForRent";
import { getDriverListForRentAction } from "@/app/actions/getDriverListForRent";
import { getVehicleListForRentAction } from "@/app/actions/getVehcileListForRent";
import DataFetchingFailed from "@/components/common/date-fetching-failed";
import AddRentFormWrapper from "@/components/dashboard/rents/add-rent-form-wrapper";

const RentPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string; limit?: string }>;
}) => {
  const params = await searchParams;
  const query = params?.query || "";
  const page = parseInt(params?.page || "1", 10);
  const limit = parseInt(params?.limit || "5", 10);

  const [companies, vehicles, drivers] = await Promise.all([
    getCompanyListForRentAction(),
    getVehicleListForRentAction(),
    getDriverListForRentAction(),
  ]);

  if (!companies || !vehicles || !drivers) return <DataFetchingFailed error="Something went wrong!" />;

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
