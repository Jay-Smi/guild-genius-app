import { Guild } from "discord.js";

export const getServerMemberById = async (
    serverId: string,
    memberId: string
) => {
    const URL = `https://discord.com/api/v10/guilds/${serverId}/members/${memberId}`;

    const options = {
        method: "GET",
        headers: {
            Authorization: `Bot ${process.env.NEXT_PUBLIC_DISCORD_BOT_TOKEN}`,
        },
    };

    try {
        const res = await fetch(URL, options);
        const data = await res.json();

        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
};
