import { WowFaction, WowRegion, WowSodRealm } from "@/enums/wow-enums";
import { createServerClient } from "@/lib/supabase/clients/server-client";

export const insertPlayer = async (player: PlayerInsert) => {
    const supabase = createServerClient();

    const { data, error } = await supabase
        .from("players")
        .insert(player)
        .select()
        .limit(1)
        .single();

    return { data, error };
};

export const updatePlayer = async (
    playerId: number,
    newPlayer: PlayerUpdate
) => {
    const supabase = createServerClient();

    const { data, error } = await supabase
        .from("players")
        .update(newPlayer)
        .eq("id", playerId)
        .single();

    return { data, error };
};

export const deletePlayer = async (playerId: number) => {
    const supabase = createServerClient();

    const { data, error } = await supabase
        .from("players")
        .delete()
        .eq("id", playerId)
        .select()
        .single();

    return { data, error };
};

export const getPlayerById = async (playerId: number) => {
    const supabase = createServerClient();

    const { data, error } = await supabase
        .from("players")
        .select("*")
        .eq("id", playerId)
        .limit(1)
        .single();

    return { player: data, error };
};

export const getPlayersByProfileId = async (
    userId: string
): Promise<Player[] | null> => {
    try {
        const supabase = createServerClient();

        const { data: players } = await supabase
            .from("players")
            .select("*")
            .eq("profile_id", userId);

        return players;
    } catch {
        return null;
    }
};

export const getUsersPlayersOnMatchingServer = async (
    userId: string,
    region: WowRegion,
    realm: WowSodRealm,
    faction: WowFaction
) => {
    try {
        const supabase = createServerClient();

        const { data: players } = await supabase
            .from("players")
            .select("*")
            .eq("user_id", userId)
            .eq("region", region)
            .eq("realm", realm)
            .eq("faction", faction)
            .limit(1)
            .single();

        return players;
    } catch {
        return null;
    }
};
