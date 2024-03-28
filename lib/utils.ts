import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

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

export const intToHexColor = (intColor: number): string => {
    return "#" + intColor.toString(16).padStart(6, "0");
};

export type RGBColor = {
    r: number;
    g: number;
    b: number;
};

export const getContrastingTextColor = (color: RGBColor) => {
    const luminance = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;

    return luminance > 182 ? "black" : "white";
};

export const hexToRgb = (hex: string): RGBColor => {
    // Remove '#' if present
    hex = hex.replace(/^#/, "");

    // Parse hexadecimal components
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return { r, g, b };
};
