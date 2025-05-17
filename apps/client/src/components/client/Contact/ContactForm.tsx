"use client";

import { FormWrapper } from "@/components/Common/Form/FormUtils";
import InputField, { FormError } from "@/components/Common/Form/InputField";
import TextareaField from "@/components/Common/Form/TextareaField";
import { ContactFormData, contactSchema } from "@/lib/validators/contact.validator";
import { wait } from "@gamezone/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ContactForm() {

    const toastID = "contactToast";

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting: loading },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });


    const onSubmit = async (data: ContactFormData) => {
        try {
            // TODO: Send message login here
            // toast.success("Your message was sent!", {
            //     id: toastID,
            //     duration: 3500,
            // });

            await wait(0.9);
            throw new Error("Not Implemented!");
        } catch (err) {
            console.error(err);
            toast.error("Could not send your message", {
                id: toastID,
            });
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormError error={errors.root?.message} />

            <FormWrapper>
                <InputField
                    className="w-full"
                    label="First name"
                    type="text"
                    placeholder="Enter your first name"
                    error={errors.firstname?.message}
                    {...register("firstname")}
                    required
                />

                <InputField
                    className="w-full"
                    label="Last name"
                    type="text"
                    placeholder="Enter your last name"
                    error={errors.lastname?.message}
                    {...register("lastname")}
                    required
                />
            </FormWrapper>

            <FormWrapper>
                <InputField
                    className="w-full"
                    label="Subject"
                    type="text"
                    placeholder="Enter as haedline for your message"
                    error={errors.subject?.message}
                    {...register("subject")}
                    // required
                />

                <InputField
                    className="w-full"
                    label="Email address"
                    type="email"
                    placeholder="Enter your email address"
                    error={errors.email?.message}
                    {...register("email")}
                    required
                />
            </FormWrapper>

            <TextareaField
                label="Message"
                name="message"
                placeholder="Enter your message"
                error={errors.message?.message}
                {...register("message")}
                required
                // className=""
            />

            <br/>
            <button
                type="submit"
                disabled={loading}
                className="inline-flex font-medium text-white bg-blue py-3 px-7 rounded-md ease-out duration-200 hover:bg-blue-dark"
            >
                {loading ? "Sending..." :"Send Message"}
            </button>
        </form>
    );
}
