import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { PropsWithChildren } from "react";


export default function OrderPageRoot({ children }: PropsWithChildren) {
    return (
        <>
            <Breadcrumb pageName="Orders" />
            {children}
        </>
    );
}