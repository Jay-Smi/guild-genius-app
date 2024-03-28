import { getGuildByDiscordServerId } from "@/data/guild";
import { JoinGuildButton } from "./join-guild-button";
import { getServerMemberById } from "@/data/discord/bot/get-server-member";
import GuildCard from "../../_components/guild-card";

type JoinGuildWrapperProps = {
    server: PartialDiscordServer;
    user: CompleteUser;
    joined: boolean;
};

export const JoinGuildWrapper = async ({
    server,
    user,
    joined,
}: JoinGuildWrapperProps) => {
    const guild = await getGuildByDiscordServerId(server.id);

    if (!guild) return null;

    const serverMember = await getServerMemberById(server.id, user.discord_id);

    if (!serverMember) return null;

    const userMayJoinGuild = !!guild.roles_that_may_join?.some((roleId) =>
        serverMember.roles.includes(roleId)
    );

    return (
        <JoinGuildButton
            server={server}
            guild={guild}
            serverMember={serverMember}
            joined={joined}
            mayJoin={userMayJoinGuild}
        />
    );
};
