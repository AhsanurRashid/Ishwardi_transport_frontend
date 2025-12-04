import { getUserDataAction } from "@/app/actions/getUserdataAction";
import GenerateButton from "@/components/common/generate-button";
import NoPermission from "@/components/common/no-permission";
import CompanyTableWrapper from "@/components/dashboard/company/company-table-wrapper";
import AddCompanyForm from "@/components/forms/add-company-form";
import CompanyDetails from "@/components/dashboard/company/company-details";

const Companies = async ({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    limit?: string;
    company?: string;
    from?: string;
    to?: string;
  }>;
}) => {
  const [profile, params] = await Promise.all([
    getUserDataAction(),
    searchParams,
  ]);

  const query = params?.query || "";
  const page = parseInt(params?.page || "1", 10);
  const limit = parseInt(params?.limit || "5", 10);
  const companyId = params?.company ? parseInt(params.company, 10) : null;
  const from = params?.from || "";
  const to = params?.to || "";

  if (!profile?.profile?.permissions?.includes("company_list")) {
    return <NoPermission />;
  }

  // If a specific company is selected, show company details
  if (companyId) {
    return (
      <CompanyDetails
        companyId={companyId}
        query={query}
        page={page}
        limit={limit}
        from={from}
        to={to}
      />
    );
  }

  // Otherwise show the company list
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Company List</h1>
        {profile?.profile?.permissions?.includes("company_create") && (
          <GenerateButton title="Create Company">
            <AddCompanyForm />
          </GenerateButton>
        )}
      </div>
      <CompanyTableWrapper query={query} page={page} limit={limit} />
    </div>
  );
};

export default Companies;
