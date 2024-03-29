"use client";

import { createBrowserClient } from "@/lib/supabase/clients/browser-client";
import { Button } from "@/components/ui/button";

const getURL = () => {
    let url =
        process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
        process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
        "http://localhost:3000/";
    // Make sure to include `https://` when not localhost.
    url = url.includes("http") ? url : `https://${url}`;
    // Make sure to include a trailing `/`.
    url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
    return url;
};

export const SignInButton = () => {
    const supabase = createBrowserClient();

    const handleSignIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "discord",
            options: {
                redirectTo: `${getURL()}/api/auth/callback`,
                scopes: "identify email guilds guilds.members.read",
            },
        });
    };
    return <Button onClick={handleSignIn}>Login</Button>;
};
