"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css";

import Image from "next/image";
import { CarouselAdverts } from "@/data/advertisement";
import { BasicImage, formatNaira } from "@rw/shared";
import {motion} from "framer-motion";



const HeroCarousal = () => {
    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            modules={[Autoplay, Pagination]}
            className="hero-carousel"
        >
            {CarouselAdverts.map((advert, index) => (
                <SwiperSlide
                    key={index}
                    className="bg-gradient-to-r from-gray-50 to-white dark:from-dark-3 dark:to-dark-4"
                >
                    <div className="container mx-auto px-11 py-8 sm:py-12 lg:py-16">
                        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                            {/* Text Content */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="flex-1 order-2 lg:order-1 text-center lg:text-left"
                            >
                                {advert.discount && (
                                    <div className="inline-block bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 text-sm font-bold px-3 py-1 rounded-full mb-4">
                                        {advert.discount}% OFF
                                    </div>
                                )}

                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark dark:text-white mb-4 leading-tight">
                                    {advert.name}
                                </h1>

                                <p className="text-lg text-dark-6 dark:text-dark-5 mb-6 max-w-2xl">
                                    {advert.description}
                                </p>

                                <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                                    <div className="flex items-center gap-2">
                                        <span className="text-3xl font-bold text-blue dark:text-blue-300">
                                            {formatNaira(advert.totalPrice)}
                                        </span>
                                        {advert.discount && (
                                            <span className="text-lg line-through text-dark-5 dark:text-dark-6">
                                                {formatNaira(
                                                    advert.totalPrice / (1 - advert.discount / 100)
                                                )}
                                            </span>
                                        )}
                                    </div>

                                    <motion.a
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        href="#"
                                        className="inline-block bg-blue hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-all duration-300"
                                    >
                                        Get Yours Now →
                                    </motion.a>
                                </div>

                                {advert.items && (
                                    <div className="mt-6">
                                        <h3 className="text-sm font-semibold text-dark-5 dark:text-dark-6 mb-2">
                                            PACKAGE INCLUDES:
                                        </h3>
                                        <ul className="flex flex-wrap gap-2">
                                            {advert.items.map((item, i) => (
                                                <li
                                                    key={i}
                                                    className="bg-gray-100 dark:bg-dark-2 text-dark dark:text-white px-3 py-1 rounded-full text-sm"
                                                >
                                                    {item.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </motion.div>

                            {/* Image */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                className="flex-1 order-1 lg:order-2 flex justify-center"
                            >
                                <div className="relative w-full max-w-md aspect-square">
                                    <Image
                                        src={advert.image}
                                        alt={advert.name}
                                        fill
                                        className="object-contain"
                                        priority={index === 0}
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
};

export default HeroCarousal;
