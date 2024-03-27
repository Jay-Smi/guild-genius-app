import { getProfileBySession } from "@/data/profile";
import DashboardSidebar from "../../_components/_sidebar/index";
import { redirect } from "next/navigation";
import { getUserProfilePlayersCharactersGuilds } from "@/data/user";
import { getGuildById } from "@/data/guild";
import { Error } from "@/components/error";

type GuildDashboardLayoutProps = {
    children: React.ReactNode;
    params: { guildId: string };
};

const GuildDashboardLayout = async ({
    children,
    params,
}: GuildDashboardLayoutProps) => {
    const userProfile = await getProfileBySession();

    if (!userProfile) redirect("/");

    const completeUser = await getUserProfilePlayersCharactersGuilds(
        userProfile.id
    );

    if (!completeUser) redirect("/");

    const guild = await getGuildById(+params.guildId);

    if (!guild)
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="max-w-[600px]">
                    <Error user={completeUser} variant="no-access" />
                </div>
            </div>
        );

    //user is in guild
    if (!completeUser.guilds.find((g) => g.id === +params.guildId))
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="max-w-[600px]">
                    <Error user={completeUser} variant="no-access" />
                </div>
            </div>
        );

    return (
        <div className="flex h-full w-full">
            <DashboardSidebar user={completeUser} guildId={params.guildId} />
            <main className="h-full w-full bg-muted dark:bg-background rounded-tl-xl p-4 shadow-[inset_10px_15px_15px_-15px_rgba(0,0,0,0.3)] dark:shadow-[inset_10px_15px_15px_-15px_rgba(0,0,0,1)]">
                {children}
            </main>
        </div>
    );
};

export default GuildDashboardLayout;
