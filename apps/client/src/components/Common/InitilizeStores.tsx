"use client";

import authStore from "@/lib/store/authStore";
import cartStore from "@/lib/store/cartStore";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

function InitializeStores() {

    useEffect(()=>{
        (()=>{
            cartStore.reloadCart();
        })()
    }, [])
    return null;
}

export default observer(InitializeStores);
