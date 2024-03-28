"use client";

// import { createBrowserClient } from "@/lib/supabase/clients/browser-client";
// import { useRouter } from "next/navigation";
// import { useTransition } from "react";

// export const Likes = ({
//     tweet,
//     addOptimisticTweet,
// }: {
//     tweet: TweetWithAuthor;
//     addOptimisticTweet: (newTweet: TweetWithAuthor) => void;
// }) => {
//     const router = useRouter();

//     const [isPending, startTransition] = useTransition();

//     const handleLikes = async () => {
//         const supabase = createBrowserClient();

//         startTransition(async () => {
//             const {
//                 data: { user },
//             } = await supabase.auth.getUser();

//             if (user) {
//                 if (tweet.user_has_liked_tweet) {
//                     addOptimisticTweet({
//                         ...tweet,
//                         likes: tweet.likes - 1,
//                         user_has_liked_tweet: !tweet.user_has_liked_tweet,
//                     });

//                     await supabase
//                         .from("likes")
//                         .delete()
//                         .match({ user_id: user.id, tweet_id: tweet.id });
//                 } else {
//                     addOptimisticTweet({
//                         ...tweet,
//                         likes: tweet.likes + 1,
//                         user_has_liked_tweet: !tweet.user_has_liked_tweet,
//                     });

//                     await supabase
//                         .from("likes")
//                         .insert({ user_id: user.id, tweet_id: tweet.id });
//                 }

//                 router.refresh();
//             }
//         });
//     };

//     return (
//         <button onClick={handleLikes} disabled={isPending}>
//             {tweet.likes} Likes
//         </button>
//     );
// };
