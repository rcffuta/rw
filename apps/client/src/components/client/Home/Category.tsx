"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { useCallback, useRef, useEffect, useState } from "react";
import Image from "next/image";

// Import Swiper styles
import "swiper/css/navigation";
import "swiper/css";
import { CategoryIcon } from "@/components/Common/Icons";
import { observer } from "mobx-react-lite";
import { getCategoryList } from "@/actions/category.action";
import toast from "react-hot-toast";
import { CategoryImage } from "@gamezone/lib";
import { CategoryItem } from "db/actions";

function CategorList () {
    const sliderRef = useRef(null);

    const [categories, setCategories] = useState<CategoryItem[] | null>(null);

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);

    useEffect(() => {
        if (sliderRef.current) {
        sliderRef.current.swiper.init();
        }
    }, []);

    useEffect(() => {
        async function loadCategories() {
            if (Array.isArray(categories)) return;

            try {

                const data = await getCategoryList();    
                setCategories(()=>data);
            } catch(error) {
                console.error("Error Loading Categories", error);
                toast.error("Could not load categories")
            }
        }

        loadCategories()
    }, [categories]);


    if ((categories || []).length < 1) return null;

    return (
        <section className="overflow-hidden pt-17.5">
            <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0 pb-15 border-b border-gray-3">
                <div className="swiper categories-carousel common-carousel">
                    {/* <!-- section title --> */}
                    <div className="mb-10 flex items-center justify-between">
                        <div>
                            <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
                                <CategoryIcon />
                                Categories
                            </span>
                            <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
                                Browse by Category
                            </h2>
                        </div>

                        
                        <div className="flex items-center gap-3">
                            <button onClick={handlePrev} className="swiper-button-prev">
                                <svg
                                className="fill-current"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M15.4881 4.43057C15.8026 4.70014 15.839 5.17361 15.5694 5.48811L9.98781 12L15.5694 18.5119C15.839 18.8264 15.8026 19.2999 15.4881 19.5695C15.1736 19.839 14.7001 19.8026 14.4306 19.4881L8.43056 12.4881C8.18981 12.2072 8.18981 11.7928 8.43056 11.5119L14.4306 4.51192C14.7001 4.19743 15.1736 4.161 15.4881 4.43057Z"
                                    fill=""
                                />
                                </svg>
                            </button>

                            <button onClick={handleNext} className="swiper-button-next">
                                <svg
                                className="fill-current"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M8.51192 4.43057C8.82641 4.161 9.29989 4.19743 9.56946 4.51192L15.5695 11.5119C15.8102 11.7928 15.8102 12.2072 15.5695 12.4881L9.56946 19.4881C9.29989 19.8026 8.82641 19.839 8.51192 19.5695C8.19743 19.2999 8.161 18.8264 8.43057 18.5119L14.0122 12L8.43057 5.48811C8.161 5.17361 8.19743 4.70014 8.51192 4.43057Z"
                                    fill=""
                                />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <Swiper
                        ref={sliderRef}
                        slidesPerView={6}
                        breakpoints={{
                            // when window width is >= 640px
                            0: {
                                slidesPerView: 2,
                            },
                            1000: {
                                slidesPerView: 4,
                                // spaceBetween: 4,
                            },
                            // when window width is >= 768px
                            1200: {
                                slidesPerView: 6,
                            },
                        }}
                    >
                        {categories.map((item, key) => (
                            <SwiperSlide key={key}>
                                <SingleItem item={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* <div className="flex justify-evenly w-full">
                        {categories.map((item) => (
                            // <SwiperSlide key={key}>
                                <SingleItem item={item} key={item.id}/>
                            // </SwiperSlide>
                        ))}
                    </div> */}
                </div>
            </div>
        </section>
    );
};

export default observer(CategorList)


const SingleItem = ({ item }: { item: CategoryItem }) => {
  return (
      <a href="#" className="group flex flex-col items-center max-w-[130px] w-svw">
          <div className="w-full bg-[#f2f3f856] h-32.5 rounded-full flex items-center justify-center mb-4 overflow-hidden">
              <CategoryImage src={item.image} alt={item.name} width={82} height={62} />
          </div>

          <div className="flex justify-center">
              <h3 className="inline-block font-medium text-center text-dark bg-gradient-to-r from-blue to-blue bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_1px] group-hover:text-blue">
                  {item.name}
              </h3>
          </div>
      </a>
  );
};
