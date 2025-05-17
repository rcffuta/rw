// components/PromoSection.tsx

import { PromoBanner } from "@/components/Common/PromoBanner";

export default function PromoSection() {
    return (
        <section className="overflow-hidden py-20">
            <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
                <PromoBanner
                    type="large"
                    title="Cyberpunk 2077"
                    headline="UP TO 30% OFF"
                    description="Experience the future with Cyberpunk 2077’s breathtaking open world and thrilling combat."
                    ctaText="Buy Now"
                    imageSrc="/assets/promo/cyberpunk.png"
                    imageAlt="Cyberpunk Game"
                    backgroundColor="#F5F5F7"
                />

                <br/>

                {/* <div className="grid gap-7.5 grid-cols-1 lg:grid-cols-2">
                    <PromoBanner
                        type="small"
                        title="Steam Gift Card"
                        headline="Give the Gift of Games"
                        badgeText="Flat 15% Off"
                        badgeColor="#0F766E"
                        description="Perfect for birthdays, holidays, or just because."
                        ctaText="Grab Now"
                        imageSrc="/assets/promo/steam-card.png"
                        imageAlt="Steam Gift Card"
                        backgroundColor="#DBF4F3"
                        imagePosition="left"
                    />

                    <PromoBanner
                        type="small"
                        title="The Silent Patient"
                        headline="Up to 40% Off"
                        description="A thrilling mystery novel that keeps you on edge till the very end."
                        ctaText="Buy Now"
                        imageSrc="/assets/promo/thriller-book.png"
                        imageAlt="Book Cover"
                        backgroundColor="#FFECE1"
                        badgeColor="#FB923C"
                        badgeText="Limited Offer"
                        imagePosition="right"
                    />
                </div> */}

            </div>
        </section>
    );
}
