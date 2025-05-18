import { APP_NAME } from "@willo/lib";
import clsx from "clsx";
import Image from "next/image";


const logo = "/logos/logo.svg";
const darkLogo = "/logos/logo-dark.svg";


export default function Logo(props: {className?:string}) {

    return (
        <>
            <Image
                src={logo}
                width={219}
                height={36}
                className={clsx("dark:hidden", props.className)}
                alt={APP_NAME}
                role="presentation"
                quality={100}
            />

            <Image
                src={darkLogo}
                width={219}
                height={36}
                className={clsx("hidden dark:block", props.className)}
                alt={APP_NAME}
                role="presentation"
                quality={100}
            />
        </>
    );
}