"use client";
import { PromoBanner } from '@/components/Common/PromoBanner'
import { motion } from 'framer-motion'
import { fadeIn } from '@/utils/motion' // Your animation utils

export function PromoSection1() {
    return (
        <section className="relative py-16 sm:py-24 overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-radial from-blue-500/10 to-transparent rounded-full opacity-20" />
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Promo Banner */}
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    variants={fadeIn('up', 'spring', 0.1, 1)}
                    className="mb-12 sm:mb-16"
                >
                    <PromoBanner
                        type="large"
                        title="Redemption Week 2024"
                        headline="EXCLUSIVE ANNIVERSARY MERCH"
                        description="Celebrate God's faithfulness with our limited edition collection. Each purchase supports campus evangelism and fellowship programs."
                        ctaText="Get Yours Now"
                        ctaVariant="glow"
                        imageSrc="/assets/merch/redemption-week-bundle.jpg"
                        imageAlt="Redemption Week Merch Bundle"
                        backgroundColor="bg-gradient-to-r from-blue-dark to-blue-light-1" // Purple = royalty, Blue = faith
                        textColor="text-white"
                        overlay={true}
                        // rating={4.9}
                        reviewCount="500+ blessed members"
                        className="rounded-2xl overflow-hidden shadow-2xl hover:shadow-purple-500/20 transition-shadow duration-300"
                        badgeText="LIMITED STOCK"
                        badgeColor="bg-gold-500" // Gold = divine nature
                    />
                </motion.div>

            </div>
        </section>
    )
}

export function PromoSection2() {
    return (
        <section className="relative py-16 sm:py-24 overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-radial from-blue-500/10 to-transparent rounded-full opacity-20" />
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Secondary Promo Banners */}
                <div className="grid gap-6 md:gap-8 grid-cols-1 lg:grid-cols-2">
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        variants={fadeIn('right', 'spring', 0.2, 1)}
                    >
                        <PromoBanner
                            type="small"
                            title="Redemption Week Gift Cards"
                            headline="Share The Blessing"
                            badgeText="Limited Edition"
                            badgeColor="bg-purple-600" // Purple = royalty in Christ
                            description="Bless a fellow student with the gift of Redemption Week merch. Perfect for birthdays, discipleship rewards, or spiritual encouragement."
                            ctaText="Bless Someone"
                            ctaVariant="primary"
                            imageSrc="/assets/merch/redemption-giftcard.jpg"
                            imageAlt="Redemption Week Gift Card"
                            backgroundColor="bg-gradient-to-br from-gold-600 to-gold-400" // Soft spiritual colors
                            textColor="text-white"
                            imagePosition="left"
                            className="rounded-xl hover:scale-[1.01] transition-transform duration-300 shadow-md hover:shadow-lg"
                            // Optional additions:
                            // verse="'It is more blessed to give than to receive' - Acts 20:35"
                            // icon={<CrossIcon className="w-5 h-5 ml-2 text-purple-600" />}
                        />
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        variants={fadeIn('left', 'spring', 0.2, 1)}
                    >
                        <PromoBanner
                            type="small"
                            title="Redemption Week Devotional"
                            headline="Special 25% Discount"
                            badgeText="Bestseller"
                            badgeColor="bg-blue-600" // Blue = faith, revelation
                            description="Deepen your walk with God through our 7-day devotional guide, featuring daily scriptures, reflections, and prayer points for Redemption Week."
                            ctaText="Get Your Copy"
                            ctaVariant="glow"
                            imageSrc="/assets/merch/redemption-devotional.jpg"
                            imageAlt="Redemption Week Devotional Book"
                            backgroundColor="bg-gradient-to-br from-teal-dark to-white" // Heavenly/peaceful colors
                            textColor="text-gray-900"
                            imagePosition="right"
                            className="rounded-xl hover:scale-[1.01] transition-transform duration-300 shadow-md hover:shadow-lg"
                            // Optional faith elements:
                            // verse="'Your word is a lamp to my feet' - Psalm 119:105"
                            // icon={<BibleIcon className="w-5 h-5 ml-2 text-blue-600" />}
                            // author="RCF FUTA Prayer Team"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

// Example icon components (create these or import from your library)
function GiftIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} viewBox="0 0 20 20" fill="currentColor">
            <path
                fillRule="evenodd"
                d="M14 6a2.5 2.5 0 00-4-3 2.5 2.5 0 00-4 3H3.25C2.56 6 2 6.56 2 7.25v.5C2 8.44 2.56 9 3.25 9h6V6h1.5v3h6C17.44 9 18 8.44 18 7.75v-.5C18 6.56 17.44 6 16.75 6H14zm-1-1.5a1 1 0 01-1 1h-1v-1a1 1 0 112 0zm-6 0a1 1 0 001 1h1v-1a1 1 0 00-2 0z"
                clipRule="evenodd"
            />
            <path d="M9.25 10.5H3v4.75A2.75 2.75 0 005.75 18h3.5v-7.5zM10.75 18v-7.5H17v4.75A2.75 2.75 0 0114.25 18h-3.5z" />
        </svg>
    )
}

function BookmarkIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} viewBox="0 0 20 20" fill="currentColor">
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
        </svg>
    )
}
