import { createServerClient } from "@/lib/supabase/clients/server-client";
import { getSession } from "@/lib/supabase/session";

export const getProfileByUserId = async (
    id: string
): Promise<Profile | null> => {
    try {
        const supabase = createServerClient();

        const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", id)
            .limit(1)
            .single();

        return profile;
    } catch {
        return null;
    }
};

export const getProfileBySession = async (): Promise<Profile | null> => {
    try {
        const session = await getSession();

        if (!session) return null;

        const {
            user: { id },
        } = session;

        const supabase = createServerClient();

        const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", id)
            .limit(1)
            .single();

        return profile;
    } catch {
        return null;
    }
};

export const updateProfileActiveGuild = async (
    id: string,
    newGuildId: number
) => {
    try {
        const supabase = createServerClient();

        await supabase
            .from("profiles")
            .update({ active_guild_id: newGuildId })
            .eq("id", id);

        return true;
    } catch {
        return false;
    }
};
