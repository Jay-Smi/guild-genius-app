"use client";

import { cn } from "@/lib/utils";

export const ThemeDisplay = () => {
    const colorArray: string[] = [
        "background",
        "foreground",
        "card",
        "card-foreground",
        "popover",
        "popover-foreground",
        "primary",
        "primary-foreground",
        "secondary",
        "secondary-foreground",
        "muted",
        "muted-foreground",
        "accent",
        "accent-foreground",
        "destructive",
        "destructive-foreground",
        "border",
        "input",
        "ring",
    ];

    return (
        <div className="flex flex-row flex-wrap gap-8 ">
            {colorArray.map((color) => (
                <div
                    key={color}
                    className="h-[180px] w-[180px]"
                    style={{ backgroundColor: `hsl(var(--${color}))` }}
                >
                    <p className="bg-black text-white">{color}</p>
                </div>
            ))}
        </div>
    );
};
