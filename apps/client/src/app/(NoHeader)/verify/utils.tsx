import { SHOP } from "@/constants";
import Link from "next/link";

export function VerifyError() {
    return (
        <div className="text-center">
            <h2 className="font-bold text-red-600 text-4xl mb-5">
                Payment Failed
            </h2>
            <p className="mb-3">We couldn't confirm your payment.</p>
            <p className="mb-7.5">
                If you believe this is a mistake, please contact support.
            </p>
            <Link
                href={SHOP}
                className="inline-flex items-center gap-2 font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark"
            >
                Back to Shop
            </Link>
        </div>
    );
}

export function Verified() {
    return (
        <div className="text-center">
            <h2 className="font-bold text-red-600 text-4xl mb-5">
                Payment Successful!
            </h2>
            <p className="mb-3">Thanks for your payment.</p>
            <p className="mb-7.5">
                We've confirmed your transacation, thank you.
            </p>
            <Link
                href={SHOP}
                className="inline-flex items-center gap-2 font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark"
            >
                Go to Shop
            </Link>
        </div>
    );
}

export function Verifying() {
    return (
        <div className="text-center">
            <h2 className="font-bold text-blue text-4xl lg:text-[45px] lg:leading-[57px] mb-5">
                Verifying your payment
            </h2>

            <h3 className="font-medium text-dark text-xl sm:text-2xl mb-3">
                {/* Your message sent successfully */}
                {/* We&apos;ll keep checking to confirm */}
                We're checking
            </h3>

            <p className="max-w-[491px] w-full mx-auto mb-7.5">
                {/* Thank you so much for your message. We check
                                e-mail frequently and will try our best to
                                respond to your inquiry. */}
                {/* Thank you for you patronage! */}
                Hold on as we check...
            </p>
        </div>
    );
}
