
import { UserItem } from "@willo/db";
import { wait } from "@willo/lib";
import { makeAutoObservable } from "mobx";

type User = UserItem;

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
        await wait(2);
        

        

        this.clearUser();
        
        
    }

    get isAuthenticated() {
        return !!this.user;
    }
}

const authStore = new AuthStore();
export default authStore;