
import { autoLoginMember, findMemberById, findUnderGraduates, getMemberFromStoredToken, MemberObject, wait } from "@rcffuta/ict-lib";
import { makeAutoObservable } from "mobx";
import { CheckoutFormData } from "../validators/checkout.validator";
import toast from "react-hot-toast";

type User = MemberObject;

class AuthStore {
    user: User = null;

    loading = false;

    constructor() {
        makeAutoObservable(this); 
    }

    updateUser(user: User) {
        this.user = user;
    }

    clearUser() {
        this.user = null;
    }

    async authenticate() {

        if (this.loading) return;

        this.loading = true;

        const {
            success,
            data
        } = await getMemberFromStoredToken();


        if (success) {
            this.user = data;
            toast.success("Authenticated you from ICT")
        }

        this.loading = false;

    }


    async authenticateDetails(data: CheckoutFormData) {
        const {success, data:undergraduates} = await findUnderGraduates();

        if (!success) return null

        const member = undergraduates.find(e=>e.email === data.email);

        if (!member) return null;


        toast.success("Found your information");

        await autoLoginMember({member})
    }

    async logout() {
        await wait(2);

        this.clearUser();
        
        
    }

    get isAuthenticated() {
        return !!this.user;
    }
}

const authStore = new AuthStore();
export default authStore;