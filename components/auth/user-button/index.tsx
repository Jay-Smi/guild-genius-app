"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Settings } from "lucide-react";
import { SignOutButton } from "../sign-out-button";
import { ThemeSwitch } from "@/components/theme-switch";
import { Separator } from "@/components/ui/separator";
import { JoinAGuildButton } from "./my-guilds-button";

type UserButtonProps = {
    user: CompleteUser;
};

const UserButtonIndex = ({ user }: UserButtonProps) => {
    const activePlayer = user.players.find(
        (p) => p.guild_id === user.active_guild_id
    );

    const activeGuild = user.guilds.find((g) => g.id === user.active_guild_id);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button className="bg-accent text-accent-foreground hover:bg-primary/60 hover:text-primary-foreground flex gap-2 items-center rounded-full p-1.5 group">
                    <Avatar>
                        <AvatarImage
                            src={user.avatar_url}
                            className="shadow-inner transform group-active:scale-90 transition-transform"
                        />
                        <AvatarFallback>
                            {user.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <Settings className="mx-2 group-hover:animate-spin" />
                </button>
            </PopoverTrigger>
            <PopoverContent>
                <menu className="flex flex-col ">
                    <p className="className">
                        Hello,{" "}
                        <span className="font-bold text-primary">
                            {user.username}
                        </span>
                    </p>
                    <p className="text-[0.8rem] pl-4">
                        {activeGuild
                            ? `${activePlayer?.guild_rank} of ${activeGuild.name}`
                            : "No guild selected"}
                    </p>

                    <Separator className="my-2" />

                    <JoinAGuildButton />

                    <Separator className="my-2" />

                    <ThemeSwitch variant="full" />
                    <SignOutButton variant="ghost" />
                </menu>
            </PopoverContent>
        </Popover>
    );
};
export default UserButtonIndex;
