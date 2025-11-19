import { getUserDataAction } from "@/app/actions/getUserdataAction";
import DataFetchingFailed from "@/components/common/date-fetching-failed";
import ViewProfile from "@/components/dashboard/profile/view-profile";
import ViewProfileSkeleton from "@/components/skeletons/view-profile-skeleton.tsx";
import { UserProfile } from "@/lib/types";
import { Suspense } from "react";

const ProfilePage = async () => {
  const profile = await getUserDataAction();

  if (profile.error) return <DataFetchingFailed error={profile.error} />;
  return (
    <div>
      <Suspense fallback={<ViewProfileSkeleton />}>
        <ViewProfile profile={profile?.profile as UserProfile} />
      </Suspense>
    </div>
  );
};

export default ProfilePage;
