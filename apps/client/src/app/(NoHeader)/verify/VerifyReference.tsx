

import { isEmpty } from "@/utils/functions";
import { Verified, VerifyError } from "./utils";
import { markPaymentFailed, markPaymentPaid, verifyPayment } from "@/actions/checkout";



export default async function VerifyReference({ reference }: { reference?: string }) {
    // const reference = searchParams.reference;
    console.debug("Verify reference", reference);

    if (isEmpty(reference)) return <VerifyError />;

    try {

        const verified = await verifyPayment(reference);

        if (verified) {
            await markPaymentPaid(reference);
        } else {
            await markPaymentFailed(reference);
        }
    } catch(err) {
        console.error(err);
        return <VerifyError />;
    }

    return <Verified/>;
}


