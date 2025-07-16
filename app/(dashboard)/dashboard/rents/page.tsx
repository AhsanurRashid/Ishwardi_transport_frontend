import GenerateButton from "@/components/common/generate-button";
import AddRentForm from "@/components/forms/add-rent-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

const RentPage = async ({
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
        <h1 className="text-2xl font-bold">Rent Management</h1>
        {/* <Link href="/dashboard/rents/add-rent">
          <Button className="cursor-pointer">
            <Plus />
            Create Rent
          </Button>
        </Link> */}
        <GenerateButton title="Create Rent" size="md">
          <AddRentForm />
        </GenerateButton>
      </div>
    </div>
  );
};

export default RentPage;
