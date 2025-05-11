"use client";

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

type CustomImageProps = {
    src: string;
    alt: string;
    fallbackSrc?: string;
    className?: string;
    aspectRatio?: string; // e.g. "1/1", "4/3"
};

const shimmer = `
  bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 animate-pulse
`;

export default function CustomImage({
    src,
    alt,
    fallbackSrc = "/fallback.jpg",
    className = "",
    aspectRatio = "1/1",
}: CustomImageProps) {
    const [isLoaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    const validSrc = error || !src ? fallbackSrc : src;

    return (
        <div
            className={clsx(
                "relative w-full rounded-xl",
                // `aspect-[${aspectRatio}]`,
                "pt-[100%] border border-gray-3 shadow-md",
                className
            )}
        >
            {!isLoaded && <div className={`absolute inset-0 ${shimmer}`} />}

            <Image
                src={validSrc}
                alt={alt}
                fill
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
                className={clsx(
                    "object-contain object-center transition-opacity duration-500",
                    {
                        "opacity-0": !isLoaded,
                        "opacity-100": isLoaded,
                    }
                )}
                sizes="(max-width: 768px) 100vw, 250px"
            />
        </div>
    );
}
