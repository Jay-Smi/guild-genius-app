import AuthButtonServer from "@/components/auth/auth-button-server";
import { ThemeSwitch } from "@/components/theme-switch";
import { NavButton } from "./nav-button";
import { Logo } from "@/components/logo";

export const Navbar = () => {
    const navLinks = [{ name: "Theme", path: "/theme-playground" }];
    return (
        <nav className="flex items-center justify-between py-3 pl-0.5 pr-2.5">
            <div className="flex items-center gap-x-5">
                <Logo />
                {navLinks.map((link) => (
                    <NavButton
                        key={link.name}
                        name={link.name}
                        path={link.path}
                    />
                ))}
            </div>

            <div className="flex gap-x-5 items-center">
                <ThemeSwitch />
                <AuthButtonServer />
            </div>
        </nav>
    );
};
