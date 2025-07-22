"use client";

import PreLoader from "@/components/Common/PreLoader";
import authStore from "@/lib/store/authStore";
import { cartStore } from "@/lib/store/cart-utils";
import productStore from "@/lib/store/productStore";
import { PropsWithChildren, useEffect, useState } from "react";



export default function LayoutLoader(props: PropsWithChildren) {
    const [loading, setLoading] = useState<boolean>(true);

    const loadTime = 1000;

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        (async () => {
            // timeoutId = setTimeout(() => setLoading(false), loadTime);

            await productStore.initilizeStores();
            await cartStore.initilizeStores();
            await authStore.authenticate();
            setLoading(false);
        })();

        return () => {
            clearTimeout(timeoutId);
        };
    }, [loadTime]);

    // TODO: Remove this component

    if (loading) return <PreLoader/>

    return props.children;
}