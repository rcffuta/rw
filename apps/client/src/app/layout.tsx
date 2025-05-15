import "../styles/css/euclid-circular-a-font.css";
import "../styles/css/style.css";

import QuickViewModal from "@/components/Common/QuickViewModal";
import CartSidebarModal from "@/components/client/Cart/CartSidebarModal";
import PreviewSliderModal from "@/components/client/Shop/ProductPreviewSlider";

import ScrollToTop from "@/components/Common/ScrollToTop";
import LayoutLoader from "@/Layout/LayoutLoader";
import { Toaster } from "react-hot-toast";
import { CartModalProvider } from "../context/CartSidebarModalContext";
import { ModalProvider } from "../context/QuickViewModalContext";
import { PreviewSliderProvider } from "../context/PreviewSliderContext";
import Footer from "@/components/Common/Footer";
import { AccountContextProvider } from "@/context/AccountContext";
import { Metadata } from "next";
import { APP_DESCRIPTION, APP_NAME } from "@gamezone/lib";

export const metadata: Metadata = {
    title: APP_NAME,
    description:APP_DESCRIPTION,
    // other metadata
};

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html>
            <body>
                <LayoutLoader>
                    <AccountContextProvider>
                        <CartModalProvider>
                            <ModalProvider>
                                <PreviewSliderProvider>
                                    {children}

                                    <QuickViewModal />
                                    <CartSidebarModal />
                                    <PreviewSliderModal />
                                </PreviewSliderProvider>
                            </ModalProvider>
                        </CartModalProvider>
                    </AccountContextProvider>
                    <ScrollToTop />
                    <Toaster />
                    <Footer />
                </LayoutLoader>
            </body>
        </html>
    );
}
