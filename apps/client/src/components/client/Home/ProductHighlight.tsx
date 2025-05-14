import React from "react";
import {
    CategoryHighlight, CategoryHighlightProps
} from "@/components/Common/ProductUtils";
import { getBookProducts, getGameProducts, } from "@/actions/category.action";
import { FullBookProduct, FullGameProduct } from "db/actions";
import ToastFeedback from "@/components/Common/ToastFeedback";


type Props = Pick<CategoryHighlightProps, "maxDisplay">

export async function BooksProductHighlight(props: Props) {
    let data: FullBookProduct[];

    try {

        data = await getBookProducts();
    } catch(err: any) {
        return <ToastFeedback message={err.message || "Error!"} id="bookHighlightToast"/>
    }

    if (data.length < 1) return null;

    return (
        <CategoryHighlight
            {...props}
            ctaLink={"#"}
            ctaText="View More"
            data={data.map((e) => e.product)}
            subTitle="Books available for you"
            title="Books"
        />
    );
};

export async function GameProductHighlight(props: Props) {
    let data: FullGameProduct[];

    try {
        data = await getGameProducts();
    } catch (err: any) {
        return (
            <ToastFeedback
                message={err.message || "Error!"}
                id="gameHighlightToast"
            />
        );
    }

    if (data.length < 1) return null;
    return (
        <CategoryHighlight
            {...props}
            ctaLink={"#"}
            ctaText="View More"
            data={data.map((e) => e.product)}
            subTitle="Games available for you"
            title="Games"
        />
    );
};

