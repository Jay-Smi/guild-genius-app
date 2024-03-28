"use server";

import { getBotServerById } from "@/data/discord/bot/get-bot-server";
import { getGuildsByDiscordServerIdArray, insertGuild } from "@/data/guild";
import { insertPlayer } from "@/data/player";
import { getProfileByUserId, updateProfileActiveGuild } from "@/data/profile";
import { getDBServerByDiscordServerId } from "@/data/server";
import { createServerClient } from "@/lib/supabase/clients/server-client";
import { CreateGuildSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const createGuild = async (
    values: z.infer<typeof CreateGuildSchema>,
    server: PartialDiscordServer
): Promise<{ error?: string; success?: string; guild?: Guild }> => {
    const supabase = createServerClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return { error: "Unauthorized" };
    }

    const profile = await getProfileByUserId(user.id);

    if (!profile) {
        return { error: "Unauthorized" };
    }

    const validatedFields = CreateGuildSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid Fields!" };
    }

    const {
        playerName,
        name,
        discord_server_id,
        faction,
        region,
        version,
        realm,
    } = validatedFields.data;

    const existingGuild = await getGuildsByDiscordServerIdArray([
        discord_server_id,
    ]);

    if (existingGuild && existingGuild.length > 0)
        return { error: "Guild already exists!" };

    const dbServer = await getDBServerByDiscordServerId(discord_server_id);

    if (!dbServer)
        return { error: "Bot has not been invited to selected server yet!" };

    const fullServer = await getBotServerById(discord_server_id);

    if (!fullServer) return { error: "Failed to fetch server data!" };

    const serverEveryoneRoleId = fullServer.roles.find(
        (role: any) => role.name === "@everyone"
    )?.id;

    if (!serverEveryoneRoleId)
        return { error: "Failed to locate your server's @everyone role!" };

    try {
        const newGuild = await insertGuild({
            name,
            discord_server_id,
            faction,
            region,
            wow_version: version,
            realm,
            user_id: user.id,
            icon: dbServer.icon,
            roles_that_may_join: [serverEveryoneRoleId],
        });

        if (!newGuild) return { error: "Failed to create guild!" };

        await updateProfileActiveGuild(user.id, newGuild.id);

        const { data, error } = await insertPlayer({
            name: playerName as string,
            profile_id: user.id,
            discord_id: profile.discord_id,
            guild_id: newGuild.id,
            region,
            realm,
            faction,
        });

        if (error) return { error: "Failed to create player!" };

        revalidatePath("/manage/my-guilds");

        return { success: "Guild created!", guild: newGuild };
    } catch {
        return { error: "Failed to create guild!" };
    }
};
