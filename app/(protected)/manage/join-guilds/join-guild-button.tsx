"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { joinGuild } from "@/actions/guild/join-guild";
import { Button } from "@/components/ui/button";
import { getDiscordServerImageUrl } from "@/lib/utils";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { deletePlayerAction } from "@/actions/player/delete-player";

type JoinGuildButtonProps = {
    server: PartialDiscordServer;
    guild: Guild;
    serverMember: any;
    joined: boolean;
    mayJoin: boolean;
};

export const JoinGuildButton = ({
    server,
    guild,
    serverMember,
    joined,
    mayJoin,
}: JoinGuildButtonProps) => {
    const router = useRouter();

    const [isPending, startTransition] = useTransition();

    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [promptedPlayer, setPromptedPlayer] = useState<Player | null>(null);

    const handleClick = () => {
        setPromptedPlayer(null);
        setDialogOpen(false);

        if (!mayJoin) {
            toast.error("You do not have permission to join this guild.");
            return;
        }

        if (joined) {
            toast.error("You are already a member of this guild.");
            return;
        }

        startTransition(() => {
            joinGuild(guild.id)
                .then((response) => {
                    if (response.error) {
                        toast.error(response.error);
                    }
                    if (response.success) {
                        toast.success(response.success);

                        router.refresh();

                        setTimeout(() => {
                            router.push(`/guild/${guild.id}/dashboard`);
                        }, 1000);
                    }
                    if (response.prompt) {
                        setPromptedPlayer(response.prompt);
                        setDialogOpen(true);
                    }
                })
                .catch(() => toast.error("Failed to join guild, try again"));
        });
    };

    const onDialogConfirm = () => {
        //switch existing players guild_id to this guild
        //switch any characters guild_id
        startTransition(() => {
            joinGuild(guild.id, true)
                .then((response) => {
                    if (response.error) {
                        toast.error(response.error);
                    }
                    if (response.success) {
                        toast.success(response.success);

                        router.refresh();

                        setTimeout(() => {
                            router.push(`/guild/${guild.id}/dashboard`);
                        }, 1000);
                    }
                })
                .catch(() => toast.error("Failed to join guild, try again"));
        });
    };

    const onDialogCancel = () => {
        //delete existing player
        startTransition(() => {
            deletePlayerAction(promptedPlayer?.id!)
                .then((response) => {
                    if (response.error) {
                        toast.error(response.error);
                    }
                    if (response.success) {
                        toast.success(response.success);
                    }

                    joinGuild(guild.id)
                        .then((response) => {
                            if (response.error) {
                                toast.error(response.error);
                            }
                            if (response.success) {
                                toast.success(response.success);

                                router.refresh();

                                setTimeout(() => {
                                    router.push(`/guild/${guild.id}/dashboard`);
                                }, 1000);
                            }
                        })
                        .catch(() =>
                            toast.error("Failed to join guild, try again")
                        );
                })
                .catch(() => toast.error("Failed to delete player, try again"));
        });
    };

    return (
        <>
            <Button
                variant="outline"
                className="group w-full h-12 flex flex-col rounded-lg border border-primary hover:h-64 py-9 transition-all duration-500 ease-in-out"
                disabled={joined || isPending}
                onClick={handleClick}
            >
                <div className="w-full flex items-center justify-between">
                    {server.name}
                    {joined ? (
                        <span className="font-semibold text-green-500">
                            Already joined
                        </span>
                    ) : (
                        <span className="font-semibold">Click to join</span>
                    )}
                    <Image
                        src={getDiscordServerImageUrl(server.id, server.icon)}
                        alt={server.name}
                        width={40}
                        height={40}
                        className='className="w-[40px] h-[40px] rounded-lg'
                    />
                </div>

                <div className="w-full flex mt-6 lg:hidden group-hover:lg:flex">
                    <div className="flex-1 flex flex-col items-start">
                        <span>Guild Name: {guild.name}</span>
                        <span>Region: {guild.region}</span>
                    </div>
                    <div className="flex-1 flex flex-col items-start">
                        <span>Faction: {guild.faction}</span>
                        <span>Realm: {guild.realm}</span>
                        <span>Version: {guild.wow_version}</span>
                    </div>
                </div>
            </Button>
            <ConfirmModal
                onConfirm={onDialogConfirm}
                onCancel={onDialogCancel}
                disabled={isPending}
                header="Existing player information found on same server"
                description="Would you like you use the existing information for this guild? If you choose no, the existing player and its associated character information will be deleted, and you will  start fresh. If you choose yes, the existing player and its associated character information will be used and linked to this guild."
                open={dialogOpen}
                setOpen={setDialogOpen}
            />
        </>
    );
};
