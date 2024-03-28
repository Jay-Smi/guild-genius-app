"use server";

import {
    getCharactersByPlayerId,
    updatePlayersCharacters,
} from "@/data/character";
import { getBotServerById } from "@/data/discord/bot/get-bot-server";
import { getServerMemberById } from "@/data/discord/bot/get-server-member";
import { getGuildById } from "@/data/guild";
import {
    getUsersPlayersOnMatchingServer,
    insertPlayer,
    updatePlayer,
} from "@/data/player";
import { getProfileByUserId, updateProfileActiveGuild } from "@/data/profile";
import { WowFaction, WowRegion, WowSodRealm } from "@/enums/wow-enums";
import { createServerClient } from "@/lib/supabase/clients/server-client";

export const joinGuild = async (
    guildId: number,
    useExistingPlayer: boolean = false
) => {
    const supabase = createServerClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: "Insufficient permissions. No user" };

    const userProfile = await getProfileByUserId(user.id);

    if (!userProfile) return { error: "Insufficient permissions. No profile" };

    const guild = await getGuildById(guildId);

    if (!guild) return { error: "Insufficient permissions. No guild" };

    const linkedServer = await getBotServerById(guild.discord_server_id);

    if (!linkedServer) return { error: "Insufficient permissions. No server" };

    const userServerMember = await getServerMemberById(
        guild.discord_server_id,
        userProfile.discord_id
    );

    if (!userServerMember)
        return { error: "Insufficient permissions. No server member" };

    const userMayJoinGuild = !!guild.roles_that_may_join?.some((roleId) =>
        userServerMember.roles.includes(roleId)
    );

    if (!userMayJoinGuild)
        return {
            error: "Insufficient role permissions. User may not join guild",
        };

    const usersExistingPlayerOnSameServer =
        await getUsersPlayersOnMatchingServer(
            user.id,
            guild.region as WowRegion,
            guild.realm as WowSodRealm,
            guild.faction as WowFaction
        );

    if (!useExistingPlayer) {
        //check for existing player and if one exists, ask user what to do

        if (usersExistingPlayerOnSameServer)
            return {
                prompt: usersExistingPlayerOnSameServer,
            };

        const { data: player } = await insertPlayer({
            name: userProfile.username,
            profile_id: userProfile.id,
            discord_id: userProfile.discord_id,
            guild_id: guildId,
            region: guild.region,
            realm: guild.realm,
            faction: guild.faction,
            user_id: user.id,
        });

        if (!player) return { error: "Failed to insert player" };

        const updatedProfile = await updateProfileActiveGuild(user.id, guildId);

        if (!updatedProfile)
            return {
                error: "Failed to update profile active guild.",
                success: "Player created successfuly",
            };

        return { success: "Player created successfuly" };
    } else {
        //user has decided to use existing player information
        //switch existing players guild_id to this guild
        //switch any characters guild_id

        if (usersExistingPlayerOnSameServer) {
            const updatedPlayer = await updatePlayer(
                usersExistingPlayerOnSameServer.id,
                {
                    guild_id: guildId,
                }
            );

            if (!updatedPlayer) return { error: "Failed to update player" };

            const playersCharacters = await getCharactersByPlayerId(
                usersExistingPlayerOnSameServer.id
            );

            if (!playersCharacters)
                return { error: "Failed to get players characters" };

            if (playersCharacters && playersCharacters.length) {
                const updatedCharacters = await updatePlayersCharacters(
                    usersExistingPlayerOnSameServer.id,
                    { guild_id: guildId }
                );

                if (!updatedCharacters)
                    return { error: "Failed to update players characters" };

                return {
                    success:
                        "Player, and player's characters updated successfuly",
                };
            }
            return { success: "Joined guild successfully" };
        }

        return { error: "An unknown error occurred" };
    }
};
