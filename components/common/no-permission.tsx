import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import NoPermissionImage from "@/assets/images/no-permission.png";
import Image from "next/image";

const NoPermission = () => {
  return (
    <Card>
      <CardHeader className="text-center">
        <Image
          src={NoPermissionImage}
          width={150}
          height={150}
          alt="No Permission"
          className="mx-auto"
        />
      </CardHeader>
      <CardContent className="text-center text-2xl font-bold text-red-600">
        You do not have permission to view this page!
      </CardContent>
    </Card>
  );
};

export default NoPermission;
