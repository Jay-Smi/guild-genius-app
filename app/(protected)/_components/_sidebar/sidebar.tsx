"use client";

import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SidebarNavItem } from "./sidebar-nav-item";
import { type sidebarItemInput } from ".";

type SidebarProps = {
    user: CompleteUser;
    topItems: sidebarItemInput[];
};

export const Sidebar = ({ user, topItems }: SidebarProps) => {
    const path = usePathname();

    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [showTitle, setShowTitle] = useState(false);

    const handleToggleSidebarOpen = () => {
        setSidebarOpen((prev) => {
            if (prev === false) {
                setTimeout(() => {
                    setShowTitle(true);
                }, 100);
            } else {
                setShowTitle(false);
            }
            return !prev;
        });
    };

    return (
        <nav
            className="px-1 py-2 h-full flex flex-col transition-all duration-200 "
            style={{ width: sidebarOpen ? "13rem" : "4.3rem" }}
        >
            <ul className="flex flex-col gap-2 h-full w-full items-start justify-start">
                <Hint
                    label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                    side="right"
                    align="center"
                    sideOffset={10}
                >
                    <Button
                        size="icon"
                        variant="outline"
                        onClick={handleToggleSidebarOpen}
                        className="w-full flex justify-start px-4 text-background-foreground bg-card/60 hover:bg-primary/80 border border-accent"
                    >
                        <Menu />
                        {sidebarOpen && showTitle && (
                            <p className="ml-4">Collapse</p>
                        )}
                    </Button>
                </Hint>

                {topItems.map((item, index) => (
                    <SidebarNavItem
                        key={index}
                        {...item}
                        sidebarOpen={sidebarOpen}
                        active={path.endsWith(item.slug)}
                        showTitle={showTitle}
                        disabled={
                            !user.guildIds.length || !user.active_guild_id
                        }
                    />
                ))}
            </ul>
        </nav>
    );
};
