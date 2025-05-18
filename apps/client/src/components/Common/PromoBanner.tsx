// components/PromoBanner.tsx
import { CustomImage, PromoImage } from "@willo/lib";
import Image from "next/image";
import React from "react";

type PromoBannerProps = {
    type?: "large" | "small";
    title: string;
    headline: string;
    description: string;
    ctaText: string;
    ctaHref?: string;
    imageSrc: string;
    imageAlt: string;
    imagePosition?: "left" | "right";
    backgroundColor?: string;
    textColor?: string;
    badgeText?: string;
    badgeColor?: string;
};

export const PromoBanner: React.FC<PromoBannerProps> = ({
    type = "large",
    title,
    headline,
    description,
    ctaText,
    ctaHref = "#",
    imageSrc = "/assets/fallback.svg",
    imageAlt,
    imagePosition = "right",
    backgroundColor = "#F5F5F7",
    textColor = "text-dark",
    badgeText,
    badgeColor,
}) => {
    const isSmall = type === "small";

    return (
        <div
            className={`relative z-1 overflow-hidden rounded-lg px-4 sm:px-7.5 xl:px-10 ${
                isSmall ? "py-10 xl:py-16" : "py-12.5 lg:py-17.5 xl:py-22.5"
            }`}
            style={{ backgroundColor }}
        >
            {/* <Image
                src={imageSrc}
                alt={imageAlt}
                width={isSmall ? 241 : 274}
                height={isSmall ? 241 : 350}
                className={`absolute ${
                    imagePosition === "left"
                        ? "left-3 sm:left-10"
                        : "right-4 lg:right-26"
                } ${isSmall ? "top-1/2 -translate-y-1/2" : "bottom-0"} -z-1`}
            /> */}

            <PromoImage
                src={imageSrc}
                alt={imageAlt}
                imagePostition={imagePosition}
                small={isSmall}
            />

            <div
                className={`${imagePosition === "left" && isSmall ? "text-right" : ""} max-w-[550px] w-full`}
            >
                <span
                    className={`block text-lg mb-1.5 font-medium ${textColor}`}
                >
                    {title}
                </span>

                <h2
                    className={`font-bold text-xl lg:text-heading-4 xl:text-heading-3 ${textColor} mb-2.5 ${!isSmall ? "max-w-[400px]" : "max-w-[250px]"}`}
                >
                    {headline}
                </h2>

                {badgeText && badgeColor && (
                    <p
                        className={`font-semibold text-custom-1 mb-2.5`}
                        style={{ color: badgeColor }}
                    >
                        {badgeText}
                    </p>
                )}

                <p
                    className={`mb-5 ${!isSmall ? "max-w-[400px]" : "max-w-[250px]"}`}
                >
                    {description}
                </p>

                <a
                    href={ctaHref}
                    className="inline-flex font-medium text-custom-sm text-white bg-dark py-2.5 px-8.5 rounded-md ease-out duration-200 hover:opacity-90 mt-7.5"
                >
                    {ctaText}
                </a>
            </div>
        </div>
    );
};
