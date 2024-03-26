"use server";

import { getGuildById } from "@/data/guild";
import { createServerClient } from "@/lib/supabase/clients/server-client";

export const deleteGuild = async (guildId: number) => {
    const supabase = createServerClient();

    try {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) return { error: "User not found" };

        const guildToDelete = await getGuildById(guildId);

        if (!guildToDelete) return { error: "Guild not found" };

        if (guildToDelete.user_id !== user.id)
            return { error: "You are not the owner of this guild" };

        const { data, error: deletePlayerError } = await supabase
            .from("players")
            .delete()
            .eq("guild_id", guildId)
            .eq("profile_id", user.id);

        if (deletePlayerError)
            return {
                error: `Error deleting player associated with guild.
                        ${JSON.stringify(deletePlayerError)}`,
            };

        const { data: deleted, error } = await supabase
            .from("guilds")
            .delete()
            .eq("id", guildId)
            .select()
            .single();

        if (error)
            return {
                error: `Failed to delete guild, try again.
                    ${JSON.stringify(error)}
                    `,
            };

        return { success: `Successfully deleted ${deleted?.name || "guild"}` };
    } catch {
        return { error: "Failed to delete guild, try again" };
    }
};
