import { getCompanyForEditAction } from "@/app/actions/getCompanyForEditAction";
import { getCompanyListForRentAction } from "@/app/actions/getCompanyListForRent";
import { getDriverListForRentAction } from "@/app/actions/getDriverListForRent";
import { getUserDataAction } from "@/app/actions/getUserdataAction";
import { getVehicleListForRentAction } from "@/app/actions/getVehicleListForRent";
import GenerateButton from "@/components/common/generate-button";
import NoPermission from "@/components/common/no-permission";
import AddRentForm from "@/components/forms/add-rent-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  User,
  Calendar,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import CompanyRentTableWrapper from "./company-rent-table-wrapper";
import { ICompanyForRent, IDriversForRent, IVehicleForRent } from "@/lib/types";

const CompanyDetails = async ({
  companyId,
  query,
  page,
  limit,
}: {
  companyId: number;
  query: string;
  page: number;
  limit: number;
}) => {
  const company = await getCompanyForEditAction({ companyId });

  if (company?.error || !company) {
    return (
      <div className="w-full">
        <div className="mb-4">
          <Link href="/dashboard/companies">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Companies
            </Button>
          </Link>
        </div>
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground">Company not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const [profile, companiesForRent, driversForRent, vehiclesForRent] =
    await Promise.all([
      getUserDataAction(),
      getCompanyListForRentAction(),
      getDriverListForRentAction(),
      getVehicleListForRentAction(),
    ]);

  if (!profile?.profile?.permissions?.includes("rent_list")) {
    return <NoPermission />;
  }

  return (
    <div className="w-full space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Company Details</h1>
        <Link href="/dashboard/companies">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Companies
          </Button>
        </Link>
      </div>

      {/* Company Information Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            {company.data.company_name}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-5 flex-wrap">
          {/* Invoice Number */}
          {company.data.company_invoice_number && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-muted-foreground">
                Invoice Number:
              </span>
              <span>{company.data.company_invoice_number}</span>
            </div>
          )}

          {/* Email */}
          {company.data.company_email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-muted-foreground">Email:</span>
              <span>{company.data.company_email}</span>
            </div>
          )}

          {/* Phone */}
          {company.data.company_phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-muted-foreground">Phone:</span>
              <span>{company.data.company_phone}</span>
            </div>
          )}

          {/* Address */}
          {company.data.company_address && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-muted-foreground">
                Address:
              </span>
              <span>{company.data.company_address}</span>
            </div>
          )}

          {/* Status */}
          <div className="flex items-center gap-2">
            <span className="font-medium text-muted-foreground">Status:</span>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                company.data.status === "1"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              }`}
            >
              {company.data.status === "1" ? "Active" : "Inactive"}
            </span>
          </div>

          {/* Created At */}
          {company.createdAt && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-muted-foreground">
                Created At:
              </span>
              <span>
                {new Date(company.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/*company wise rent*/}
      <div className="w-full">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Rent Management</h1>
          {profile?.profile?.permissions?.includes("rent_create") && (
            <GenerateButton title="Create Rent">
              <AddRentForm
                companies={companiesForRent?.list}
                vehicles={vehiclesForRent?.list}
                drivers={driversForRent?.list}
              />
            </GenerateButton>
          )}
        </div>
        <CompanyRentTableWrapper
          companyId={companyId}
          query={query}
          page={page}
          limit={limit}
        />
      </div>
    </div>
  );
};

export default CompanyDetails;
