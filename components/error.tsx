import Image from "next/image";
import { Button } from "./ui/button";
import { BackButton } from "./back-button";

type NoGuildsProps = {
    variant?: "no-guild" | "no-access" | "no-guilds-detected";
    user?: CompleteUser;
};

export const Error = ({ variant = "no-guild", user }: NoGuildsProps) => {
    return (
        <div className="w-full h-full flex flex-col md:flex-row gap-6 items-center justify-start bg-red-500/20 border-4 border-destructive  rounded-xl p-4">
            <Image
                src="https://cdn.discordapp.com/emojis/1188562250890485862.webp?size=96&quality=lossless"
                alt="Blockin"
                width={80}
                height={80}
                className="w-[80px] h-[80px] rounded-full"
            />
            <div>
                <h1 className="font-semibold text-[2rem] text-center">
                    {variant === "no-guild" && "No guilds detected"}
                    {variant === "no-access" &&
                        "You do not have permission to view this guild"}
                </h1>
                {variant === "no-guild" && (
                    <p className="text-muted-foreground">
                        Join or create a guild to get started
                    </p>
                )}
                {variant === "no-access" && (
                    <BackButton className="text-2xl font-semibold text-background-foreground" />
                )}
            </div>
        </div>
    );
};
