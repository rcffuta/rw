
import TableListTab from "@/components/ui/TableListTab";
import { PropsWithChildren } from "react";


export default function ProductPageRoot({ children }: PropsWithChildren) {
    return (
        <>
            <TableListTab
                pageName="Gift Cards"
                createLink="/products/gift-cards/add"
                createLinkLabel="Add Gift Card Product"
            />
            {children}
        </>
    );
}