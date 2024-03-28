import { createServerClient } from "@/lib/supabase/clients/server-client";

export const getCharactersByProfileId = async (
    profileId: string
): Promise<Character[] | null> => {
    try {
        const supabase = createServerClient();

        const { data: characters } = await supabase
            .from("characters")
            .select("*")
            .eq("profile_id", profileId);

        return characters;
    } catch {
        return null;
    }
};

export const getCharactersByPlayerId = async (playerId: number) => {
    try {
        const supabase = createServerClient();

        const { data: characters } = await supabase
            .from("characters")
            .select("*")
            .eq("player_id", playerId);

        return characters;
    } catch {
        return null;
    }
};

export const updatePlayersCharacters = async (
    playerId: number,
    newColumns: CharacterUpdate
) => {
    try {
        const supabase = createServerClient();

        const { data: characters } = await supabase
            .from("characters")
            .update(newColumns)
            .eq("player_id", playerId)
            .select();

        return characters;
    } catch {
        return null;
    }
};
