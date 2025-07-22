"use client";

import authStore from "@/lib/store/authStore";
import { cartStore } from '@/lib/store/cart-utils'
import productStore from "@/lib/store/productStore";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

function InitializeStores() {

    useEffect(() => {
        (()=>{
            // if (authStore.user) {
            //     // cartStore.reloadCart();
            // }
            authStore.authenticate();
            productStore.loadAllProducts();
        })()
    }, [authStore.user]);
    return null;
}

export default observer(InitializeStores);
