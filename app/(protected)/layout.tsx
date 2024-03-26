import { DashboardNavbar } from "./_components/dashboard-navbar";
import { getProfileBySession } from "@/data/profile";
import { redirect } from "next/navigation";
import { getUserProfilePlayersCharactersGuilds } from "@/data/user";

type ProtectedLayoutProps = {
    children: React.ReactNode;
};

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
    const userProfile = await getProfileBySession();

    if (!userProfile) redirect("/");

    const completeUser = await getUserProfilePlayersCharactersGuilds(
        userProfile.id
    );

    if (!completeUser) redirect("/");

    return (
        <div className="flex flex-col flex-1 bg-background dark:bg-secondary">
            <DashboardNavbar user={completeUser} />

            <div className="h-full w-full flex-1 bg-background dark:bg-secondary">
                {children}
            </div>
        </div>
    );
};

export default ProtectedLayout;
