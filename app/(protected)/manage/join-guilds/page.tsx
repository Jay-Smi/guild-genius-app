import { Button } from "@/components/ui/button";
import { getMutualServers } from "@/data/discord/getMutualServers";
import { getProfileBySession } from "@/data/profile";
import { getUserProfilePlayersCharactersGuilds } from "@/data/user";
import { getDiscordServerImageUrl } from "@/lib/utils";
import Image from "next/image";
import { redirect } from "next/navigation";
import { JoinGuildButton } from "./join-guild-button";
import { JoinGuildWrapper } from "./join-guild-wrapper";

const JoinGuildsPage = async () => {
    const mutualServers = await getMutualServers();

    if (!mutualServers)
        return <div>Error fetching from database, try refreshing</div>;

    const profile = await getProfileBySession();

    if (!profile) redirect("/");

    const user = await getUserProfilePlayersCharactersGuilds(profile.id);

    if (!user) redirect("/");

    const guildsUserIsAlreadyIn = mutualServers.filter((server) =>
        user.guilds.some((guild) => guild.discord_server_id === server.id)
    );

    return (
        <>
            {!mutualServers.length ? (
                <div>No guilds available to join</div>
            ) : (
                <ul className="flex flex-col gap-y-4 max-w-[500px]">
                    {mutualServers.map((server) => {
                        const joined = guildsUserIsAlreadyIn.includes(server);
                        // if (joined) return null;
                        return (
                            <li key={server.id}>
                                <JoinGuildWrapper
                                    server={server}
                                    user={user}
                                    joined={joined}
                                />
                            </li>
                        );
                    })}
                </ul>
            )}
        </>
    );
};

export default JoinGuildsPage;
