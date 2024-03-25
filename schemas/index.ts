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
    name: z.string(),
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
