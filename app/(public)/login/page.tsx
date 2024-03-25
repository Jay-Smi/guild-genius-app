import AuthButtonServer from "@/components/auth/auth-button-server";
import { getSession } from "@/lib/supabase/session";

export default async function Login() {
    const session = await getSession();

    // if (session) {
    //     redirect("/");
    // }

    return (
        <>
            LOGIN PAGE
            <AuthButtonServer />
        </>
    );
}
