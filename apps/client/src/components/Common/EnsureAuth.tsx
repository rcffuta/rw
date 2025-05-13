"use client";

import { isEmpty, useNavigate } from "@gamezone/lib";
import { PropsWithChildren, useEffect } from "react";
import PreLoader from "./PreLoader";
import authStore from "@/lib/store/authStore";
import { observer } from "mobx-react-lite";

function EnsureAuth(props: PropsWithChildren) {
    const user = authStore.user;

    const { redirect } = useNavigate();

    useEffect(() => {
        (() => {
            if (isEmpty(user)) {
                redirect("/signin");
                return;
            }
        })();
    }, [user, redirect]);


    if (!user) return <PreLoader/>;
    return props.children;
}

export default observer(EnsureAuth);
