import React from "react";
import Image from "next/image";

const featureData = [
    {
        img: '/assets/icons/icon-01.svg', // Lightning bolt icon
        title: 'Redemption Rush Delivery',
        description: 'Get your merch in 3-5 business days or less',
    },
    // {
    //     img: '/assets/icons/icon-03.svg', // Shield/lock icon
    //     title: 'Sacred Secure Checkout',
    //     description: 'Military-grade encryption for all transactions',
    // },
    {
        img: '/assets/icons/icon-04.svg', // Headset icon
        title: 'Covenant Support',
        description: 'Anointed support team available 24/7',
    },
    {
        img: '/assets/icons/icon-05.svg', // Medal/star icon
        title: 'Hall of Faith Quality',
        description: 'Premium materials blessed for durability',
    },
]

const HeroFeature = () => {
  return (
    <div className="max-w-[1060px] w-full mx-auto px-4 sm:px-8 xl:px-0">
      <div className="flex flex-nowrap md:flex-row flex-col items-center justify-center gap-7.5 xl:gap-12.5 mt-10">
        {featureData.map((item, key) => (
          <div className="flex items-center gap-4" key={key}>
            <Image src={item.img} alt="icons" width={40} height={41} />

            <div>
              <h3 className="font-medium text-lg text-dark">{item.title}</h3>
              <p className="text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroFeature;
