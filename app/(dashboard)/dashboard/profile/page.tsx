import { getUserDataAction } from "@/app/actions/getUserdataAction";
import EditProfile from "@/components/dashboard/profile/edit-profile";
import ViewProfile from "@/components/dashboard/profile/view-profile";
import EditProfileSkeleton from "@/components/skeletons/edit-profile-skeleton";
import ViewProfileSkeleton from "@/components/skeletons/view-profile-skeleton.tsx";
import { UserProfile } from "@/lib/types";
import { Suspense } from "react";

const ProfilePage = async() => {
    const profile = await getUserDataAction();

    if (!profile?.profile) {
      return <div className="text-red-500 text-center">Unable to load profile data!</div>;
    }

    return (
      <div className="grid grid-cols-2 gap-4">
        <Suspense fallback={<ViewProfileSkeleton />}>
          <ViewProfile profile={profile?.profile as UserProfile} />
        </Suspense>
        {profile?.profile?.permissions?.includes("user_edit") && (
          <Suspense fallback={<EditProfileSkeleton />}>
            <EditProfile profile={profile?.profile as UserProfile} />
          </Suspense>
        )}
      </div>
    );
};

export default ProfilePage;
