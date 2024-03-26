import { Castle, ShieldCheck, Sword, Swords } from "lucide-react";
import { redirect } from "next/navigation";

import { getProfileBySession } from "@/data/profile";
import { getUserProfilePlayersCharactersGuilds } from "@/data/user";
import { NavLink } from "@/components/nav-link";

type ManageLayoutProps = {
    children: React.ReactNode;
};

const ManageLayout = async ({ children }: ManageLayoutProps) => {
    const userProfile = await getProfileBySession();

    if (!userProfile) redirect("/");

    const completeUser = await getUserProfilePlayersCharactersGuilds(
        userProfile.id
    );

    if (!completeUser) redirect("/");

    return (
        <main className="h-full w-full flex items-center justify-center bg-background p-4 shadow-[inset_10px_15px_15px_-15px_rgba(0,0,0,0.3)] dark:shadow-[inset_10px_15px_15px_-15px_rgba(0,0,0,1)]">
            <div className="max-w-[1000px] flex flex-col  w-full h-full">
                <div className="flex items-center gap-x-4 mb-8 text-2xl">
                    <Castle className="w-8 h-8" />
                    <h1 className="font-semibold ">Guild Management</h1>
                </div>
                <div className="flex flex-col md:flex-row">
                    <div className="basis-1/4 flex justify-center md:items-start items-center border-accent border-b-2 md:border-b-0 md:border-r-2 mb-4 pb-2">
                        <div className="flex flex-wrap items-center justify-center md:flex-col md:justify-start gap-y-2 w-full ">
                            <NavLink href="/manage/my-guilds">
                                <Swords />
                                <span>My guilds</span>
                            </NavLink>
                            <NavLink href="/manage/join-guilds">
                                <Sword />
                                <span>Join guilds</span>
                            </NavLink>
                            <NavLink href="/manage/create-guild">
                                <ShieldCheck />
                                <span>Create guild</span>
                            </NavLink>
                        </div>
                    </div>

                    <div className="basis-3/4 md:pl-4">{children}</div>
                </div>
            </div>
        </main>
    );
};

export default ManageLayout;
