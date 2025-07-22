"use client";

import { zodResolver } from '@hookform/resolvers/zod'

import { observer } from "mobx-react-lite";
import { FieldErrors, useForm, UseFormRegister } from "react-hook-form";
import { CheckoutFormData, checkoutSchema } from "@/lib/validators/checkout.validator";
import { FormWrapper } from "@/components/Common/Form/FormUtils";
import InputField, { FormError } from "@/components/Common/Form/InputField";
import toast, { ToastOptions } from "react-hot-toast";
import { cartStore, persistOrder } from "@/lib/store/cart-utils";
import OrderSummary from '../Cart/OrderSummary';


type CheckoutFormProps = {
    // register: UseFormRegister<CheckoutFormData>
    // // handleSubmit: UseFormHandleSubmit<CheckoutFormData, CheckoutFormData>
    // errors: FieldErrors<CheckoutFormData>;
}



const toastConfig: ToastOptions = {
    id: 'checkOutToast',
    duration: 5000,
}


function CheckoutForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting: loading },
    } = useForm<CheckoutFormData>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            email: '',
            phoneNumber: '',
        },
    })

    const onSubmit = async (data: CheckoutFormData) => {
         toast.loading('Processing your order...', { ...toastConfig, duration: 0 })

            try {
                // cartStore.billing = data;

                await persistOrder(cartStore, data)

                toast.dismiss(toastConfig.id)
            } catch (err) {
             console.error('Checkout Error:', err)
             toast.error(err.message, toastConfig)
         }
     }
    

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col lg:flex-row gap-7.5 xl:gap-11 mt-9"
        >
            {/* <PaymentDetails order={order}/> */}
            <section className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5">
                {/* <Login /> */}

                <h2 className="font-medium text-dark text-xl sm:text-2xl mb-5.5">
                    Billing details
                </h2>

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
                </div>

                {/* <!-- others note box --> */}
            </section>
            <OrderSummary />
        </form>
    )
}

export default observer(CheckoutForm);
