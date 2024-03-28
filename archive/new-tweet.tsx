// import { createServerClient } from "@/lib/supabase/server-client";
// import { revalidatePath } from "next/cache";

// export default function NewTweet() {
//     const addTweet = async (formData: FormData) => {
//         "use server";

//         const title = formData.get("title") as string;

//         const supabase = createServerClient();

//         const {
//             data: { user },
//         } = await supabase.auth.getUser();

//         if (user) {
//             await supabase
//                 .from("tweets")
//                 .insert({ title, profile_id: user.id });
//             revalidatePath("/");
//         }
//     };

//     return (
//         <form action={addTweet}>
//             <input name="title" className="bg-inherit" />
//         </form>
//     );
// }
