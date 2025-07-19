"use client";
import InputField, { FormError } from "@/components/Common/Form/InputField";
import { useNavigate } from "@rw/shared";
import Link from "next/link";
import { FormWrapper } from "../../Common/Form/FormUtils";
import { registerSchema } from "@/lib/validators/auth.validator";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAccount } from "@/actions/auth.action";
import toast from "react-hot-toast";
import authStore from "@/lib/store/authStore";
import { observer } from "mobx-react-lite";

type FormData = z.infer<typeof registerSchema>;


function SignUpForm() {
    const toastID = "authInId";

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting:loading },
    } = useForm<FormData>({
        resolver: zodResolver(registerSchema),
    });

    const { makeRedirectUrl, navigate } = useNavigate();

    const onSubmit = async (data: FormData) => {

        try {
            const user = await createAccount(data);

            authStore.updateUser(user);

            toast.success("Your account has been created!", {
                id: toastID,
                duration: 3500,
            });

            setTimeout(() => {
                navigate("/", { toRedirect: true, replace: true });
            }, 1000);
        } catch (err) {
            console.error("Accout was not created:", err);
            toast.error("Accout was not created", {
                id: toastID,
            });
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormError error={errors.root?.message} />
            {/* <FormWrapper>
                <InputField
                    className="w-full"
                    label="First Name"
                    placeholder="e.g John"
                    type="text"
                    error={errors.firstname?.message}
                    {...register("firstname")}
                    required
                />

                <InputField
                    className="w-full"
                    label="Last Name"
                    placeholder="e.g Fumise"
                    type="text"
                    error={errors.lastname?.message}
                    {...register("lastname")}
                    required
                />
            </FormWrapper> */}

            <InputField
                // className="m"
                label="Username"
                placeholder=""
                type="text"
                required
                error={errors.username?.message}
                {...register("username")}
            />

            <InputField
                // className="m"
                label="Email"
                name="email"
                placeholder=""
                type="email"
                required
                error={errors.email?.message}
                {...register("email")}
            />

            {/* <FormWrapper> */}
            <InputField
                // className="w-full"
                label="Phone Number"
                placeholder=""
                type="tel"
                required
                error={errors.phoneNumber?.message}
                {...register("phoneNumber")}
            />

            {/* </FormWrapper> */}

            <FormWrapper>
                <InputField
                    className="w-full"
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    error={errors.password?.message}
                    {...register("password")}
                    required
                />

                <InputField
                    className="w-full"
                    label="Re-type Password"
                    type="password"
                    placeholder="Re-type your password"
                    error={errors.confirmPassword?.message}
                    {...register("confirmPassword")}
                    required
                />
            </FormWrapper>

            <button
                type="submit"
                className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg ease-out duration-200 hover:bg-blue mt-7.5"
                disabled={loading}
            >
                {loading ? "Loading..." : "Create Account"}
            </button>

            <p className="text-center mt-6">
                Already have an account?
                <Link
                    href={makeRedirectUrl("/signin")}
                    className="text-dark ease-out duration-200 hover:text-blue pl-2"
                >
                    Sign in Now
                </Link>
            </p>
        </form>
    );
}

export default observer(SignUpForm);
