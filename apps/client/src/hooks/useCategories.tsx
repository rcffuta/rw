"use client";

import { defaultOption } from "@/lib/store/productStore";
import { getCategoryList } from "../actions/product.action";
import { useEffect, useState } from "react";

export type Option = {
    label: string;
    value?: string;
};



export function useCategoryOption() {
    const [options, setOptions] = useState<Option[]>([defaultOption]);

    useEffect(() => {
        async function loadOptions() {
            try {
                const opts: Option[] = (await getCategoryList()).map(
                    (category) => ({
                        label: category.name,
                        value: category.id.toString(),
                    })
                );

                setOptions(() => [defaultOption, ...opts]);
            } catch (error: any) {
                console.error(error);
            }
        }

        loadOptions();
    }, []);

    return options;
}
