import React from "react";
import shopData from "@/data/shop";
import { SHOP } from "@/constants";
import CategoryHighlight from "@/components/Common/CategoryHighlight";

export function BooksProductHighlight() {
    return (
        <CategoryHighlight
            ctaLink={"#"}
            ctaText="View More"
            data={shopData}
            subTitle="Books available for you"
            title="Books"
        />
    );
};

export function GameProductHighlight() {
    return (
        <CategoryHighlight
            ctaLink={"#"}
            ctaText="View More"
            data={shopData}
            subTitle="Games available for you"
            title="Games"
            vertical
        />
    );
};

