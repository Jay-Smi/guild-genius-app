import { getMutualServers } from "@/data/discord/getMutualServers";

const JoinGuildsPage = async () => {
    const mutualServers = await getMutualServers();

    if (!mutualServers)
        return <div>Error fetching from database, try refreshing</div>;

    return (
        <div>
            {mutualServers.length ? "" : <div>No guilds available to join</div>}
        </div>
    );
};

export default JoinGuildsPage;
