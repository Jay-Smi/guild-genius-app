import { getUserServers } from "./getUserServers";

export const getUserAdminServers = async () => {
    const userGuilds = await getUserServers();

    if (!userGuilds) return null;

    const userAdminServers = userGuilds.filter(
        ({ permissions }) => (+permissions & 0x8) === 0x8
    );

    return userAdminServers;
};
