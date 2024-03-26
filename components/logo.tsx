import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

type LogoProps = {
    destination?: "home" | "dashboard";
};

export const Logo = ({ destination = "home" }: LogoProps) => {
    return (
        <Link href={destination === "home" ? "/" : "/manage/my-guilds"}>
            <Button
                variant="ghost"
                className="flex items-center gap-x-2 px-0 pr-1"
            >
                <Image
                    src="/logo.svg"
                    alt="Logo"
                    height={60}
                    width={60}
                    priority
                />
                <span
                    className={cn(
                        "font-semibold text-2xl hidden md:inline",
                        font.className
                    )}
                >
                    Guild Genius
                </span>
            </Button>
        </Link>
    );
};
