import { getPermissionsAction } from "@/app/actions/getPermissionsAction";
import { getUserDataAction } from "@/app/actions/getUserdataAction";
import DataFetchingFailed from "@/components/common/date-fetching-failed";
import EditProfile from "@/components/dashboard/profile/edit-profile";
import ViewProfile from "@/components/dashboard/profile/view-profile";
import EditProfileSkeleton from "@/components/skeletons/edit-profile-skeleton";
import ViewProfileSkeleton from "@/components/skeletons/view-profile-skeleton.tsx";
import { PermissionMap, UserProfile } from "@/lib/types";
import { Suspense } from "react";

const ProfilePage = async () => {
  const profile = await getUserDataAction();
  const permissions = await getPermissionsAction();

  if (profile.error) return <DataFetchingFailed error={profile.error} />;
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Suspense fallback={<ViewProfileSkeleton />}>
          <ViewProfile profile={profile?.profile as UserProfile} />
        </Suspense>
      </div>

      {profile?.profile?.permissions?.includes("user_edit") && (
        <div className="w-full">
          <Suspense fallback={<EditProfileSkeleton />}>
            <EditProfile
              permissions={permissions?.list as PermissionMap}
              profile={profile?.profile as UserProfile}
            />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
