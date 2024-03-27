import { Button } from "@/components/ui/button";
import { getMutualServers } from "@/data/discord/getMutualServers";
import { getProfileBySession } from "@/data/profile";
import { getUserProfilePlayersCharactersGuilds } from "@/data/user";
import { getDiscordServerImageUrl } from "@/lib/helpers";
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
                        // if (joined) return null;
                        return (
                            <li key={server.id}>
                                <Button
                                    variant="outline"
                                    className="w-full flex items-center justify-between gap-x-4 py-8 rounded-lg border border-primary hover:scale-105"
                                    disabled={joined}
                                >
                                    {server.name}
                                    {joined ? (
                                        <span className="font-semibold text-green-500">
                                            Already joined
                                        </span>
                                    ) : (
                                        <span className="font-semibold">
                                            Click to join
                                        </span>
                                    )}
                                    <Image
                                        src={getDiscordServerImageUrl(
                                            server.id,
                                            server.icon
                                        )}
                                        alt={server.name}
                                        width={40}
                                        height={40}
                                        className='className="w-[40px] h-[40px] rounded-lg'
                                    />
                                </Button>
                            </li>
                        );
                    })}
                </ul>
            )}
        </>
    );
};

export default JoinGuildsPage;
