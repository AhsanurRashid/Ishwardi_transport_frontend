import DataFetchingFailed from "@/components/common/date-fetching-failed";
import Pagination from "@/components/common/pagination";
import UserTable from "../users/user-table";
import { getRoleListAction } from "@/app/actions/getRoleListAction";
import { IPermissionList, IRole } from "@/lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatPermissionKey } from "@/lib/utils";
import RoleActions from "./role-action";
import { getPermissionsAction } from "@/app/actions/getPermissionsAction";

const RoleTable = async ({
  query,
  page,
  limit,
}: {
  query: string;
  page: number;
  limit: number;
}) => {
  const roleData = await getRoleListAction({
    query,
    page,
    limit,
  });
  const permissionsData = await getPermissionsAction();

  if (roleData?.error) return <DataFetchingFailed error={roleData?.error} />;

  return (
    <div className="space-y-4">
      <Pagination
        page={page}
        limit={limit}
        route="roles"
        total={roleData?.total_record}
      />
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roleData?.list?.map((role: IRole) => (
          <Card key={`role-${role.id}`} className="p-3">
            <CardHeader className="px-0 text-xl font-extrabold capitalize relative">
              {role.name}
              <div className="absolute top-2 right-2">
                <RoleActions
                  roleId={role.id}
                  permissions={permissionsData?.list as IPermissionList}
                />
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="px-0">
              {role.permissions.length > 0 ? (
                <div className="grid grid-cols-2 gap-1">
                  {role.permissions.map((permission) => (
                    <Badge className="w-full" key={permission}>
                      {formatPermissionKey(permission)}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p>No permissions assigned</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RoleTable;
