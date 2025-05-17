import ContactForm from "@/components/client/Contact/ContactForm";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { EmailIcon, LocationIcon, PhoneIcon, UserIcon } from "@/components/Common/Icons";
import { APP_ADMIN_ADDRESS, APP_ADMIN_CONTACT, APP_ADMIN_EMAIL, APP_ADMIN_USERNAME, APP_NAME } from "@gamezone/lib";

import { Metadata } from "next";
export const metadata: Metadata = {
    title: `Contact | ${APP_NAME}`,
    description: "Send us a mesasge",
    // other metadata
};

const ContactPage = () => {
  return (
      <main>
          <Breadcrumb title={"Contact"} pages={["contact"]} />
          <section className="overflow-hidden py-20 bg-gray-2">
              <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
                  <div className="flex flex-col xl:flex-row gap-7.5">
                      <div className="xl:max-w-[370px] w-full bg-white rounded-xl shadow-1">
                          <div className="py-5 px-4 sm:px-7.5 border-b border-gray-3">
                              <p className="font-medium text-xl text-dark">
                                  Contact Information
                              </p>
                          </div>

                          <div className="p-4 sm:p-7.5">
                              <div className="flex flex-col gap-4">
                                  <p className="flex items-center gap-4">
                                      <UserIcon />
                                      Name: {APP_ADMIN_USERNAME}
                                  </p>
                                  <p className="flex items-center gap-4">
                                      <EmailIcon />
                                      Email: {APP_ADMIN_EMAIL}
                                  </p>

                                  <p className="flex items-center gap-4">
                                      <PhoneIcon />
                                      Phone: {APP_ADMIN_CONTACT}
                                  </p>

                                  <p className="flex gap-4">
                                      <LocationIcon />
                                      Address: {APP_ADMIN_ADDRESS}
                                  </p>
                              </div>
                          </div>
                      </div>

                      <div className="xl:max-w-[770px] w-full bg-white rounded-xl shadow-1 p-4 sm:p-7.5 xl:p-10">
                          <ContactForm />
                      </div>
                  </div>
              </div>
          </section>
      </main>
  );
};

export default ContactPage;
