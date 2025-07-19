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

type PromoImageProps = {
    small?: boolean
    imagePosition?: 'left' | 'right'
} & CustomImageProps

const shimmer = `
  bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 animate-pulse
`;

export function PromoImage({
    src,
    alt,
    fallbackSrc = '/assets/fallback.svg',
    className = '',
    width,
    height,
    small: isSmall,
    imagePosition,
}: PromoImageProps) {
    const [isLoaded, setLoaded] = useState(false)
    const [error, setError] = useState(false)

    const validSrc = error || !src ? fallbackSrc : src

    return (
        <div
            className={`relative ${
                isSmall ? 'h-48 md:h-auto md:w-1/2' : 'h-64 md:h-auto md:w-1/2 lg:w-2/5'
            }`}
        >
            {!isLoaded && (
                <div
                    className={`absolute inset-0 ${shimmer}`}
                    style={{
                        height,
                        width,
                    }}
                />
            )}
            <Image
                src={validSrc}
                alt={alt}
                fill
                className={clsx(
                    'object-cover md:object-contain transition-opacity duration-500',
                    className,
                    {
                        'opacity-0': !isLoaded,
                        'opacity-100': isLoaded,
                    }
                )}
                style={{
                    objectPosition: imagePosition === 'left' ? 'left center' : 'right center',
                }}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
            />
        </div>
    )
}

export function BasicImage({
    src,
    alt,
    fallbackSrc = "/assets/fallback.svg",
    className = "",
    width,
    height,
}: CustomImageProps) {
    const [isLoaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    const validSrc = error || !src ? fallbackSrc : src;

    return (
        <div>
            {!isLoaded && <div className={`absolute inset-0 ${shimmer}`} style={{
                height, width
            }}/>}

            <Image
                src={validSrc}
                alt={alt}
                onLoad={() => setLoaded(true)}
                onError={() => setError(true)}
                className={clsx(
                    "transition-opacity duration-500",
                    className,
                    {
                        "opacity-0": !isLoaded,
                        "opacity-100": isLoaded,
                    }
                )}
                width={width}
                height={height}
            />
        </div>
    );
}

export function CustomImage({
    src,
    alt,
    fallbackSrc = "/assets/fallback.svg",
    className = "",
    aspectRatio = "1/1",
    role= undefined
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
                role={role}
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

// export function PromoImage({
//     src,
//     alt,
//     fallbackSrc = "/assets/fallback.svg",
//     imagePostition,
//     small
// }: PromoImageProps) {
//     const [isLoaded, setLoaded] = useState(false);
//     const [error, setError] = useState(false);

//     const validSrc = error || !src ? fallbackSrc : src;

//     const isLeft = imagePostition === "left";

//     return (
//         <Image
//             src={validSrc}
//             alt={alt}
//             onLoad={() => setLoaded(true)}
//             onError={() => setError(true)}
//             width={small ? 241 : 274}
//             height={small ? 241 : 350}
//             className={clsx(
//                 "absolute -z-1",
//                 {
//                     "opacity-0": !isLoaded,
//                     "opacity-100": isLoaded,
//                 },
//                 {
//                     "left-3 sm:left-10": isLeft,
//                     "right-4 lg:right-26": !isLeft,
//                 },
//                 {
//                     "top-1/2 -translate-y-1/2": small,
//                     "bottom-0": !small,
//                 }
//             )}
//             // role={role}
//         />
//     );
// }