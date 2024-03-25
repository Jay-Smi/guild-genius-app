import { createServerClient } from "@/lib/supabase/clients/server-client";
import { SignOutButton } from "./sign-out-button";
import { SignInButton } from "./sign-in-button";
import { getSession } from "@/lib/supabase/session";

export default async function AuthButtonServer() {
    const session = await getSession();

    return session ? <SignOutButton /> : <SignInButton />;
}
