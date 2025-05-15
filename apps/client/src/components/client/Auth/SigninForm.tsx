"use client";

import InputField, { FormError } from "@/components/Common/Form/InputField";
import { useNavigate } from "@gamezone/lib";
import Link from "next/link";
import { z } from "zod";
import { loginSchema } from "@/lib/validators/auth.validator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {loginUser} from "@/actions/auth.action";
import toast from "react-hot-toast";
import { observer } from "mobx-react-lite";
import authStore from "@/lib/store/authStore";


type FormData = z.infer<typeof loginSchema>;

function SignInForm() {
    // const { updateUser } = useAccountContext();
    const toastID = "authInId";

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting:loading },
    } = useForm<FormData>({
        resolver: zodResolver(loginSchema),
    });

    const {makeRedirectUrl, navigate} = useNavigate();


    const onSubmit = async (data: FormData) => {

        try {
            const {token, user} = await loginUser(data.email, data.password);

            authStore.updateUser(user);

            toast.success("You're Authenticated!", {
                id: toastID,
                duration: 3500,
            });

            setTimeout(() => {
                navigate("/", { toRedirect: true, replace: true });
            }, 1000);
        } catch (err) {
            console.error("Login failed:", err);
            toast.error(err.message || "Could not authenticate you", {
                id: toastID,
            });
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormError error={errors.root?.message}/>
                <InputField
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    error={errors.email?.message}
                    required
                    {...register("email")}
                />
                <InputField
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    {...register("password")}
                    error={errors.password?.message}
                    required
                />

                <button
                    type="submit"
                    className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg ease-out duration-200 hover:bg-blue mt-7.5"
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Sign in to account"}
                </button>

                <a
                    href="#"
                    className="block text-center text-dark-4 mt-4.5 ease-out duration-200 hover:text-dark"
                >
                    Forget your password?
                </a>
            </form>

            {/* <div></div> */}

            {/* <OAuth /> */}

            <p className="text-center mt-6">
                Don&apos;t have an account?
                <Link
                    href={makeRedirectUrl("/signup")}
                    className="text-dark ease-out duration-200 hover:text-blue pl-2"
                >
                    Sign Up Now!
                </Link>
            </p>
        </div>
    );
}


export default observer(SignInForm);
