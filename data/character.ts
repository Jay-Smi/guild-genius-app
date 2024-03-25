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
