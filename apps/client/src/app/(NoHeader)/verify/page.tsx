import React, { Suspense } from "react";

import { Metadata } from "next";
import { Verifying } from "./utils";
import VerifyReference from "./VerifyReference";
export const metadata: Metadata = {
    title: "Verify Payment | GameZone",
    description: "You payment was done, we'll confirm on our end.",
    // other metadata
};

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ reference?: string }> };

export default async function VerifyPage({ searchParams }: Props) {
    const reference = (await searchParams).reference;
    return (
        <main>
            <section className="overflow-hidden py-20 bg-gray-2">
                <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
                    <div className="bg-white rounded-xl shadow-1 px-4 py-10 sm:py-15 lg:py-20 xl:py-25">
                        <Suspense fallback={<Verifying />}>
                            <VerifyReference reference={reference} />
                        </Suspense>
                    </div>
                </div>
            </section>
        </main>
    );
};

