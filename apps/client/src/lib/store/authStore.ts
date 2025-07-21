
import { autoLoginMember, MemberObject, wait } from "@rcffuta/ict-lib";
import { makeAutoObservable } from "mobx";

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


        // const dt = await autoLoginMember();
        await wait(5);
        this.loading = false;

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