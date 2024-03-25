import Link from "next/link";
import { Button } from "@/components/ui/button";

import { getSession } from "@/lib/supabase/session";
import { SignInButton } from "./auth/sign-in-button";

export const Hero = async () => {
    const session = await getSession();

    return (
        <section className="flex flex-col items-center  space-y-6">
            <h1 className="font-semibold text-6xl flex flex-col md:flex-row gap-y-6 gap-x-2 items-center justify-center text-center">
                {session ? "Continue" : "Sign in"} with
                <span className="font-semibold text-6xl text-primary underline">
                    Discord
                </span>
            </h1>

            {session ? (
                <Link href="/dashboard">
                    <Button size="lg">Continue to dashboard</Button>
                </Link>
            ) : (
                <SignInButton />
            )}
        </section>
    );
};
