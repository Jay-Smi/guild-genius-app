import {
    Calendar,
    Hammer,
    LayoutDashboard,
    Settings,
    Swords,
    Users,
} from "lucide-react";
import { Sidebar } from "./sidebar";
import { getProfileBySession } from "@/data/profile";
import { redirect } from "next/navigation";

export type sidebarItemInput = {
    title: string;
    icon: React.ReactNode;
    href: string;
    slug: string;
};

type SidebarIndexProps = {
    user: CompleteUser;
    guildId: string;
};

const SidebarIndex = ({ user, guildId }: SidebarIndexProps) => {
    const sidebarTopItems: sidebarItemInput[] = [
        {
            title: "Dashboard",
            icon: <LayoutDashboard className="w-6 h-6" />,
            href: `/guild/${guildId}/dashboard`,
            slug: "dashboard",
        },
        {
            title: "Raids",
            icon: <Swords className="w-6 h-6" />,
            href: `/guild/${guildId}/raids`,
            slug: "raids",
        },
        {
            title: "Calendar",
            icon: <Calendar className="w-6 h-6" />,
            href: `/guild/${guildId}/calendar`,
            slug: "calendar",
        },
        {
            title: "Roster",
            icon: <Users className="w-6 h-6" />,
            href: `/guild/${guildId}/roster`,
            slug: "roster",
        },
        {
            title: "Roster Builder",
            icon: <Hammer className="w-6 h-6" />,
            href: `/guild/${guildId}/roster-builder`,
            slug: "roster-builder",
        },
        {
            title: "Guild Settings",
            icon: <Settings className="w-6 h-6" />,
            href: `/guild/${guildId}/settings`,
            slug: "guild-settings",
        },
    ];

    return <Sidebar user={user} topItems={sidebarTopItems} />;
};

export default SidebarIndex;
