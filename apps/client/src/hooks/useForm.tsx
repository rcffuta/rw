
import { useState } from "react";
import { useNavigate } from "@gamezone/lib";
import { authenticateUser, createUser } from "@gamezone/db";
import toast, { ToastOptions } from "react-hot-toast";
import { useAccountContext } from "@/context/AccountContext";
import { validateCreateAccountData, validateLoginData } from "@/utils/validators";
import { OrderForm, UserAccount, UserAccountForm, ValidationErrors } from "@/types/form";
import { isEmpty, wait } from "@/utils/functions";


export function useContactForm<T>(intitialData: T = {} as T) {
    const [errors, setErrors] = useState<T>(intitialData);

    const [loading, setLoading] = useState(false);

    const { navigate } = useNavigate();

    const handleSubmitContactForm = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        await toast.promise(
            wait(5),
            {
                loading: "Logging in",
                success: (data) => {
                    setLoading(false);
                    return "You're Authenticated!";
                },
                error: (err) => `Could not authenticate you`,
            },
            {
                // style: {
                //     minWidth: "250px",
                // },
                success: {
                    duration: 3500,
                    // icon: "🔥",
                },
            }
        );

        setTimeout(() => {}, 7000);
        navigate("/");
    };
    return {
        handleSubmitContactForm,
        loading,
        errors
    }
}


export function useAuthForm<T>(intitialData: T= {} as T) {
    // const { updateUser, findUser, user, } = useAccountContext();
    const [errors, setErrors] = useState<ValidationErrors<T>>({});
    const [loading, setLoading] = useState(false);

    // const [data, setData] = useState<>({})

    const {navigate} = useNavigate();


    function resolveData(e: React.FormEvent, withShipping=false): OrderForm {
        const formData = new FormData(e.currentTarget as HTMLFormElement);

        const firstname = formData.get("firstname") as string;
        const lastname = formData.get("lastname") as string;
        const company = formData.get("company") as string;
        const country = formData.get("country") as string;
        const address = formData.get("address") as string;
        const city = formData.get("city") as string;
        const contact = formData.get("contact") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const rePassword = formData.get("re-type-password") as string;


        const dt = {
            firstname,
            lastname,
            company,
            country,
            address,
            city,
            contact,
            email,
            password,
            rePassword,
        };

        if (!withShipping) return dt;



        const shipingcountry = formData.get("shipping:country") as string;
        const shippingaddress = formData.get("shipping:address") as string;
        const shippingcity = formData.get("shipping:city") as string;
        const shippingcontact = formData.get("shipping:contact") as string;

        return {
            ...dt,
            shipping: {
                country: shipingcountry,
                address: shippingaddress,
                city: shippingcity,
                contact: shippingcontact,
            },
        };
    }

    const handleCreateAccount = async (e: React.FormEvent, simple=true) => {
        e.preventDefault();

        const toastID = "authInId";
        setLoading(true);
        toast.loading("Creating account", { id: toastID });

        const data = resolveData(e);

        // const _errors = validateLoginData(data);

        // console.debug(data);

        // const rest = await performUpdateUser(data, false, {
        //     errorMsg: "Could not Create account",
        //     loadingMsg: "Creating account...",
        //     successMsg: "Created account",
        //     duration: 4000,
        //     id: "authToastId"
        // });

        // TODO: Validate data

        createUser({
            name: data.firstname,
            email: data.email,
            password: data.password,
        })
            .then((user) => {
                if (isEmpty(user)) {
                    throw new Error("Account not found!");
                }

                toast.success("Your account has been created!", {
                    id: toastID,
                    duration: 3500,
                });

                // updateUser(user);

                if (simple) return;

                setTimeout(() => {
                    navigate("/", { toRedirect: true, replace: true });
                }, 1000);
            })
            .catch((error) => {
                console.error(error);
                toast.error(error.message || "Could not create accout", {
                    id: toastID,
                });
            })
            .finally(() => setLoading(false));
    };


    const handleLogin = async (e: React.FormEvent, simple=false) => {

        e.preventDefault();
    
        setLoading(true);
        const toastID = "authInId";

        toast.loading("Logging in", { id: toastID });

        const data = resolveData(e);

        const _errors = validateLoginData(data);

        const {email, password} = data;


        if (!isEmpty(_errors)) {
            // console.debug(JSON.stringify(_errors));
            setErrors(() => _errors as any);
            toast.error("Could not authenticate you", { id: toastID });
            setLoading(false);
            return;
        }

        authenticateUser(email, password)
        .then((user)=>{
            if (isEmpty(user)) {
                throw new Error("Account not found!");
            }

            

            // updateUser(user);

            if (simple) return;

            setTimeout(() => {
                navigate("/", { toRedirect: true, replace: true });
            }, 1000);
        })
        .catch((err)=>{
            console.error(err);
            toast.error(err.message || "Could not authenticate you", {
                id: toastID,
            });
        })
        .finally(()=>setLoading(false));

    };

    return {
        errors,
        loading,
        handleLogin,
        handleCreateAccount,
        resolveData,
        // user,
    };
}
