import {
    WowFaction,
    WowRegion,
    WowSodRealm,
    WowVersion,
} from "@/enums/wow-enums";
import * as z from "zod";

//name
//discord_server_id
//region
//faction
//realm
//version
export const CreateGuildSchema = z.object({
    playerName: z.optional(z.string().min(2).max(50)),
    name: z.string().min(2).max(50),
    discord_server_id: z.string(),
    faction: z.enum([WowFaction.ALLIANCE, WowFaction.HORDE]),
    region: z.enum([
        WowRegion.EU,
        WowRegion.US,
        WowRegion.KR,
        WowRegion.CN,
        WowRegion.TW,
    ]),
    version: z.enum([WowVersion.SOD]),
    realm: z.enum([
        WowSodRealm.CRUSADER_STRIKE,
        WowSodRealm.LONE_WOLF,
        WowSodRealm.LIVING_FLAME,
        WowSodRealm.WILD_GROWTH,
        WowSodRealm.SHADOWSTRIKE,
        WowSodRealm.CHAOS_BOLT,
        WowSodRealm.LAVA_LASH,
        WowSodRealm.PENANCE,
    ]),
});

export const GuildConfigSchema = z.object({
    permittedRoles: z.array(z.string()),
    create_raids_permitted_roles: z.array(z.string()),
    guild_timezone: z.string(),
});
