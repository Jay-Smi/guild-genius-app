"use server";

import { getGuildById } from "@/data/guild";
import { getPlayersByProfileId, updatePlayer } from "@/data/player";
import { getProfileByUserId } from "@/data/profile";
import { createServerClient } from "@/lib/supabase/clients/server-client";

export const leaveGuild = async (guildId: number) => {
    const supabase = createServerClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Insufficient permissions. No user" };

    const userProfile = await getProfileByUserId(user.id);

    if (!userProfile) return { error: "Insufficient permissions. No profile" };

    const guild = await getGuildById(guildId);

    if (!guild) return { error: "Insufficient permissions. No guild" };

    const players = await getPlayersByProfileId(user.id);

    if (!players || !players.length)
        return { error: "Insufficient permissions. No player" };

    const playerInGuild = players.find((player) => player.guild_id === guildId);

    if (!playerInGuild)
        return { error: "Insufficient permissions. No player in guild" };

    const { error: updatePlayerError } = await updatePlayer(playerInGuild.id, {
        guild_id: null,
    });

    if (updatePlayerError) return { error: "Failed to update player" };

    return { success: "Successfully left guild" };
};
