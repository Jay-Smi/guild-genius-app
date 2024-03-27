"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

type BackButtonProps = {
    variant?:
        | "default"
        | "destructive"
        | "outline"
        | "secondary"
        | "ghost"
        | "link";
    className?: string;
};

export const BackButton = ({
    className,
    variant = "link",
}: BackButtonProps) => {
    const router = useRouter();

    return (
        <Button
            variant={variant}
            onClick={() => router.back()}
            className={className}
        >
            Back
        </Button>
    );
};
