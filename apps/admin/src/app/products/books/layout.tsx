import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { PropsWithChildren } from "react";


export default function ProductPageRoot({ children }: PropsWithChildren) {
    return (
        <>
            <Breadcrumb pageName="Book Products" />
            {children}
        </>
    )
}