import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

export const Icon = () => {
    return (
        <Link
            href="/dashboard"
            className="flex items-center justify-center w-[50px] h-[50px]"
        >
            <Button
                variant="ghost"
                className="h-full w-full p-1 rounded-lg flex items-center justify-center"
            >
                <Image
                    src="/logo.svg"
                    alt="Logo"
                    priority
                    width={31}
                    height={31}
                    className="h-full w-full "
                />
            </Button>
        </Link>
    );
};
