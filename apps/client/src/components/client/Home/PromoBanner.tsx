"use client";
import { PromoBanner } from '@/components/Common/PromoBanner'
import { motion } from 'framer-motion'
import { fadeIn } from '@/utils/motion' // Your animation utils
import { SHOP } from '@/constants';


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
                        title="Redemption Week 2025"
                        headline="LUMINARI OFFICER COLLECTION"
                        description="Step into purpose and presence with our most powerful bundle yet — jacket, roundneck, cap, jotter, and wristband. Made for Light Bearers determined to shine Christ in darkness."
                        ctaText="Claim Your Officer Pack"
                        ctaVariant="glow"
                        imageSrc="https://res.cloudinary.com/dfs9wgjql/image/upload/v1753034663/rW/productImages/mttqhbqdr0loa2mfqjmm.jpg"
                        imageAlt="Luminari Officer Bundle"
                        backgroundColor="bg-gradient-to-r from-blue-dark to-blue-light-1"
                        textColor="text-white"
                        overlay={true}
                        reviewCount="500+ bold believers"
                        className="rounded-2xl overflow-hidden shadow-2xl hover:shadow-purple-500/20 transition-shadow duration-300"
                        badgeText="PREMIUM BUNDLE"
                        badgeColor="bg-gold-500"
                        ctaHref={`${SHOP}/687d311b13ca4febb1d672ff`}
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
                            title="Redemption Week Speacial Packages"
                            headline="SHINE SPECIALIST"
                            badgeText="Limited Edition"
                            badgeColor="bg-purple-600" // Purple = royalty in Christ
                            description="The SHINE SPECIALIST set helps you shine Christ wherever you go — featuring a bold roundneck, cap, tote bag, and wristband. Gift it to someone walking in purpose."
                            ctaText="Bless Someone"
                            ctaVariant="primary"
                            imageSrc="https://res.cloudinary.com/dfs9wgjql/image/upload/v1753035080/rW/productImages/dvqf3slpjbdbkjvjncmq.jpg"
                            imageAlt="Redemption Week Gift Card"
                            backgroundColor="bg-gradient-to-br from-gold-600 to-gold-400" // Soft spiritual colors
                            textColor="text-white"
                            imagePosition="left"
                            className="rounded-xl hover:scale-[1.01] transition-transform duration-300 shadow-md hover:shadow-lg"
                            ctaHref={`${SHOP}/687d324f0152c4dd55c3a5bc`}
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
                            // title="LIGHT WEAVER"
                            title="Weave Light Into Everyday Life"
                            headline="LIGHT WEAVER"
                            badgeText="Bestseller"
                            badgeColor="bg-blue-600" // Blue = faith, revelation
                            description="This faith-forward set includes a water-resistant tote bag, jotter, keyholder, and wristband — daily reminders to keep shining Christ in darkness wherever you go."
                            ctaText="Own the Set"
                            ctaVariant="glow"
                            imageSrc="https://res.cloudinary.com/dfs9wgjql/image/upload/v1753051534/rW/productImages/cwkqjwigrh92szxheyhp.jpg"
                            imageAlt="Light Weaver Gift Pack"
                            backgroundColor="bg-gradient-to-br from-teal-dark to-white" // Heavenly/peaceful colors
                            textColor="text-gray-900"
                            imagePosition="right"
                            className="rounded-xl hover:scale-[1.01] transition-transform duration-300 shadow-md hover:shadow-lg"
                            ctaHref={`${SHOP}/687d72b10152c4dd55c3a5c6`}
                            // Optional faith elements:
                            // verse="'In Him was life, and that life was the light of men.' - John 1:4"
                            // icon={<CandleIcon className="w-5 h-5 ml-2 text-yellow-500" />}
                            // author="RCF FUTA Creative Team"
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
