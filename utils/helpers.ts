export const getDiscordServerImageUrl = (guild: PartialDiscordServer) => {
    if (!guild.icon)
        return `https://cdn.discordapp.com/embed/avatars/${
            parseInt(guild.id) % 5
        }.png`;
    return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`;
};
