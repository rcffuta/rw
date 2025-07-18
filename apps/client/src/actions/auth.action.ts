"use server"

import { CreateAccountFormData } from "@/lib/validators/auth.validator";
import { authenticateUser, createUser } from "@willo/db";
import { isEmpty } from "@willo/lib";
import { createSession } from "@willo/auth";


export async function loginUser(email:string, password:string) {
    const user = await authenticateUser(email, password)
    if (isEmpty(user)) {
        return {
            success: false,
            message:  "Account not found!",
            data: null,
        }
    }

    const token = await createSession({
        email: user.email,
        isAdmin: user.isAdmin,
        userId: user.id,
        username: user.username,
    })

    return {success: true, message: "You're Authenticated!", data: {user, token}};
}

export async function createAccount(data: CreateAccountFormData) {
    const user = await createUser(data)
    if (isEmpty(user)) {
        throw new Error("Account not found!");
    }

    return user;
}