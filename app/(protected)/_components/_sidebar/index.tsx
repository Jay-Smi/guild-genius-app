import { Calendar, Hammer, LayoutDashboard, Swords, Users } from "lucide-react";
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
};

const sidebarTopItems: sidebarItemInput[] = [
    {
        title: "Dashboard",
        icon: <LayoutDashboard className="w-6 h-6" />,
        href: "/dashboard",
        slug: "dashboard",
    },
    {
        title: "Raids",
        icon: <Swords className="w-6 h-6" />,
        href: "/dashboard/raids",
        slug: "raids",
    },
    {
        title: "Calendar",
        icon: <Calendar className="w-6 h-6" />,
        href: "/dashboard/calendar",
        slug: "calendar",
    },
    {
        title: "Roster",
        icon: <Users className="w-6 h-6" />,
        href: "/dashboard/roster",
        slug: "roster",
    },
    {
        title: "Roster Builder",
        icon: <Hammer className="w-6 h-6" />,
        href: "/dashboard/roster-builder",
        slug: "roster-builder",
    },
];

const SidebarIndex = ({ user }: SidebarIndexProps) => {
    return <Sidebar user={user} topItems={sidebarTopItems} />;
};

export default SidebarIndex;
