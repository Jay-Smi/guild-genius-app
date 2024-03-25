"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export const ThemeSwitch = ({ variant }: { variant?: "full" }) => {
    const [mounted, setMounted] = useState(false);

    const { setTheme, resolvedTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    if (!mounted)
        return (
            <Image
                src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
                width={24}
                height={24}
                sizes="24x24"
                alt="Loading Light/Dark Toggle"
                priority={false}
                title="Loading Light/Dark Toggle"
                className="h-[24px] w-[24px]"
            />
        );

    if (resolvedTheme === "dark") {
        return (
            <Button
                size={variant === "full" ? "default" : "icon"}
                variant="ghost"
                onClick={() => setTheme("light")}
                className={cn(
                    variant === "full" && "flex justify-start w-full"
                )}
            >
                <Sun className="h-6 w-6" />
                {variant === "full" && <span className="ml-2">Light mode</span>}
            </Button>
        );
    }

    if (resolvedTheme === "light") {
        return (
            <Button
                size={variant === "full" ? "default" : "icon"}
                variant="ghost"
                onClick={() => setTheme("dark")}
                className={cn(variant === "full" && "flex justify-start")}
            >
                <Moon className="h-6 w-6 " />
                {variant === "full" && <span className="ml-2">Dark mode</span>}
            </Button>
        );
    }
};
