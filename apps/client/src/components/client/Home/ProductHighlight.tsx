import React from "react";
import {
    CategoryHighlight, CategoryHighlightProps
} from "@/components/Common/ProductUtils";
import { getBookProducts, getGameProducts, } from "@/actions/product.action";
import { FullBookProduct, FullGameProduct } from "@willo/db";
import ToastFeedback from "@/components/Common/ToastFeedback";


type Props = Pick<CategoryHighlightProps, "maxDisplay">

export async function BooksProductHighlight(props: Props) {
    let data: FullBookProduct[];

    try {

        data = await getBookProducts();
    } catch(err: any) {
        console.error(err);
        return <ToastFeedback message={"Error loading books!"} id="bookHighlightToast" type="error"/>
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
        console.error(err);
        return (
            <ToastFeedback
                message={"Error loading games"}
                id="gameHighlightToast"
                type="error"
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

