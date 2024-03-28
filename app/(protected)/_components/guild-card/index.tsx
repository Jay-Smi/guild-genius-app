"use client";

import { getDiscordServerImageUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Overlay from "./guild-card-overlay";
import Footer from "./guild-card-footer";
import { setActiveGuild } from "@/actions/guild/set-active-guild";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import GuildActions from "./guild-actions";
import { MoreHorizontal } from "lucide-react";

type GuildCardProps = {
    guild?: Guild;
    user: CompleteUser;
    variant?: "default" | "join";
};

const GuildCard = ({ guild, user, variant }: GuildCardProps) => {
    const router = useRouter();

    const onClick = async () => {
        if (!guild) return;

        const response = await setActiveGuild(guild.id);

        router.refresh();

        if (response.error) toast.error(response.error);
        if (response.success) toast.success(response.success);
    };

    return (
        <Link
            href={guild ? `/guild/${guild.id}/dashboard` : "/manage/my-guilds"}
        >
            <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden shadow-xl hover:scale-105 hover:shadow-2xl">
                <div
                    className={cn(
                        "relative flex-1",
                        guild ? "bg-card" : "bg-destructive"
                    )}
                >
                    <Image
                        src={
                            guild
                                ? guild.icon
                                    ? guild.icon
                                    : getDiscordServerImageUrl(
                                          `${guild.discord_server_id}`,
                                          guild.icon
                                      )
                                : "https://cdn.discordapp.com/emojis/1188562250890485862.webp?size=96&quality=lossless"
                        }
                        alt={guild ? guild.name : "Blockin"}
                        fill
                        className="object-center"
                    />
                    <Overlay />
                    {guild && (
                        <GuildActions
                            id={guild.id}
                            name={guild.name}
                            side="right"
                            user={user}
                            guild={guild}
                        >
                            <button className="absolute top-1 right-1 lg:opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
                                <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
                            </button>
                        </GuildActions>
                    )}
                </div>
                <Footer
                    name={guild ? guild.name : "No guilds found"}
                    region={guild?.region}
                    faction={guild?.faction || "No faction provided"}
                    wow_version={guild?.wow_version || "SoD"}
                    realm={guild?.realm || "No realm provided"}
                    isActiveGuild={user.active_guild_id === guild?.id}
                    onClick={onClick}
                    disabled={false}
                />
            </div>
        </Link>
    );
};

export default GuildCard;
