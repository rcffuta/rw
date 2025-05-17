"use client";

import { getCategoryList } from "../actions/product.action";
import { useEffect, useState } from "react";

export type Option = {
    label: string;
    value?: string;
};

const defaultOption = {
    label: "All Categories",
    value: undefined,
}

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
