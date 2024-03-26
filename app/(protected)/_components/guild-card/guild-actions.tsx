"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTransition } from "react";
import { deleteGuild } from "@/actions/delete-guild";
import { useRouter } from "next/navigation";

interface ActionProps {
    children: React.ReactNode;
    side?: DropdownMenuContentProps["side"];
    sideOffset?: DropdownMenuContentProps["sideOffset"];
    id: number;
    name: string;
    user: CompleteUser;
    guild: Guild;
}

const GuildActions = ({
    children,
    side,
    sideOffset,
    id,
    name,
    user,
    guild,
}: ActionProps) => {
    const router = useRouter();

    const userOwnsGuild = guild.user_id === user.id;

    const [isPending, startTransition] = useTransition();

    const onCopyLink = () => {
        navigator.clipboard
            .writeText(`${window.location.origin}/guild/${id}`)
            .then(() => toast.success("Link copied"))
            .catch(() => toast.error("Failed to copy link"));
    };

    const onDelete = () => {
        startTransition(() => {
            deleteGuild(guild.id)
                .then((data) => {
                    if (data.error) toast.error(data.error);
                    if (data.success) toast.success(data.success);
                    router.refresh();
                })
                .catch(() => toast.error("Failed to delete guild, try again"));
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent
                side={side}
                sideOffset={sideOffset}
                className="w-60"
                onClick={(e) => e.stopPropagation()}
            >
                <DropdownMenuItem
                    className="p-3 cursor-pointer"
                    onClick={onCopyLink}
                >
                    <Link2 className="h-4 w-4 mr-2" />
                    Copy guild link
                </DropdownMenuItem>
                {userOwnsGuild && (
                    <>
                        <DropdownMenuItem
                            className="cursor-pointer p-3"
                            asChild
                        >
                            <Link href={`/guild/${id}/settings`}>
                                <Button
                                    variant="ghost"
                                    className="text-sm w-full justify-start font-normal p-0"
                                >
                                    <Pencil className="h-4 w-4 mr-2 p-0" />
                                    Guild settings
                                </Button>
                            </Link>
                        </DropdownMenuItem>
                        <ConfirmModal
                            header="Delete guild?"
                            description="This will delete the guild and all of its related data. This action cannot be undone."
                            disabled={isPending}
                            onConfirm={onDelete}
                        >
                            <Button
                                variant="ghost"
                                className="p-3 cursor-pointer text-sm w-full justify-start font-normal"
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete guild
                            </Button>
                        </ConfirmModal>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default GuildActions;
