import UserButton from "@/components/auth/user-button/index";
import { Logo } from "@/components/logo";

type DashboardNavbarProps = {
    user: CompleteUser;
};

export const DashboardNavbar = async ({ user }: DashboardNavbarProps) => {
    return (
        <nav className="flex items-center justify-between py-3 pl-0.5 pr-2.5 ">
            <div className="flex items-center gap-x-5">
                <Logo destination="dashboard" />
            </div>

            <div className="flex gap-x-5">
                <UserButton user={user} />
            </div>
        </nav>
    );
};
