"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserProfile } from "@/lib/types";
import { ArrowLeft, Edit } from "lucide-react";
import { useState } from "react";

const EditProfile = ({ profile }: { profile: UserProfile }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <Card className="p-4 flex items-center justify-center h-full relative">
      {isEditing && (
        <Button
          variant="ghost"
          onClick={handleEditClick}
          className="absolute top-1 left-1 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
      )}
      {isEditing ? (
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
          {/* Here you can add your form for editing profile */}
          <p className="text-sm text-gray-500">
            Form to edit profile will go here.
          </p>
        </div>
      ) : (
        <Button onClick={handleEditClick} className="cursor-pointer">
          <Edit /> Edit Profile
        </Button>
      )}
    </Card>
  );
};

export default EditProfile;
