import React from "react";

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/Common/Icons";
import { APP_NAME } from "@rw/shared";
import NotFound from "@/components/ui/NotFound";


export const metadata: Metadata = {
    title: `Page Not Found | ${APP_NAME}`,
    description: "This Page you seek is not found!",
    // other metadata
};

export default function Error404Page() {
    return (
        <NotFound/>
    );
};
