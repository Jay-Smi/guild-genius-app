"use server";

import { cookies } from "next/headers";

export const deleteCookie = async () => {
    const cookieStore = cookies();
    cookieStore.set("oauth_provider_token", "", {
        maxAge: 0,
        path: "/",
    });
};
