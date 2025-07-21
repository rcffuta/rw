
import React from "react";

import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Orders from "@/components/client/Account/Orders";
import AccountDashboard from "@/components/client/Account/Dashboard";
import AccountDownloads from "@/components/client/Account/Downloads";
import AccountAddress from "@/components/client/Account/Address";
import AccountDetails from "@/components/client/Account/Details";
import AccountMenu from "@/components/client/Account/AccountMenu";
import EnsureAuth from "@/components/Common/EnsureAuth";
import { APP_NAME } from "@rw/shared";


export const metadata: Metadata = {
    title: `My Account | ${APP_NAME}`,
    description: `Your space on ${APP_NAME}`,
    // other metadata
};

const MyAccountPage = () => {
    
    return (
        <main>
            <EnsureAuth>

                <Breadcrumb title={"My Account"} pages={[]} />

                <section className="overflow-hidden py-20 bg-gray-2">
                    <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
                        <div className="flex flex-col xl:flex-row gap-7.5">
                            {/* <!--== user dashboard menu start ==--> */}
                            <AccountMenu/>
                            {/* <!--== user dashboard menu end ==-->

                
                            <!--== user dashboard content start ==--> */}
                                {/* <!-- dashboard tab content start --> */}
                                <AccountDashboard/>
                                
                                {/* <!-- dashboard tab content end -->

                                <!-- orders tab content start --> */}
                                    <Orders />
                                {/* <!-- orders tab content end -->

                                <!-- downloads tab content start --> */}
                                <AccountDownloads/>
                                {/* <!-- downloads tab content end -->

                                <!-- addresses tab content start --> */}
                                <AccountAddress/>
                                {/* <!-- addresses tab content end -->

                                <!-- details tab content start --> */}
                                <AccountDetails/>
                                {/* <!-- details tab content end -->
                            <!--== user dashboard content end ==--> */}

                        </div>
                    </div>
                </section>
            </EnsureAuth>

            
        </main>
    );
};

export default MyAccountPage;
