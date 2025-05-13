"use client";
import { PropsWithChildren } from "react";


export default function ProductWrapperForm(props: PropsWithChildren & {handleSubmit: (e:any)=>void}) {
    return (
        <form onSubmit={props.handleSubmit}>
            <section className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                {props.children}
            </section>

            <button
                type="submit"
                className="mt-6 flex w-full justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
            >
                Save Product
            </button>
        </form>
    );
}