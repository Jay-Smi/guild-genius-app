"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { SquareX } from "lucide-react";

export const Notification = () => {
    const path = usePathname();

    const router = useRouter();

    const [open, setOpen] = useState<boolean>(true);

    const [isClient, setIsClient] = useState<boolean>(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    const href = window?.location.href;

    const { error, error_description, error_code } = getSearchParams(href);

    const handleClose = () => {
        setOpen(false);
        router.push(path);
    };

    if (error && open && typeof window !== "undefined") {
        return (
            <div className="w-full h-[50px] bg-red-500/20 border border-destructive flex justify-between items-center px-4">
                <span>{error_description}</span>

                <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-inherit"
                    onClick={handleClose}
                >
                    <SquareX className="h-full w-full" />
                </Button>
            </div>
        );
    }
    return null;

    function getSearchParams(url: string): Record<string, string> {
        const params: Record<string, string> = {};
        const queryString = url.split("#")[1];
        if (queryString) {
            const keyValuePairs = queryString.split("&");
            keyValuePairs.forEach((keyValue) => {
                const [key, value] = keyValue.split("=");
                params[key] = decodeURIComponent(value.replace(/\+/g, " "));
            });
        }
        return params;
    }
};
