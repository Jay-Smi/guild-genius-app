import Image from "next/image";

export const Loading = () => {
    return (
        <div className="h-full w-full flex flex-col gap-y-4 justify-center items-center bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/25 dark:from-primary/40 to-background">
            <Image
                src="/logo.svg"
                priority
                alt="Logo"
                width={120}
                height={120}
                className="animate-pulse duration-700"
            />
        </div>
    );
};
