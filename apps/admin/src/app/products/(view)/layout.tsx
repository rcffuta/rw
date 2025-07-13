import Breadcrumb from "@/components/ui/BreadCrumb";
import TableListTab from "@/components/ui/TableListTab";
import { PropsWithChildren } from "react";


export default function ProductPageRoot({ children }: PropsWithChildren) {
    return (
        <>
            <TableListTab
                pageName="Games Products"
                createLink="/products/games/add"
                createLinkLabel="Add Game Product"
            />

            {children}
        </>
    );
}