import GenerateButton from "@/components/common/generate-button";
import CompanyTableWrapper from "@/components/dashboard/company/company-table-wrapper";
import AddCompanyForm from "@/components/forms/add-company-form";

const Companies = async ({
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
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Company List</h1>
        <GenerateButton title="Create Company">
          <AddCompanyForm />
        </GenerateButton>
      </div>
      <CompanyTableWrapper query={query} page={page} limit={limit} />
    </div>
  );
};

export default Companies;
