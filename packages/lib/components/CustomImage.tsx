"use client";

import Image from "next/image";
import { AriaRole, useState } from "react";
import clsx from "clsx";

type CustomImageProps = {
    src: string;
    alt: string;
    fallbackSrc?: string;
    className?: string;
    aspectRatio?: string; // e.g. "1/1", "4/3"
    width?: number;
    height?: number;
    role?: AriaRole;
};

const shimmer = `
  bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 animate-pulse
`;

export function CustomImage({
    src,
    alt,
    fallbackSrc = "/assets/fallback.svg",
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

export function ProductImage({
    src,
    alt,
    fallbackSrc = "/assets/fallback.svg",
    className = "",
    width = 200,
    height = 200,
}: CustomImageProps) {
    const [isLoaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    const validSrc = error || !src ? fallbackSrc : src;

    return (
        <div
            style={{ width, height }}
            className="relative flex items-center justify-center overflow-hidden"
        >

            <Image
                src={validSrc}
                alt={alt}
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
                className={clsx(
                    "object-contain transition-opacity duration-500",
                    {
                        "opacity-0": !isLoaded,
                        "opacity-100": isLoaded,
                    },
                    className
                )}
                width={width}
                height={height}
            />
        </div>
    );
}

export function CategoryImage({
    src,
    alt,
    fallbackSrc = "/assets/fallback.svg",
    className = "",
    width = 120,
    height = 120,
    role,
}: CustomImageProps) {
    const [isLoaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    const validSrc = error || !src ? fallbackSrc : src;

    return (
        <Image
            src={validSrc}
            alt={alt}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            className={clsx(
                "object-cover object-center transition-opacity duration-500",
                {
                    "opacity-0": !isLoaded,
                    "opacity-100": isLoaded,
                },
                className
            )}
            width={width}
            height={height}
            // role={role}
        />
    );
}