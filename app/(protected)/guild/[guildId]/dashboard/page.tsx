import { redirect } from "next/navigation";

import { Error } from "@/components/error";

import { getProfileBySession } from "@/data/profile";
import { getUserProfilePlayersCharactersGuilds } from "@/data/user";

//my current guilds
//guilds i am able to join (mutualGuilds)
//create guild

const DashboardPage = async ({}) => {
    const profile = await getProfileBySession();

    if (!profile) redirect("/");

    const user = await getUserProfilePlayersCharactersGuilds(profile.id);

    if (!user) redirect("/");

    return (
        <div className="w-full h-full">
            {!user.guildIds.length || !user.active_guild_id ? (
                <Error user={user} />
            ) : (
                <div className="w-[200px] h-[200px] bg-card">DashboardPage</div>
            )}
        </div>
    );
};

export default DashboardPage;
