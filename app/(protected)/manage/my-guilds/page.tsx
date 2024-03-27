import { redirect } from "next/navigation";

import { getProfileBySession } from "@/data/profile";
import { getUserProfilePlayersCharactersGuilds } from "@/data/user";
import { Error } from "@/components/error";
import GuildCard from "../../_components/guild-card";

const MyGuildsPage = async () => {
    const profile = await getProfileBySession();

    if (!profile) redirect("/");

    const user = await getUserProfilePlayersCharactersGuilds(profile.id);

    if (!user) redirect("/");

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  gap-5 mt-8 pb-10">
            {!user.guildIds.length ? (
                <GuildCard user={user} />
            ) : (
                user.guildIds.map((guildId) => {
                    const guild = user.guilds.find(
                        (guild) => guild.id === guildId
                    );
                    return (
                        <GuildCard user={user} guild={guild} key={guildId} />
                    );
                })
            )}
        </div>
    );
};

export default MyGuildsPage;
