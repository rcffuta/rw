import { getInvoiceTableData } from "@/actions/analytics.action";
import { InvoiceTable } from "@/components/Tables/OrderTable";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tables",
};

export default async function OrderPage() {
    const data = await getInvoiceTableData();

    return <InvoiceTable orders={data} />;
};
