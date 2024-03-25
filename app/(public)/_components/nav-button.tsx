import { Button } from "@/components/ui/button";
import Link from "next/link";

type NavButtonProps = {
    path: string;
    name: string;
};

export const NavButton = ({ path, name }: NavButtonProps) => {
    return (
        <Link href={path}>
            <Button variant="link">{name}</Button>
        </Link>
    );
};
