import React from "react";
import { Badge } from "../ui/badge";
import { Status } from "@/lib/types";

const GetStatusBadge = ({status}: {status: Status}) => {
    const variants = {
      "1": "default",
      "0": "secondary",
    } as const;

    const colors = {
      "1": "bg-green-100 text-green-800 hover:bg-green-100",
      "0": "bg-red-100 text-red-800 hover:bg-red-100",
    };

    if (!status || !(status in variants) || !(status in colors)) {
      return (
        <Badge
          variant="outline"
          className="bg-gray-100 text-red-500 hover:bg-gray-100"
        >
          Unknown
        </Badge>
      );
    }

    return (
      <Badge
        variant={variants[status as keyof typeof variants]}
        className={colors[status as keyof typeof colors]}
      >
        {status === "1" ? "Active" : "Inactive"}
      </Badge>
    );
};

export default GetStatusBadge;
