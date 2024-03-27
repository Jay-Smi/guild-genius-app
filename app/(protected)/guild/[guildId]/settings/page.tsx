import { Error } from "@/components/error";
import { CreateGuildForm } from "@/components/forms/create-guild-form";
import { GuildConfigForm } from "@/components/forms/guild-config-form";
import { getBotServerById } from "@/data/discord/bot/get-bot-server";
import { getUserAdminServers } from "@/data/discord/user/getUserAdminServers";
import { getGuildById } from "@/data/guild";
import { getProfileBySession } from "@/data/profile";
import { getUserProfilePlayersCharactersGuilds } from "@/data/user";
import {
    WowFaction,
    WowRegion,
    WowSodRealm,
    WowVersion,
} from "@/enums/wow-enums";
import { redirect } from "next/navigation";

//roles that may join
//roles that may create raids
//guild time zone

//member management
//delete guild

//name
//icon
//region
//faction
//realm
//discord_server
//wow_version

type GuildSettingsPageProps = {
    params: {
        guildId: string;
    };
};

const GuildSettingsPage = async ({ params }: GuildSettingsPageProps) => {
    //same checks as layout but with guild owner check as well
    const userProfile = await getProfileBySession();

    if (!userProfile) redirect("/");

    const completeUser = await getUserProfilePlayersCharactersGuilds(
        userProfile.id
    );

    if (!completeUser) redirect("/");

    const guild = await getGuildById(+params.guildId);

    if (!guild)
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="max-w-[600px]">
                    <Error user={completeUser} variant="no-access" />
                </div>
            </div>
        );

    if (!completeUser.guilds.find((g) => g.id === +params.guildId))
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="max-w-[600px]">
                    <Error user={completeUser} variant="no-access" />
                </div>
            </div>
        );

    //user is not guild owner
    if (guild.user_id !== userProfile.id)
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="max-w-[600px]">
                    <Error user={completeUser} variant="no-access" />
                </div>
            </div>
        );

    const userAdminServers = await getUserAdminServers();

    const fullServer = await getBotServerById(guild.discord_server_id);

    if (!fullServer)
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="max-w-[600px]">
                    <Error user={completeUser} variant="no-access" />
                </div>
            </div>
        );

    return (
        <div className="flex flex-col md:flex-row gap-4 justify-center">
            <GuildConfigForm
                fullDiscordServer={fullServer}
                defaults={{
                    roles_that_may_join: guild.roles_that_may_join || [],
                    roles_that_may_create_raids:
                        guild.roles_that_may_create_raids || [],
                    guild_timezone: guild.guild_timezone || "",
                }}
                guildId={+params.guildId}
            />
            <CreateGuildForm
                userAdminServers={userAdminServers || []}
                editGuildDefaults={{
                    name: guild.name,
                    discord_server_id: guild.discord_server_id,
                    faction: guild.faction as WowFaction,
                    region: guild.region as WowRegion,
                    realm: guild.realm as WowSodRealm,
                    version: guild.wow_version as WowVersion,
                }}
                guildId={guild.id}
            />
        </div>
    );
};

export default GuildSettingsPage;
