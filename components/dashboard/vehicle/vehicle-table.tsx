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
                profile={profile as UserProfile}
              />
            </div>
            <div className="flex items-center gap-2 w-full">
              <div className="tracking-wide w-1/2">
                <div className="flex items-center gap-2">
                  <h1 className="text-sm min-w-[120px]">Registration No</h1>
                  <span>:</span>
                  <p className="text-sm font-semibold">
                    {vehicle.registration_number}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm min-w-[120px]">Chassis No</h1>
                  <span>:</span>
                  <p className="text-sm font-semibold">
                    {vehicle.chassis_number}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm min-w-[120px]">Engine No</h1>
                  <span>:</span>
                  <p className="text-sm font-semibold">
                    {vehicle.engine_number}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm min-w-[120px]">Type</h1>
                  <span>:</span>
                  <p className="text-sm font-semibold">
                    {vehicle.vehicle_type}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm min-w-[120px]">Brand</h1>
                  <span>:</span>
                  <p className="text-sm font-semibold">{vehicle.brand}</p>
                </div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm min-w-[120px]">Model</h1>
                  <span>:</span>
                  <p className="text-sm font-semibold">{vehicle.model}</p>
                </div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm min-w-[120px]">Color</h1>
                  <span>:</span>
                  <p className="text-sm font-semibold">{vehicle.color}</p>
                </div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm min-w-[120px]">Owner Name</h1>
                  <span>:</span>
                  <p className="text-sm font-semibold">{vehicle.owner_name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm min-w-[120px]">Owner Phone</h1>
                  <span>:</span>
                  <p className="text-sm font-semibold">{vehicle.owner_phone}</p>
                </div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm min-w-[120px]">Owner Address</h1>
                  <span>:</span>
                  <p className="text-sm font-semibold">{vehicle.owner_nid}</p>
                </div>
              </div>
              <div className="tracking-wide w-1/2">
                <div className="flex items-center gap-2">
                  <h1 className="text-sm min-w-[250px]">Owner Nid No</h1>
                  <span>:</span>
                  <p className="text-sm font-semibold">{vehicle.owner_nid}</p>
                </div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm min-w-[250px]">Manufacture Year</h1>
                  <span>:</span>
                  <p className="text-sm font-semibold">
                    {vehicle.manufacture_year}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm min-w-[250px]">
                    Fitness Certificate No
                  </h1>
                  <span>:</span>
                  <p className="text-sm font-semibold">
                    {vehicle.fitness_certificate_number}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm min-w-[250px]">
                    Fitness Certificate Expiry Date
                  </h1>
                  <span>:</span>
                  <p className="text-sm font-semibold">
                    {vehicle.fitness_certificate_expiry_date}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm min-w-[250px]">Tax Token No</h1>
                  <span>:</span>
                  <p className="text-sm font-semibold">
                    {vehicle.tax_token_number}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm min-w-[250px]">
                    Tax Token Expiry Date
                  </h1>
                  <span>:</span>
                  <p className="text-sm font-semibold">
                    {vehicle.tax_token_expiry_date}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm min-w-[250px]">Insurance Policy No</h1>
                  <span>:</span>
                  <p className="text-sm font-semibold">
                    {vehicle?.insurance_policy_number || "N/A"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm min-w-[250px]">
                    Insurance Policy Expiry Date
                  </h1>
                  <span>:</span>
                  <p className="text-sm font-semibold">
                    {vehicle?.insurance_policy_expiry_date || "N/A"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm min-w-[250px]">Status</h1>
                  <span>:</span>
                  <div>
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
                <div className="flex items-center gap-2">
                  <h1 className="text-sm min-w-[250px]">Remarks</h1>
                  <span>:</span>
                  <p className="text-sm font-semibold">
                    {vehicle?.remarks || "N/A"}
                  </p>
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
