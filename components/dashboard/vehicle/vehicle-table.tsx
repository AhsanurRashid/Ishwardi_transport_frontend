import { Card } from "@/components/ui/card";
import { IVehicle, UserProfile } from "@/lib/types";
import Image from "next/image";
import PlaceHolderImage from "@/assets/images/placeholder-image.svg";
import { getVehicleListAction } from "@/app/actions/getVehicleListAction";
import VehicleAction from "./vehicle-action";
import DataFetchingFailed from "@/components/common/date-fetching-failed";
import Pagination from "@/components/common/pagination";
import { getUserDataAction } from "@/app/actions/getUserdataAction";

const VehicleTable = async ({
  query,
  page,
  limit,
}: {
  query: string;
  page: number;
  limit: number;
}) => {
  const [profile, vehicleData] = await Promise.all([
    getUserDataAction(),
    getVehicleListAction({
      query,
      page,
      limit,
    }),
  ]);

  if (vehicleData?.error)
    return <DataFetchingFailed error={vehicleData?.error} />;
  return (
    <>
      <Pagination
        page={page}
        limit={limit}
        total={vehicleData?.total_record}
        route="vehicles"
      />
      <div className="space-y-2">
        {vehicleData?.list?.map((vehicle: IVehicle) => (
          <Card key={vehicle.id} className="flex gap-2 items-center px-3 py-2">
            <div className="border-b border-border w-full pb-2 flex items-center justify-between">
              <Image
                className="object-contain"
                width={100}
                height={100}
                src={vehicle.image ? vehicle.image : PlaceHolderImage}
                alt={vehicle.chassis_number}
              />
              <VehicleAction
                vehicleId={vehicle.id as number}
                profile={profile?.profile as UserProfile}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6 gap-2 w-full text-xs">
              <div className="tracking-wide space-y-2">
                <div className="grid grid-cols-[minmax(120px,150px)_auto] items-center gap-2">
                  <h1>Registration No:</h1>
                  <p className="font-semibold">{vehicle.registration_number}</p>
                </div>

                <div className="grid grid-cols-[minmax(120px,150px)_auto] items-center gap-2">
                  <h1>Chassis No:</h1>
                  <p className="font-semibold">{vehicle.chassis_number}</p>
                </div>

                <div className="grid grid-cols-[minmax(120px,150px)_auto] items-center gap-2">
                  <h1>Engine No:</h1>
                  <p className="font-semibold">{vehicle.engine_number}</p>
                </div>

                <div className="grid grid-cols-[minmax(120px,150px)_auto] items-center gap-2">
                  <h1>Type</h1>
                  <p className="font-semibold">{vehicle.vehicle_type}</p>
                </div>

                <div className="grid grid-cols-[minmax(120px,150px)_auto] items-center gap-2">
                  <h1>Brand:</h1>
                  <p className="font-semibold">{vehicle.brand}</p>
                </div>

                <div className="grid grid-cols-[minmax(120px,150px)_auto] items-center gap-2">
                  <h1>Model:</h1>
                  <p className="font-semibold">{vehicle.model}</p>
                </div>

                <div className="grid grid-cols-[minmax(120px,150px)_auto] items-center gap-2">
                  <h1>Color:</h1>
                  <p className="font-semibold">{vehicle.color}</p>
                </div>

                <div className="grid grid-cols-[minmax(120px,150px)_auto] items-center gap-2">
                  <h1>Owner Name:</h1>
                  <p className="font-semibold">{vehicle.owner_name}</p>
                </div>

                <div className="grid grid-cols-[minmax(120px,150px)_auto] items-center gap-2">
                  <h1>Owner Phone:</h1>
                  <p className="font-semibold">{vehicle.owner_phone}</p>
                </div>

                <div className="grid grid-cols-[minmax(120px,150px)_auto] items-center gap-2">
                  <h1>Owner Address:</h1>
                  <p className="font-semibold">{vehicle.owner_address}</p>
                </div>
              </div>

              {/* Right Side */}
              <div className="tracking-wide space-y-2">
                <div className="grid lg:grid-cols-[minmax(150px,200px)_auto] grid-cols-[minmax(120px,150px)_auto] items-center gap-2">
                  <h1>Owner Nid No:</h1>
                  <p className="font-semibold">{vehicle.owner_nid}</p>
                </div>

                <div className="grid lg:grid-cols-[minmax(150px,200px)_auto] grid-cols-[minmax(120px,150px)_auto] items-center gap-2">
                  <h1>Manufacture Year:</h1>
                  <p className="font-semibold">{vehicle.manufacture_year}</p>
                </div>

                <div className="grid lg:grid-cols-[minmax(150px,200px)_auto] grid-cols-[minmax(120px,150px)_auto] items-center gap-2">
                  <h1>Fitness Certificate No:</h1>
                  <p className="font-semibold">
                    {vehicle.fitness_certificate_number}
                  </p>
                </div>

                <div className="grid lg:grid-cols-[minmax(150px,200px)_auto] grid-cols-[minmax(120px,150px)_auto] items-center gap-2">
                  <h1>Fitness Expiry Date:</h1>
                  <p className="font-semibold">
                    {vehicle.fitness_certificate_expiry_date}
                  </p>
                </div>

                <div className="grid lg:grid-cols-[minmax(150px,200px)_auto] grid-cols-[minmax(120px,150px)_auto] items-center gap-2">
                  <h1>Tax Token No:</h1>
                  <p className="font-semibold">{vehicle.tax_token_number}</p>
                </div>

                <div className="grid lg:grid-cols-[minmax(150px,200px)_auto] grid-cols-[minmax(120px,150px)_auto] items-center gap-2">
                  <h1>Tax Token Expiry:</h1>
                  <p className="font-semibold">
                    {vehicle.tax_token_expiry_date}
                  </p>
                </div>

                <div className="grid lg:grid-cols-[minmax(150px,200px)_auto] grid-cols-[minmax(120px,150px)_auto] items-center gap-2">
                  <h1>Insurance No:</h1>
                  <p className="font-semibold">
                    {vehicle?.insurance_policy_number || "N/A"}
                  </p>
                </div>

                <div className="grid lg:grid-cols-[minmax(150px,200px)_auto] grid-cols-[minmax(120px,150px)_auto] items-center gap-2">
                  <h1>Insurance Expiry:</h1>
                  <p className="font-semibold">
                    {vehicle?.insurance_policy_expiry_date || "N/A"}
                  </p>
                </div>

                <div className="grid lg:grid-cols-[minmax(150px,200px)_auto] grid-cols-[minmax(120px,150px)_auto] items-center gap-2">
                  <h1 className="text-sm">Status:</h1>
                  <div className="flex items-center gap-2">
                    {vehicle.status === "0" && (
                      <p className="text-xs font-semibold bg-red-500 text-white px-2 py-1">
                        Inactive
                      </p>
                    )}
                    {vehicle.status === "1" && (
                      <p className="text-xs font-semibold bg-green-500 text-white px-2 py-1">
                        Active
                      </p>
                    )}
                    {vehicle.status === "2" && (
                      <p className="text-xs font-semibold bg-yellow-500 text-white px-2 py-1">
                        Under Maintenance
                      </p>
                    )}
                    {vehicle.status === "3" && (
                      <p className="text-xs font-semibold bg-blue-500 text-white px-2 py-1">
                        Retired
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid lg:grid-cols-[minmax(150px,200px)_auto] grid-cols-[minmax(120px,150px)_auto] items-center gap-2">
                  <h1>Remarks:</h1>
                  <p className="font-semibold">{vehicle?.remarks || "N/A"}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default VehicleTable;
