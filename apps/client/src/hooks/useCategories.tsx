"use client";

import { getCategoryList } from "@/actions/category.action";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export type Option = {
    label: string;
    value: string;
};

export function useCategoryOption() {
    const [options, setOptions] = useState<Option[]>([
        {
            label: "All Categories",
            value: "0",
        },
    ]);

    useEffect(() => {
        async function loadOptions() {
            try {
                const opts: Option[] = (await getCategoryList()).map(
                    (category) => ({
                        label: category.name,
                        value: category.id.toString(),
                    })
                );

                setOptions(() => opts);
            } catch (error) {
                toast.error(error.message || "Could not load categories");
            }
        }

        loadOptions();
    }, []);

    return options;
}
