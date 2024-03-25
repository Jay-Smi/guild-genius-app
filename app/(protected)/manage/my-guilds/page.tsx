import { redirect } from "next/navigation";

import { getProfileBySession } from "@/data/profile";
import { getUserProfilePlayersCharactersGuilds } from "@/data/user";
import { NoGuilds } from "@/components/error/no-guilds";

const MyGuildsPage = async () => {
    const profile = await getProfileBySession();

    if (!profile) redirect("/");

    const user = await getUserProfilePlayersCharactersGuilds(profile.id);

    if (!user) redirect("/");

    return (
        <div>
            {!user.guildIds.length ? (
                <NoGuilds completeUser={user} />
            ) : (
                <div className="w-[200px] h-[200px] bg-card">DashboardPage</div>
            )}
        </div>
    );
};

export default MyGuildsPage;
