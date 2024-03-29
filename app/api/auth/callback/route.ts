import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const cookieStore = cookies();

    const requestUrl = new URL(request.url);

    const code = requestUrl.searchParams.get("code");

    const error = requestUrl.searchParams.get("error_description");

    if (error)
        return NextResponse.redirect(`${requestUrl.origin}?error=${error}`);

    if (!code) {
        return NextResponse.redirect(`${requestUrl.origin}/`, {
            status: 302,
        });
    }
    const supabase = createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    cookieStore.set({ name, value, ...options });
                },
                remove(name: string, options: CookieOptions) {
                    cookieStore.set({ name, value: "", ...options });
                },
            },
        }
    );

    const tokenResponse = await supabase.auth.exchangeCodeForSession(code);

    const providerToken = tokenResponse.data?.session?.provider_token;

    if (
        tokenResponse &&
        tokenResponse.data &&
        tokenResponse.data.session &&
        tokenResponse.data.session.provider_token
    ) {
        cookieStore.set("oauth_provider_token", providerToken || "", {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            path: "/",
            sameSite: "none",
            secure: true,
            httpOnly: true,
        });
    }
    return NextResponse.redirect(`${requestUrl.origin}/manage/my-guilds`, {
        status: 302,
        headers: {
            "Set-Cookie": `oauth_provider_token=${providerToken}; Path=/; Max-Age=2592000; SameSite=None; Secure; HttpOnly`,
        },
    });
}
