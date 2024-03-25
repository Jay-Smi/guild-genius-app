import { createServerClient } from "@/lib/supabase/clients/server-client";

export const getSession = async () => {
    const supabase = createServerClient();

    const {
        data: { session },
    } = await supabase.auth.getSession();

    return session;
};
