import { wait } from "@/utils/functions";
import { User } from "@gamezone/db";
import { makeAutoObservable } from "mobx";
import toast from "react-hot-toast";

class AuthStore {
    user: User = null;

    constructor() {
        makeAutoObservable(this);
    }

    updateUser(user: User) {
        this.user = user;
    }

    clearUser() {
        this.user = null;
    }

    async logout() {
        wait(2);
        

        

        this.clearUser();
        
        
    }

    get isAuthenticated() {
        return !!this.user;
    }
}

const authStore = new AuthStore();
export default authStore;