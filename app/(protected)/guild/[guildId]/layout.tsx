import { getProfileBySession } from "@/data/profile";
import DashboardSidebar from "../../_components/_sidebar/index";
import { redirect } from "next/navigation";
import { getUserProfilePlayersCharactersGuilds } from "@/data/user";

type GuildDashboardLayoutProps = {
    children: React.ReactNode;
};

const GuildDashboardLayout = async ({
    children,
}: GuildDashboardLayoutProps) => {
    const userProfile = await getProfileBySession();

    if (!userProfile) redirect("/");

    const completeUser = await getUserProfilePlayersCharactersGuilds(
        userProfile.id
    );

    if (!completeUser) redirect("/");

    return (
        <div className="flex h-full w-full">
            <DashboardSidebar user={completeUser} />
            <main className="h-full w-full bg-background rounded-tl-xl p-4 shadow-[inset_10px_15px_15px_-15px_rgba(0,0,0,0.3)] dark:shadow-[inset_10px_15px_15px_-15px_rgba(0,0,0,1)]">
                {children}
            </main>
        </div>
    );
};

export default GuildDashboardLayout;
