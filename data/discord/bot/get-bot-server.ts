export const getBotServerById = async (serverId: string) => {
    const URL = `https://discord.com/api/v10/guilds/${serverId}`;

    const options = {
        method: "GET",
        headers: {
            Authorization: `Bot ${process.env.NEXT_PUBLIC_DISCORD_BOT_TOKEN}`,
        },
        query: {
            with_counts: true,
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
