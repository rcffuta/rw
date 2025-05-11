import { WishListIcon } from "@/components/Common/Icons";
import Link from "next/link";

export default function EmptyWishList() {
    return (
        <div className="text-center mt-8">
            <div className="mx-auto pb-7.5">
                <WishListIcon />
            </div>

            <p className="pb-6">Your Wishlist is empty!</p>

            <Link
                href={"#"}
                className="w-96 mx-auto flex justify-center font-medium text-white bg-dark py-[13px] px-6 rounded-md ease-out duration-200 hover:bg-opacity-95"
            >
            </Link>
        </div>
    );
}