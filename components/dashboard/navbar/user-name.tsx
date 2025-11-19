"use client"

import { UserProfile } from "@/lib/types";
import { useEffect } from "react";

const UserName = ({ user }: { user: UserProfile }) => {
    return (
        <p className="text-xs font-light">{user?.name || "user"}</p>
    );
}

export default UserName
