"use server"

import { CreateAccountFormData } from "@/lib/validators/auth.validator";
import { isEmpty } from "@rw/shared";


export async function loginUser(email:string, password:string) {
    const user = null // await authenticateUser(email, password)
    if (isEmpty(user)) {
        return {
            success: false,
            message:  "Account not found!",
            data: null,
        }
    }

    const token = ""
    // await createSession({
    //     email: user.email,
    //     isAdmin: user.isAdmin,
    //     userId: user.id,
    //     username: user.username,
    // })

    return {success: true, message: "You're Authenticated!", data: {user, token}};
}

export async function createAccount(data: CreateAccountFormData) {
    const user = null //await createUser(data)
    if (isEmpty(user)) {
        throw new Error("Account not found!");
    }

    return user;
}