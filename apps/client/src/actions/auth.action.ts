"use server"

import { CreateAccountFormData } from "@/lib/validators/auth.validator";
import { authenticateUser, createUser } from "@gamezone/db/actions";
import { isEmpty } from "@gamezone/lib";


export async function loginUser(email:string, password:string) {
    const user = await authenticateUser(email, password)
    if (isEmpty(user)) {
        throw new Error("Account not found!");
    }

    // const token = signToken({ userId: user.id, role: user.isAdmin ? "admin":"user" });

    // (await cookies()).set(AUTH_KEY, token, {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: 'lax',
    //     domain: '.gamezone.com',
    //     path: '/',
    //     maxAge: 60 * 60 * 24 * 7,
    // });

    return user;
}

export async function createAccount(data: CreateAccountFormData) {
    const user = await createUser(data)
    if (isEmpty(user)) {
        throw new Error("Account not found!");
    }

    return user;
}