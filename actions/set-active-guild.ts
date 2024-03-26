"use server";

import { updateProfileActiveGuild } from "@/data/profile";
import { getUserProfilePlayersCharactersGuilds } from "@/data/user";
import { createServerClient } from "@/lib/supabase/clients/server-client";

export const setActiveGuild = async (newGuildId: number) => {
    const supabase = createServerClient();

    try {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) return { error: "User not found" };

        const completeUser = await getUserProfilePlayersCharactersGuilds(
            user.id
        );

        if (!completeUser) return { error: "User not found" };

        if (!completeUser.guildIds.includes(newGuildId))
            return { error: "User is not in this guild" };

        await updateProfileActiveGuild(user.id, newGuildId);

        return { success: "Active guild updated" };
    } catch {
        return { error: "Failed to update active guild" };
    }
};
