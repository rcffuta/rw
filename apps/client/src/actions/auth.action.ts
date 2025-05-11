"use server"

import { CreateAccountFormData } from "@/lib/validators/auth.validator";
import { isEmpty } from "@/utils/functions";
import { authenticateUser, createUser } from "@gamezone/db/actions";


export async function loginUser(email:string, password:string) {
    const user = await authenticateUser(email, password)
    if (isEmpty(user)) {
        throw new Error("Account not found!");
    }

    return user;
}

export async function createAccount(data: CreateAccountFormData) {
    const user = await createUser(data)
    if (isEmpty(user)) {
        throw new Error("Account not found!");
    }

    return user;
}