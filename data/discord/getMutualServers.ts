import { getGuildsByDiscordServerIdArray } from "../guild";
import { getBotServers } from "./bot/getBotServers";
import { getUserServers } from "./user/getUserServers";

export const getMutualServers = async () => {
    try {
        const userServers = await getUserServers();

        const botServers = await getBotServers();

        if (!userServers || !botServers) return null;

        const mutualServers = userServers?.filter((server) =>
            botServers?.some((botServer) => botServer.id === server.id)
        );

        const mutualServerIds = mutualServers.map((guild) => guild.id);

        const mutualGuildsInApp = await getGuildsByDiscordServerIdArray(
            mutualServerIds
        );

        const mutualServersInApp = mutualServers.filter((server) =>
            mutualGuildsInApp?.some(
                (guild) => guild.discord_server_id === server.id
            )
        );

        return mutualServersInApp;
    } catch (err) {
        console.log(err);
        return null;
    }
};
