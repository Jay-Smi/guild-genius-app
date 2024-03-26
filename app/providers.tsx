"use client";

import { Notification } from "@/components/notification";
import { Toaster } from "@/components/ui/sonner";
import { ModalProvider } from "@/components/modals/modal-provider";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Toaster />
            <Notification />
            <ModalProvider />
            {children}
        </ThemeProvider>
    );
}
