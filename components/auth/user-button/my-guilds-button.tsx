import { Button } from "@/components/ui/button";
import { Castle } from "lucide-react";
import Link from "next/link";

export const JoinAGuildButton = () => {
    return (
        <Link href="/manage/my-guilds">
            <Button variant="ghost" className="w-full flex justify-start">
                <Castle className="w-6 h-6 " />
                <span className="ml-2">Guild Management</span>
            </Button>
        </Link>
    );
};
