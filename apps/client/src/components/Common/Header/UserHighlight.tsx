"use client";

import Link from "next/link";
import { UserIcon } from "../Icons";
import authStore from "@/lib/store/authStore";
import { observer } from "mobx-react-lite";

export const UserHighlight = observer(() => {
    const user = authStore.user;
    const isAuthenticated = authStore.isAuthenticated;

    const link = isAuthenticated ? "/account" : "/signin";
    const title = user ? user?.username : "Sign In";

    return (
        <Link href={link} className="flex items-center gap-2.5">
            <UserIcon />

            <div>
                <span className="block text-2xs text-dark-4 uppercase">
                    account
                </span>
                <p className="font-medium text-custom-sm text-dark">{title}</p>
            </div>
        </Link>
    );
});
