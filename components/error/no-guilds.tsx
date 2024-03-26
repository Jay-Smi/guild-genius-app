import Image from "next/image";

type NoGuildsProps = {
    completeUser: CompleteUser;
};

export const NoGuilds = ({ completeUser }: NoGuildsProps) => {
    return (
        <div className="w-full h-full flex flex-col gap-6 items-center justify-start bg-red-500/20 border-4 border-destructive  rounded-xl p-4">
            <Image
                src="https://cdn.discordapp.com/emojis/1188562250890485862.webp?size=96&quality=lossless"
                alt="Blockin"
                width={80}
                height={80}
                className="w-[80px] h-[80px]"
            />
            <div>
                <h1 className="font-semibold text-[2rem] text-center">
                    No guilds detected
                </h1>
                <p className="text-muted-foreground">
                    Join or create a guild to get started
                </p>
            </div>
        </div>
    );
};
