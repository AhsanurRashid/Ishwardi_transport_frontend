import { getPermissionsAction } from "@/app/actions/getPermissionsAction";
import { getUserDataAction } from "@/app/actions/getUserdataAction";
import GenerateButton from "@/components/common/generate-button";
import NoPermission from "@/components/common/no-permission";
import RoleTableWrapper from "@/components/dashboard/roles/role-table-wrapper";
import AddRoleForm from "@/components/forms/add-role-form";
import { IPermissionList } from "@/lib/types";
import React from "react";

const RolesPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string; limit?: string }>;
}) => {
  const [profile, params, permissions] = await Promise.all([
    getUserDataAction(),
    searchParams,
    getPermissionsAction(),
  ]);
  const query = params?.query || "";
  const page = parseInt(params?.page || "1", 10);
  const limit = parseInt(params?.limit || "5", 10);

  if (
    profile?.profile?.role !== "Admin" &&
    !profile?.profile?.permissions?.includes("role_list")
  ) {
    return <NoPermission />;
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 border-b pb-4">
        <h1 className="text-2xl font-bold">Role Management</h1>
        {profile?.profile?.permissions?.includes("role_create") && (
          <GenerateButton title="Create Role">
            <AddRoleForm permissions={permissions?.list as IPermissionList} />
          </GenerateButton>
        )}
      </div>
      <RoleTableWrapper query={query} page={page} limit={limit} />
    </div>
  );
};

export default RolesPage;
