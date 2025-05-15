"use client";

export function useAuthenticatedUser() {
    return {
        user: {
            userId: 1,
            username: "Fumise",
            isAdmin: true,
            email: "johnajagbe@gmail.com",
        },
    };
}