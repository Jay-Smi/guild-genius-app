import { Button } from "@/components/ui/button";
import { getMutualServers } from "@/data/discord/getMutualServers";
import { getProfileBySession } from "@/data/profile";
import { getUserProfilePlayersCharactersGuilds } from "@/data/user";
import { getDiscordServerImageUrl } from "@/utils/helpers";
import Image from "next/image";
import { redirect } from "next/navigation";

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
                <ul className="flex flex-col gap-y-4">
                    {mutualServers.map((server) => {
                        const joined = guildsUserIsAlreadyIn.includes(server);
                        return (
                            <Button
                                key={server.id}
                                variant="outline"
                                className="w-full"
                                disabled={joined}
                            >
                                {server.name}
                                {joined && "Joined"}
                                <Image
                                    src={getDiscordServerImageUrl(server)}
                                    alt={server.name}
                                    width={40}
                                    height={40}
                                />
                            </Button>
                        );
                    })}
                </ul>
            )}
        </>
    );
};

export default JoinGuildsPage;
