"use client";
import { useNavigate } from "@gamezone/lib";
import { createContext, PropsWithChildren, useContext } from "react";
import toast from "react-hot-toast";
import authStore from "@/lib/store/authStore";


type AccountContextProps = {
    logout: VoidFunction;
};

const AccountContext = createContext<AccountContextProps>(null);


export function useAccountContext() {

    const context = useContext(AccountContext);

    if (!context) throw new Error("useAccountContext not in AccountContextProvider!");

    return context;
}


export function AccountContextProvider(props: PropsWithChildren) {

    const {navigate} = useNavigate()

    const logout = async () => {

        const toastId = "logoutToast";
        toast.loading("Logging Out", { id: toastId, duration: 3500 });

        await authStore.logout();

        toast.loading("Loged Out", { id: toastId, duration: 3500 });

        setTimeout(() => {
            navigate("/signin");
        }, 1500);
    };

    const contextValue: AccountContextProps = {
        logout,
    };

    return (
        <AccountContext.Provider value={contextValue}>
            {props.children}
        </AccountContext.Provider>
    )
}
