export const getDiscordServerImageUrl = (
    id: string,
    iconHash: string | null
) => {
    if (!iconHash)
        return `https://cdn.discordapp.com/embed/avatars/${
            parseInt(id) % 5
        }.png`;
    return `https://cdn.discordapp.com/icons/${id}/${iconHash}.png`;
};
