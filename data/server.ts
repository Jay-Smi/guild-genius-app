import { createServerClient } from "@/lib/supabase/clients/server-client";

export const getDBServerByDiscordServerId = async (id: string) => {
    try {
        const supabase = createServerClient();

        const { data: server } = await supabase
            .from("servers")
            .select("*")
            .eq("discord_server_id", id)
            .limit(1)
            .single();

        return server;
    } catch {
        return null;
    }
};
