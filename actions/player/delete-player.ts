"use server";

import { getCharactersByPlayerId } from "@/data/character";
import { deletePlayer, getPlayerById } from "@/data/player";
import { createServerClient } from "@/lib/supabase/clients/server-client";

export const deletePlayerAction = async (playerId: number) => {
    const supabase = createServerClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Insufficient permissions. No user" };

    const { player: playerToBeDeleted } = await getPlayerById(playerId);

    if (!playerToBeDeleted) return { error: "Player not found" };

    if (playerToBeDeleted.user_id && playerToBeDeleted.user_id !== user.id)
        return {
            error: "Insufficient permissions. Player does not belong to you",
        };

    const { data: deletedPlayer } = await deletePlayer(playerId);

    if (!deletedPlayer) return { error: "Failed to delete player" };

    return { success: "Successfully deleted player information" };
};
