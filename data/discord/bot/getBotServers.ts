export const getBotServers = async () => {
    const URL = "https://discord.com/api/v10/users/@me/guilds";

    const options = {
        method: "GET",
        headers: {
            Authorization: `Bot ${process.env.NEXT_PUBLIC_DISCORD_BOT_TOKEN}`,
        },
    };

    try {
        const res = await fetch(URL, options);
        const data: PartialDiscordServer[] = await res.json();

        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
};
