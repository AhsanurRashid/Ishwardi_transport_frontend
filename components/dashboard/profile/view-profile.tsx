import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import PlaceHolderImage from "@/assets/images/placeholder-image.svg";
import { Separator } from "@/components/ui/separator";
import { UserProfile } from "@/lib/types";

const ViewProfile = async ({ profile }: { profile: UserProfile }) => {
  return (
    <Card className="p-4">
      <div className="flex flex-row items-center gap-6">
        <Avatar className="w-24 h-24 rounded-full shadow-md">
          <AvatarImage
            src={profile?.thumbnail || PlaceHolderImage}
            alt="profile picture"
          />
          <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-semibold">
            {(profile.name || "U N")
              .trim()
              .split(" ")
              .map((word) => word.charAt(0))
              .join("")
              .toUpperCase()
              .slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-row gap-6">
          <div className="leading-6 tracking-wider space-y-1">
            <h1 className="text-sm font-light">
              <strong className="font-semibold">Name: </strong>
              {profile?.name}
            </h1>
            <h3 className="text-sm font-light">
              <strong className="font-semibold">Phone: </strong>
              {profile?.phone}
            </h3>
            <h4 className="text-sm font-light">
              <strong className="font-semibold">NID: </strong>
              {profile?.nid}
            </h4>
            <p className="text-sm font-light">
              <strong className="font-semibold">Address: </strong>
              {profile?.address}
            </p>
            <div className="text-sm font-light bg-success flex items-center gap-2">
              <strong className="font-semibold">Role: </strong>
              <div className="flex items-center gap-2">
                <div className="text-xs text-white bg-green-400 px-2 py-1 rounded shadow">
                  {profile?.role}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {profile?.permissions && profile?.permissions?.length > 0 && (
        <>
          <Separator />
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-sm font-semibold">Permissions:</h2>
            {profile?.permissions.map((permission: string, index: number) => (
              <span
                key={`${permission}-permission-${index}`}
                className="text-xs text-white bg-blue-500 px-2 py-1 rounded shadow"
              >
                {permission}
              </span>
            ))}
          </div>
        </>
      )}
    </Card>
  );
};

export default ViewProfile;
