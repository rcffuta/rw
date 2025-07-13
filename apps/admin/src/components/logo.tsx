
import Image from "next/image";

const logo = "/logos/logo.png";
const darkLogo = "/logos/logo.png";

export function Logo() {
  return (
      <div className="relative h-26 max-w-[20.847rem]">
          <Image
              src={logo}
              // width={210}
              // height={140}
              fill
              className="object-cover dark:hidden"
              alt="RW logo"
              role="presentation"
              quality={100}
          />

          <Image
              src={darkLogo}
              // width={210}
              // height={140}
              fill
              className="hidden object-cover dark:block"
              alt="RW logo"
              role="presentation"
              quality={100}
          />
      </div>
  )
}
