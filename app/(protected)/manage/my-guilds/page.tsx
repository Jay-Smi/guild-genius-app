import { redirect } from "next/navigation";

import { getProfileBySession } from "@/data/profile";
import { getUserProfilePlayersCharactersGuilds } from "@/data/user";
import { NoGuilds } from "@/components/error/no-guilds";
import GuildCard from "../../_components/guild-card";

const MyGuildsPage = async () => {
    const profile = await getProfileBySession();

    if (!profile) redirect("/");

    const user = await getUserProfilePlayersCharactersGuilds(profile.id);

    if (!user) redirect("/");

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4  gap-5 mt-8 pb-10">
            {!user.guildIds.length ? (
                <GuildCard user={user} />
            ) : (
                user.guilds.map((guild) => (
                    <GuildCard user={user} guild={guild} key={guild.id} />
                ))
            )}
        </div>
    );
};

export default MyGuildsPage;
