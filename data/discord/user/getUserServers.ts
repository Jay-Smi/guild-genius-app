import { cookies } from "next/headers";

export const getUserServers = async () => {
    const URL = "https://discord.com/api/v10/users/@me/guilds";

    const providerToken = cookies().get("oauth_provider_token");

    if (!providerToken) return null;

    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${providerToken.value}`,
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
