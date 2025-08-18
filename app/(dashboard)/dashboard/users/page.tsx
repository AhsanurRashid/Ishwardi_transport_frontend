import AddUserForm from "@/components/forms/add-user-form";
import UserTableWrapper from "@/components/dashboard/users/user-table-wrapper";
import GenerateButton from "@/components/common/generate-button";
import { getUserDataAction } from "@/app/actions/getUserdataAction";
import NoPermission from "@/components/common/no-permission";
import { getTotalRolesAction } from "@/app/actions/getTotalTolesAction";
import { IRole } from "@/lib/types";

const User = async ({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string; limit?: string }>;
}) => {
  const params = await searchParams;
  const query = params?.query || "";
  const page = parseInt(params?.page || "1", 10);
  const limit = parseInt(params?.limit || "5", 10);

  const totalRoles = await getTotalRolesAction();
  const profile = await getUserDataAction();
  if (
    profile?.profile?.role !== "Admin" &&
    !profile?.profile?.permissions?.includes("user_list")
  ) {
    return <NoPermission />;
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 border-b pb-4">
        <h1 className="text-2xl font-bold">User Management</h1>
        {profile?.profile?.permissions?.includes("user_create") && (
          <GenerateButton title="Create User">
            <AddUserForm roles={totalRoles?.list as IRole[]} />
          </GenerateButton>
        )}
      </div>
      <UserTableWrapper query={query} page={page} limit={limit} />
    </div>
  );
};

export default User;
