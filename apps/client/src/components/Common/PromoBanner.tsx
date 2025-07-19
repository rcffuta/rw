// components/PromoBanner.tsx
import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'
import {Star} from "lucide-react";
import { PromoImage } from '@rw/shared';

type PromoBannerProps = {
    type?: 'large' | 'small'
    title: string
    headline: string
    description: string
    ctaText: string
    ctaHref?: string
    imageSrc: string
    imageAlt: string
    imagePosition?: 'left' | 'right'
    backgroundColor?: string
    textColor?: string
    badgeText?: string
    badgeColor?: string
    className?: string
    overlay?: boolean
    rating?: number
    reviewCount?: string
    ctaVariant?: 'primary' | 'secondary' | 'glow'
}

export const PromoBanner: React.FC<PromoBannerProps> = ({
    type = 'large',
    title,
    headline,
    description,
    ctaText,
    ctaHref = '#',
    imageSrc = '/assets/fallback.svg',
    imageAlt,
    imagePosition = 'right',
    backgroundColor = 'bg-gray-50',
    textColor = 'text-dark',
    badgeText,
    badgeColor = 'bg-blue-600',
    className = '',
    overlay = false,
    rating,
    reviewCount,
    ctaVariant = 'primary',
}) => {
    const isSmall = type === 'small'

    // CTA variant styles
    const ctaVariants = {
        primary: `
    bg-purple-700 hover:bg-purple-800 
    text-white 
    border border-purple-900 
    shadow-md hover:shadow-lg 
    transition-all duration-300
    active:scale-95
  `,
        secondary: `
    bg-white hover:bg-gray-50 
    text-purple-700 
    border-2 border-purple-600 
    shadow-sm hover:shadow-md 
    transition-all duration-300
    active:scale-95
  `,
        glow: `
    bg-gradient-to-r from-blue-600 to-purple-600 
    hover:from-blue-700 hover:to-purple-700 
    text-white 
    shadow-lg shadow-blue-400/40 
    hover:shadow-xl hover:shadow-blue-500/50 
    transition-all duration-500
    active:scale-95
    animate-pulse-slow
  `,
        // New spiritual variant
        faith: `
    bg-gold-500 hover:bg-gold-600 
    text-white 
    border-2 border-gold-400 
    shadow-md hover:shadow-lg 
    transition-all duration-300
    active:scale-95
    font-bold
  `,
    }

    return (
        <div
            className={`relative overflow-hidden ${backgroundColor} ${className} ${
                overlay ? 'bg-opacity-90' : ''
            }`}
        >
            {/* Overlay for better text contrast */}
            {overlay && (
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent z-0" />
            )}

            <div
                className={`relative z-10 flex flex-col ${
                    isSmall ? 'md:flex-row' : 'lg:flex-row'
                } ${imagePosition === 'left' ? '' : 'md:flex-row-reverse'}`}
            >
                {/* Text Content */}
                <div
                    className={`flex-1 flex flex-col justify-center p-8 ${
                        imagePosition === 'left'
                            ? 'md:items-end md:text-right'
                            : 'md:items-start md:text-left'
                    }`}
                >
                    {badgeText && (
                        <span
                            className={`inline-block px-3 py-1 mb-3 text-xs font-bold rounded-full ${badgeColor} text-dark`}
                        >
                            {badgeText}
                        </span>
                    )}

                    <span className={`block text-sm font-medium ${textColor} mb-2`}>{title}</span>

                    <h2 className={`font-bold text-2xl md:text-3xl lg:text-4xl ${textColor} mb-3`}>
                        {headline}
                    </h2>

                    <p className={`text-sm md:text-base ${textColor} opacity-90 mb-6 max-w-[90%]`}>
                        {description}
                    </p>

                    {rating && (
                        <div className="flex items-center mb-6">
                            <div className="flex mr-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${
                                            i < Math.floor(rating)
                                                ? 'fill-yellow-400 text-yellow-400'
                                                : 'fill-gray-300 text-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>
                            <span className={`text-xs ${textColor} opacity-80`}>
                                {rating} ({reviewCount} reviews)
                            </span>
                        </div>
                    )}

                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={ctaHref}
                        className={`inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all ${ctaVariants[ctaVariant]} w-fit`}
                    >
                        {ctaText}
                    </motion.a>
                </div>

                {/* Image */}
                <div
                    className={`relative ${
                        isSmall ? 'h-48 md:h-auto md:w-1/2' : 'h-64 md:h-auto md:w-1/2 lg:w-2/5'
                    }`}
                >
                    <PromoImage
                        src={imageSrc}
                        alt={imageAlt}
                        imagePosition={imagePosition}
                        // sizes="(max-width: 768px) 100vw, 50vw"
                        // priority
                    />
                </div>
            </div>
        </div>
    )
}
