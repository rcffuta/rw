"use client";
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { menuData } from "./menuData";
import Dropdown from "./Dropdown";
import { useCartModalContext } from "@/context/CartSidebarModalContext";
import Logo from "../Logo";
import { CartIcon, PhoneIcon, SearchIcon } from "../Icons";
import { UserHighlight } from "@/components/Common/Header/UserHighlight";
import cartStore from "@/lib/store/cartStore";
import { observer } from "mobx-react-lite";
import CategorySelect from "../CategorySelect";
import { useFormatCurrency } from "@willo/lib";
import { SearchProduct } from "./Search";

type HeaderMenu = {
    stickyMenu: boolean;
    navigationOpen: boolean;
};


type HeaderMenuWithSetNavigation = HeaderMenu & {
    setNavigationOpen: React.Dispatch<React.SetStateAction<boolean>>
};


function HeaderSearch(){ 

    return (
        <Suspense fallback={null}>
            <div className="flex items-center">
                <CategorySelect />

                <SearchProduct/>
            </div>
        </Suspense>
    );
}

const HeaderTop = observer(({
    stickyMenu,
    navigationOpen,
    setNavigationOpen,
}: HeaderMenuWithSetNavigation) => {
    
    const product = cartStore.items;
    const totalPrice = cartStore.totalPrice;

    const { openCartModal } = useCartModalContext();

    const parseFigure = useFormatCurrency();

    const handleOpenCartModal = () => {
        openCartModal();
    };

    return (
        <div className="max-w-[1170px] mx-auto px-4 sm:px-7.5 xl:px-0">
            {/* <!-- header top start --> */}
            <div
                className={`flex flex-col lg:flex-row gap-5 items-end lg:items-center xl:justify-between ease-out duration-200 ${
                    stickyMenu ? "py-4" : "py-6"
                }`}
            >
                {/* <!-- header top left --> */}
                <div className="xl:w-auto flex-col sm:flex-row w-full flex sm:justify-between sm:items-center gap-5 sm:gap-10">
                    <Link className="flex-shrink-0" href="/">
                        <Logo />
                    </Link>

                    <div className="max-w-[475px] w-full">
                        <HeaderSearch />
                    </div>
                </div>

                {/* <!-- header top right --> */}
                <div className="flex w-full lg:w-auto items-center gap-7.5">
                    {/* <div className="hidden xl:flex items-center gap-3.5">
                        <PhoneIcon />

                        <div>
                            <span className="block text-2xs text-dark-4 uppercase">
                                24/7 SUPPORT
                            </span>
                            <p className="font-medium text-custom-sm text-dark">
                                {phoneNumber}
                            </p>
                        </div>
                    </div> */}

                    {/* <!-- divider --> */}
                    {/* <span className="hidden xl:block w-px h-7.5 bg-gray-4"></span> */}

                    <div className="flex w-full lg:w-auto justify-between items-center gap-5">
                        <div className="flex items-center gap-5">
                            <UserHighlight />

                            <button
                                onClick={handleOpenCartModal}
                                className="flex items-center gap-2.5"
                            >
                                <span className="inline-block relative">
                                    <CartIcon />

                                    <span className="flex items-center justify-center font-medium text-2xs absolute -right-2 -top-2.5 bg-blue w-4.5 h-4.5 rounded-full text-white">
                                        {product.length}
                                    </span>
                                </span>

                                <div>
                                    <span className="block text-2xs text-dark-4 uppercase">
                                        cart
                                    </span>
                                    <p className="font-medium text-custom-sm text-dark">
                                        {parseFigure(totalPrice)}
                                    </p>
                                </div>
                            </button>
                        </div>

                        {/* <!-- Hamburger Toggle BTN --> */}
                        <button
                            id="Toggle"
                            aria-label="Toggler"
                            className="xl:hidden block"
                            onClick={() => setNavigationOpen(!navigationOpen)}
                        >
                            <span className="block relative cursor-pointer w-5.5 h-5.5">
                                <span className="du-block absolute right-0 w-full h-full">
                                    <span
                                        className={`block relative top-0 left-0 bg-dark rounded-sm w-0 h-0.5 my-1 ease-in-out duration-200 delay-[0] ${
                                            !navigationOpen &&
                                            "!w-full delay-300"
                                        }`}
                                    ></span>
                                    <span
                                        className={`block relative top-0 left-0 bg-dark rounded-sm w-0 h-0.5 my-1 ease-in-out duration-200 delay-150 ${
                                            !navigationOpen &&
                                            "!w-full delay-400"
                                        }`}
                                    ></span>
                                    <span
                                        className={`block relative top-0 left-0 bg-dark rounded-sm w-0 h-0.5 my-1 ease-in-out duration-200 delay-200 ${
                                            !navigationOpen &&
                                            "!w-full delay-500"
                                        }`}
                                    ></span>
                                </span>

                                <span className="block absolute right-0 w-full h-full rotate-45">
                                    <span
                                        className={`block bg-dark rounded-sm ease-in-out duration-200 delay-300 absolute left-2.5 top-0 w-0.5 h-full ${
                                            !navigationOpen && "!h-0 delay-[0] "
                                        }`}
                                    ></span>
                                    <span
                                        className={`block bg-dark rounded-sm ease-in-out duration-200 delay-400 absolute left-0 top-2.5 w-full h-0.5 ${
                                            !navigationOpen && "!h-0 dealy-200"
                                        }`}
                                    ></span>
                                </span>
                            </span>
                        </button>
                        {/* //   <!-- Hamburger Toggle BTN --> */}
                    </div>
                </div>
            </div>
            {/* <!-- header top end --> */}
        </div>
    );
});


function HeaderNavigation({ stickyMenu, navigationOpen }: HeaderMenu) {
    return (
        <div className="border-t border-gray-3">
            <div className="max-w-[1170px] mx-auto px-4 sm:px-7.5 xl:px-0">
                <div className="flex items-center justify-between">
                    {/* <!--=== Main Nav Start ===--> */}
                    <div
                        className={`w-[288px] absolute right-4 top-full xl:static xl:w-auto h-0 xl:h-auto invisible xl:visible xl:flex items-center justify-between ${
                            navigationOpen &&
                            `!visible bg-white shadow-lg border border-gray-3 !h-auto max-h-[400px] overflow-y-scroll rounded-md p-5`
                        }`}
                    >
                        {/* <!-- Main Nav Start --> */}
                        <nav>
                            <ul className="flex xl:items-center flex-col xl:flex-row gap-5 xl:gap-6">
                                {menuData.map((menuItem, i) =>
                                    menuItem.submenu ? (
                                        <Dropdown
                                            key={i}
                                            menuItem={menuItem}
                                            stickyMenu={stickyMenu}
                                        />
                                    ) : (
                                        <li
                                            key={i}
                                            className="group relative before:w-0 before:h-[3px] before:bg-blue before:absolute before:left-0 before:top-0 before:rounded-b-[3px] before:ease-out before:duration-200 hover:before:w-full "
                                        >
                                            <Link
                                                href={menuItem.path}
                                                className={`hover:text-blue text-custom-sm font-medium text-dark flex ${
                                                    stickyMenu
                                                        ? "xl:py-4"
                                                        : "xl:py-6"
                                                }`}
                                            >
                                                {menuItem.title}
                                            </Link>
                                        </li>
                                    )
                                )}
                            </ul>
                        </nav>
                        {/* //   <!-- Main Nav End --> */}
                    </div>
                    {/* // <!--=== Main Nav End ===--> */}

                    {/* // <!--=== Nav Right Start ===--> */}
                    <div className="hidden xl:block">
                        <ul className="flex items-center gap-5.5">
                            {/* <li className="py-4">
                                <a
                                    href="#"
                                    className="flex items-center gap-1.5 font-medium text-custom-sm text-dark hover:text-blue"
                                >
                                    <svg
                                        className="fill-current"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M2.45313 7.55556H1.70313V7.55556L2.45313 7.55556ZM2.45313 8.66667L1.92488 9.19908C2.21729 9.4892 2.68896 9.4892 2.98137 9.19908L2.45313 8.66667ZM4.10124 8.08797C4.39528 7.79623 4.39715 7.32135 4.10541 7.02731C3.81367 6.73327 3.3388 6.73141 3.04476 7.02315L4.10124 8.08797ZM1.86149 7.02315C1.56745 6.73141 1.09258 6.73327 0.800843 7.02731C0.509102 7.32135 0.510968 7.79623 0.805009 8.08797L1.86149 7.02315ZM12.1973 5.05946C12.4143 5.41232 12.8762 5.52252 13.229 5.30558C13.5819 5.08865 13.6921 4.62674 13.4752 4.27388L12.1973 5.05946ZM8.0525 1.25C4.5514 1.25 1.70313 4.06755 1.70313 7.55556H3.20313C3.20313 4.90706 5.3687 2.75 8.0525 2.75V1.25ZM1.70313 7.55556L1.70313 8.66667L3.20313 8.66667L3.20313 7.55556L1.70313 7.55556ZM2.98137 9.19908L4.10124 8.08797L3.04476 7.02315L1.92488 8.13426L2.98137 9.19908ZM2.98137 8.13426L1.86149 7.02315L0.805009 8.08797L1.92488 9.19908L2.98137 8.13426ZM13.4752 4.27388C12.3603 2.46049 10.3479 1.25 8.0525 1.25V2.75C9.80904 2.75 11.346 3.67466 12.1973 5.05946L13.4752 4.27388Z"
                                            fill=""
                                        />
                                        <path
                                            d="M13.5427 7.33337L14.0699 6.79996C13.7777 6.51118 13.3076 6.51118 13.0155 6.79996L13.5427 7.33337ZM11.8913 7.91107C11.5967 8.20225 11.5939 8.67711 11.8851 8.97171C12.1763 9.26631 12.6512 9.26908 12.9458 8.9779L11.8913 7.91107ZM14.1396 8.9779C14.4342 9.26908 14.9091 9.26631 15.2003 8.97171C15.4914 8.67711 15.4887 8.20225 15.1941 7.91107L14.1396 8.9779ZM3.75812 10.9395C3.54059 10.587 3.07849 10.4776 2.72599 10.6951C2.3735 10.9127 2.26409 11.3748 2.48163 11.7273L3.75812 10.9395ZM7.9219 14.75C11.4321 14.75 14.2927 11.9352 14.2927 8.44449H12.7927C12.7927 11.0903 10.6202 13.25 7.9219 13.25V14.75ZM14.2927 8.44449V7.33337H12.7927V8.44449H14.2927ZM13.0155 6.79996L11.8913 7.91107L12.9458 8.9779L14.0699 7.86679L13.0155 6.79996ZM13.0155 7.86679L14.1396 8.9779L15.1941 7.91107L14.0699 6.79996L13.0155 7.86679ZM2.48163 11.7273C3.60082 13.5408 5.62007 14.75 7.9219 14.75V13.25C6.15627 13.25 4.61261 12.3241 3.75812 10.9395L2.48163 11.7273Z"
                                            fill=""
                                        />
                                    </svg>
                                    Recently Viewed
                                </a>
                            </li> */}

                            <li className="py-4">
                                <Link
                                    href="/wishlist"
                                    className="flex items-center gap-1.5 font-medium text-custom-sm text-dark hover:text-blue"
                                >
                                    <svg
                                        className="fill-current"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M5.97441 12.6073L6.43872 12.0183L5.97441 12.6073ZM7.99992 3.66709L7.45955 4.18719C7.60094 4.33408 7.79604 4.41709 7.99992 4.41709C8.2038 4.41709 8.3989 4.33408 8.54028 4.18719L7.99992 3.66709ZM10.0254 12.6073L10.4897 13.1962L10.0254 12.6073ZM6.43872 12.0183C5.41345 11.21 4.33627 10.4524 3.47904 9.48717C2.64752 8.55085 2.08325 7.47831 2.08325 6.0914H0.583252C0.583252 7.94644 1.3588 9.35867 2.35747 10.4832C3.33043 11.5788 4.57383 12.4582 5.51009 13.1962L6.43872 12.0183ZM2.08325 6.0914C2.08325 4.75102 2.84027 3.63995 3.85342 3.17683C4.81929 2.73533 6.15155 2.82823 7.45955 4.18719L8.54028 3.14699C6.84839 1.38917 4.84732 1.07324 3.22983 1.8126C1.65962 2.53035 0.583252 4.18982 0.583252 6.0914H2.08325ZM5.51009 13.1962C5.84928 13.4636 6.22932 13.7618 6.61834 13.9891C7.00711 14.2163 7.47619 14.4167 7.99992 14.4167V12.9167C7.85698 12.9167 7.65939 12.8601 7.37512 12.694C7.0911 12.5281 6.79171 12.2965 6.43872 12.0183L5.51009 13.1962ZM10.4897 13.1962C11.426 12.4582 12.6694 11.5788 13.6424 10.4832C14.641 9.35867 15.4166 7.94644 15.4166 6.0914H13.9166C13.9166 7.47831 13.3523 8.55085 12.5208 9.48717C11.6636 10.4524 10.5864 11.21 9.56112 12.0183L10.4897 13.1962ZM15.4166 6.0914C15.4166 4.18982 14.3402 2.53035 12.77 1.8126C11.1525 1.07324 9.15145 1.38917 7.45955 3.14699L8.54028 4.18719C9.84828 2.82823 11.1805 2.73533 12.1464 3.17683C13.1596 3.63995 13.9166 4.75102 13.9166 6.0914H15.4166ZM9.56112 12.0183C9.20813 12.2965 8.90874 12.5281 8.62471 12.694C8.34044 12.8601 8.14285 12.9167 7.99992 12.9167V14.4167C8.52365 14.4167 8.99273 14.2163 9.3815 13.9891C9.77052 13.7618 10.1506 13.4636 10.4897 13.1962L9.56112 12.0183Z"
                                            fill=""
                                        />
                                    </svg>
                                    Wishlist
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {/* <!--=== Nav Right End ===--> */}
                </div>
            </div>
        </div>
    );
}

const Header = () => {
    
    const [navigationOpen, setNavigationOpen] = useState(false);
    const [stickyMenu, setStickyMenu] = useState(false);

    

    // Sticky menu
    const handleStickyMenu = () => {
        if (window.scrollY >= 80) {
            setStickyMenu(true);
        } else {
            setStickyMenu(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleStickyMenu);
    });

    return (
        <header
            className={`fixed left-0 top-0 w-full z-9999 bg-white transition-all ease-in-out duration-300 ${
                stickyMenu && "shadow"
            }`}
        >
            <HeaderTop
              stickyMenu={stickyMenu}
              navigationOpen={navigationOpen}
              setNavigationOpen={setNavigationOpen}
            />
            <HeaderNavigation
              navigationOpen={navigationOpen}
              stickyMenu={stickyMenu}
            />
        </header>
    );
};

export default Header;
