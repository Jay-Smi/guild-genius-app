"use client";

import { createBrowserClient } from "@/lib/supabase/clients/browser-client";
import { redirect, useRouter } from "next/navigation";
import { Button, ButtonProps } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { deleteCookie } from "@/actions/delete-cookie";

export const SignOutButton = ({ variant = "default" }: ButtonProps) => {
    const router = useRouter();

    const handleSignOut = async () => {
        const supabase = createBrowserClient();

        await deleteCookie();

        await supabase.auth.signOut();

        router.push("/");
        router.refresh();
    };

    return (
        <Button
            onClick={handleSignOut}
            variant={variant}
            className="flex justify-start"
        >
            <LogOut className="w-6 h-6" />
            <span className="ml-2">Logout</span>
        </Button>
    );
};
