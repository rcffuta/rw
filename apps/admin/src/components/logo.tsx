
import Image from "next/image";

const logo = "/logos/logo.svg";
const darkLogo = "/logos/logo-dark.svg";

export function Logo() {
  return (
    <div className="relative h-10 max-w-[20.847rem]">
      <Image
        src={logo}
        fill
        className="dark:hidden"
        alt="NextAdmin logo"
        role="presentation"
        quality={100}
      />

      <Image
        src={darkLogo}
        fill
        className="hidden dark:block"
        alt="NextAdmin logo"
        role="presentation"
        quality={100}
      />
    </div>
  );
}
