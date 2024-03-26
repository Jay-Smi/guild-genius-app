import Hint from "@/components/hint";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface FooterProps {
    name: string;
    region?: string;
    faction?: string;
    realm?: string;
    wow_version?: string;
    isActiveGuild: boolean;
    onClick: () => void;
    disabled: boolean;
}

const Footer = ({
    name,
    region,
    faction,
    realm,
    wow_version,
    isActiveGuild,
    onClick,
    disabled,
}: FooterProps) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        onClick();
    };

    return (
        <div className="relative bg-secondary p-3">
            <p className="text-[13px] truncate max-w-[calc(100%-20px)]">
                {name}
            </p>
            {region && realm && faction && wow_version && (
                <>
                    <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate">
                        {region}, {realm}
                    </p>
                    <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate">
                        {wow_version}, {faction}
                    </p>
                </>
            )}

            {!region && (
                <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground text-wrap">
                    Join or create a guild to get started
                </p>
            )}

            {region && realm && faction && wow_version && (
                <Hint label="Set active guild">
                    <button
                        disabled={disabled || isActiveGuild}
                        onClick={handleClick}
                        className={cn(
                            "opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground hover:text-primary",
                            disabled && "cursor-not-allowed opacity-75"
                        )}
                    >
                        <Star
                            className={cn(
                                "h-4 w-4",
                                isActiveGuild && "fill-primary text-primary"
                            )}
                        />
                    </button>
                </Hint>
            )}
        </div>
    );
};

export default Footer;
