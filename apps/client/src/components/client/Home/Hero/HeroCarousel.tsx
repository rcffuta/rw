"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css";

import Image from "next/image";
import { CarouselAdverts } from "@/data/advertisement";
import { BasicImage } from "@gamezone/lib";



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
            {
                CarouselAdverts.map((advert, index)=>(
                    <SwiperSlide>
                        <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row justify-evenly">
                            {/* <div className="max-w-[394px] py-10 sm:py-15 lg:py-24.5 pl-4 sm:pl-7.5 lg:pl-12.5"> */}
                            <div className="max-w-[500px] py-10 sm:py-15 lg:py-24.5 pl-4 sm:pl-7.5 lg:pl-12.5">
                                <div className="flex items-center gap-4 mb-7.5 sm:mb-10">
                                    <span className="block font-semibold text-heading-3 sm:text-heading-1 text-blue">
                                        {advert.discountLabel}
                                    </span>
                                    <span className="block text-dark text-sm sm:text-custom-1 sm:leading-[24px]">
                                        {advert.discountSubtext}
                                    </span>
                                </div>

                                <h1 className="font-semibold text-dark text-xl sm:text-3xl mb-3">
                                    <a href={advert.ctaLink}>{advert.title}</a>
                                </h1>

                                <p>
                                    {advert.description}
                                </p>

                                <a
                                    href={advert.ctaLink}
                                    className="inline-flex font-medium text-white text-custom-sm rounded-md bg-dark py-3 px-9 ease-out duration-200 hover:bg-blue mt-10"
                                >
                                    {advert.ctaText}
                                </a>
                            </div>

                            <div>
                                <BasicImage
                                    src={advert.image.src}
                                    alt={advert.image.alt}
                                    width={advert.image.width}
                                    height={advert.image.height}
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    );
};

export default HeroCarousal;
