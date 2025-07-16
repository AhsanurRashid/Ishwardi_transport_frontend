import AddUserForm from "@/components/forms/add-user-form";
import UserTableWrapper from "@/components/dashboard/users/user-table-wrapper";
import GenerateButton from "@/components/common/generate-button";

const User = async ({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string; limit?: string }>;
}) => {
  const params = await searchParams;
  const query = params?.query || "";
  const page = parseInt(params?.page || "1", 10);
  const limit = parseInt(params?.limit || "5", 10);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 border-b pb-4">
        <h1 className="text-2xl font-bold">User Management</h1>
        <GenerateButton title="Create User">
          <AddUserForm />
        </GenerateButton>
      </div>
      <UserTableWrapper query={query} page={page} limit={limit} />
    </div>
  );
};

export default User;
