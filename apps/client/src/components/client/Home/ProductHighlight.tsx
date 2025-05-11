import React from "react";
import CategoryHighlight from "@/components/Common/CategoryHighlight";
import { getBookProducts, getGameProducts, } from "@/actions/category.action";

export async function BooksProductHighlight() {
    const data = await getBookProducts();

    if (data.length < 1) return null;

    return (
        <CategoryHighlight
            ctaLink={"#"}
            ctaText="View More"
            data={data.slice(1,10)}
            subTitle="Books available for you"
            title="Books"
        />
    );
};

export async function GameProductHighlight() {
    const data = await getGameProducts();
    if (data.length < 1) return null;
    return (
        <CategoryHighlight
            ctaLink={"#"}
            ctaText="View More"
            data={data.slice(1, 10)}
            subTitle="Games available for you"
            title="Games"
        />
    );
};

