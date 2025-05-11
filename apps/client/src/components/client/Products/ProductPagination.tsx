"use client";

import { CheveronIconLeft, CheveronIconRight } from "@/components/Common/Icons";
import clsx from "clsx";
import toast from "react-hot-toast";

export default function ProductPagination() {
    return (
        <div className="flex justify-center mt-15">
            <div className="bg-white shadow-1 rounded-md p-2">
                <ul className="flex items-center">
                    <li>
                        <button
                            id="paginationLeft"
                            aria-label="button for pagination left"
                            type="button"
                            disabled
                            className="flex items-center justify-center w-8 h-9 ease-out duration-200 rounded-[3px disabled:text-gray-4"
                        >
                            <CheveronIconLeft />
                        </button>
                    </li>

                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((e) => {
                        const active = e===1;
                        return (
                        <li key={e}>
                            <button
                                onClick={() => {
                                    if(active) return;
                                    toast.error("Not Implemented!", {id: "notImplementedToast", duration: 800})
                                }}
                                className={clsx(
                                    "flex py-1.5 px-3.5 duration-200 rounded-[3px] hover:text-white hover:bg-blue",
                                    {
                                        "bg-blue text-white": active
                                    }
                                )}
                            >
                                {e}
                            </button>
                        </li>
                    )})}

                    <li>
                        <button
                            id="paginationLeft"
                            aria-label="button for pagination left"
                            type="button"
                            className="flex items-center justify-center w-8 h-9 ease-out duration-200 rounded-[3px] hover:text-white hover:bg-blue disabled:text-gray-4"
                        >
                            <CheveronIconRight />
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}