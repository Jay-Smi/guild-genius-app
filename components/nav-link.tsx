"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

type NavLinkProps = {
    children: React.ReactNode;
    href: string;
    className?: string;
};

export const NavLink = ({ children, href, className }: NavLinkProps) => {
    const path = usePathname();

    const active = path === href;

    return (
        <Link href={href}>
            <Button
                variant="ghost"
                className={cn(
                    className,
                    "hover:underline w-full flex justify-start items-center gap-x-2 ",
                    active ? "underline text-primary disabled" : ""
                )}
            >
                {children}
            </Button>
        </Link>
    );
};
