import { HOME } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "../Common/Icons";


export default function NotFound({
    title = "Sorry, the page can't be found",
    description = "The page you were looking for appears to have been moved, deleted or does not exist."
}: {
    title?: string
    description?: string
}) {
    return (
        <main>
            <section className="overflow-hidden py-20 bg-gray-2">
                <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
                    <div className="bg-white rounded-xl shadow-1 px-4 py-10 sm:py-15 lg:py-20 xl:py-25">
                        <div className="text-center">
                            <Image
                                src="/assets/404.svg"
                                alt="404"
                                className="mx-auto mb-8 w-1/2 sm:w-auto"
                                width={288}
                                height={190}
                            />

                            <h2 className="font-medium text-dark text-xl sm:text-2xl mb-3">{title}</h2>

                            <p className="max-w-[410px] w-full mx-auto mb-7.5">
                                {description}
                            </p>

                            <Link
                                href={HOME}
                                className="inline-flex items-center gap-2 font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark"
                            >
                                <ArrowIcon />
                                Go Home
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}