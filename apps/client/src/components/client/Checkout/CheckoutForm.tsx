"use client";

import TextareaField from "@/components/Common/Form/TextareaField";
import Login from "./Login";
import Shipping from "./Shipping";
import { observer } from "mobx-react-lite";
import authStore from "@/lib/store/authStore";
import { FieldErrors, useForm, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { CheckoutFormData, checkoutSchema } from "@/lib/validators/checkout.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormWrapper } from "@/components/Common/Form/FormUtils";
import InputField, { FormError } from "@/components/Common/Form/InputField";
import toast, { ToastOptions } from "react-hot-toast";

import { checkoutAction } from "@/actions/checkout";
import cartStore from "@/lib/store/cartStore";
import { wait } from "@rw/shared";
import { Order } from "@rcffuta/ict-lib";

type CheckoutFormProps = {
    register: UseFormRegister<CheckoutFormData>
    // handleSubmit: UseFormHandleSubmit<CheckoutFormData, CheckoutFormData>
    errors: FieldErrors<CheckoutFormData>;
}


function CheckoutForm({ register, errors }: CheckoutFormProps) {
   

    

    return (
        <section className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5">
            {/* <Login /> */}

            <h2 className="font-medium text-dark text-xl sm:text-2xl mb-5.5">Billing details</h2>

            <div
                
                // onSubmit={handleSubmit(onSubmit)}
                // id="checkout-form"
                className="border-t border-gray-3"
            >
                {/* <!-- billing details --> */}
                {/* <Billing errors={{}} /> */}
                <br />

                <FormError error={errors.root?.message} />
                <FormWrapper>
                    <InputField
                        type="text"
                        className="w-full"
                        label="First Name"
                        placeholder="e.g John"
                        error={errors.firstname?.message}
                        required
                        {...register('firstname')}
                    />

                    <InputField
                        type="text"
                        className="w-full"
                        label="Last Name"
                        placeholder="e.g Fumise"
                        error={errors.lastname?.message}
                        required
                        {...register('lastname')}
                    />
                </FormWrapper>

                <InputField
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    // className="w-full"
                    error={errors.email?.message}
                    required
                    {...register('email')}
                />

                <InputField
                    type="tel"
                    // className="w-full"
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    error={errors.phoneNumber?.message}
                    required
                    {...register('phoneNumber')}
                />

                {/* <InputField
                    type="text"
                    label="Address"
                    name="address"
                    placeholder="Enter your location"
                    error={errors.address?.message}
                    required
                    {...register("address")}
                /> */}

                {/* <!-- address box two --> */}
                {/* <Shipping errors={{}} /> */}
                {/* <TextareaField
                    label="Other Notes (optional)"
                    name="notes"
                    placeholder="Notes about your order, e.g. speacial notes for delivery."
                    onChange={(e) => {}} //handleNote(e.target.value)}
                /> */}
            </div>

            {/* <!-- others note box --> */}
        </section>
    )
}

export default observer(CheckoutForm);
