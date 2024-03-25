"use client";

import { createBrowserClient } from "@/lib/supabase/clients/browser-client";
import { Button } from "@/components/ui/button";

export const SignInButton = () => {
    const supabase = createBrowserClient();

    const handleSignIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "discord",
            options: {
                redirectTo: `${window.location.origin}/api/auth/callback`,
                scopes: "identify email guilds guilds.members.read",
            },
        });
    };
    return <Button onClick={handleSignIn}>Login</Button>;
};
