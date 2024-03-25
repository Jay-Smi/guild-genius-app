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
