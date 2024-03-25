import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export type SidebarNavItemProps = {
    icon: React.ReactNode;
    title: string;
    href: string;
    sidebarOpen: boolean;
    showTitle: boolean;
    disabled?: boolean;
    active?: boolean;
};

export const SidebarNavItem = ({
    icon,
    title,
    href,
    active,
    sidebarOpen,
    showTitle,
    disabled,
}: SidebarNavItemProps) => {
    return (
        <Hint
            label={disabled ? "No guild selected" : title}
            side="right"
            align="center"
            sideOffset={10}
        >
            <Link
                href={href}
                className={cn(
                    "h-[4rem] w-full flex items-center",
                    disabled && "pointer-events-none"
                )}
                aria-disabled={disabled}
                tabIndex={disabled ? -1 : undefined}
            >
                <Button
                    variant="ghost"
                    className={cn(
                        "flex items-center justify-start w-full h-full rounded-lg transition-colors duration-200 text-background-foreground bg-card/60 hover:bg-primary/80 border border-accent",
                        active ? "bg-primary/60 " : " "
                    )}
                    disabled={disabled}
                >
                    {icon}
                    {sidebarOpen && showTitle && (
                        <p className="ml-4">{title}</p>
                    )}
                </Button>
            </Link>
        </Hint>
    );
};
