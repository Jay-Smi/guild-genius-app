import { Navbar } from "./_components/navbar";

type PublicLayoutProps = {
    children: React.ReactNode;
};

const PublicLayout = ({ children }: PublicLayoutProps) => {
    return (
        <div className="flex flex-col h-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/25 dark:from-primary/40 to-background">
            <Navbar />
            <main className="h-full ">{children}</main>
        </div>
    );
};

export default PublicLayout;
