import { createServerClient } from "@/lib/supabase/clients/server-client";
import { getGuildsByGuildIdArray } from "./guild";

export const getUserProfilePlayersCharactersGuilds = async (
    profileId: string
): Promise<CompleteUser | null> => {
    try {
        const supabase = createServerClient();

        const { data } = await supabase
            .from("profiles")
            .select("*, players(*), characters(*)")
            .eq("id", profileId);

        const profile = Array.isArray(data) ? data[0] : data;

        if (!profile) return null;

        const uniqueGuildIds = [
            ...new Set(
                profile.players.filter((p) => p.guild_id).map((p) => p.guild_id)
            ),
        ] as number[];

        const guilds = await getGuildsByGuildIdArray(uniqueGuildIds);

        if (!guilds) return null;

        return { ...profile, guilds, guildIds: uniqueGuildIds };
    } catch {
        return null;
    }
};
