"use server"

import { CreateAccountFormData } from "@/lib/validators/auth.validator";
import { authenticateUser, createUser } from "@gamezone/db";
import { isEmpty } from "@gamezone/lib";
import { createSession } from "@gamezone/auth";


export async function loginUser(email:string, password:string) {
    const user = await authenticateUser(email, password)
    if (isEmpty(user)) {
        throw new Error("Account not found!");
    }

    const token = await createSession({
        email: user.email,
        isAdmin: user.isAdmin,
        userId: user.id,
        username: user.username,
    })

    return {user, token};
}

export async function createAccount(data: CreateAccountFormData) {
    const user = await createUser(data)
    if (isEmpty(user)) {
        throw new Error("Account not found!");
    }

    return user;
}