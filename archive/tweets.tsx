"use client";

import { useEffect, useOptimistic } from "react";
// import { Likes } from "./likes";
// import { createBrowserClient } from "@/lib/supabase/browser-client";
import { useRouter } from "next/navigation";

//parent component query and mutation
//  const { data } = await supabase
//      .from("tweets")
//      .select("*, author: profiles(*), likes(user_id)");

//  const tweets =
//      data?.map((tweet) => ({
//          ...tweet,
//          author: Array.isArray(tweet.author) ? tweet.author[0] : tweet.author,
//          user_has_liked_tweet: !!tweet.likes.find(
//              (like) => like.user_id === session?.user.id
//          ),
//          likes: tweet.likes.length,
//      })) ?? [];

// export const Tweets = ({ tweets }: { tweets: TweetWithAuthor[] }) => {
//     const router = useRouter();

//     const [optimisticTweets, addOptimisticTweet] = useOptimistic<
//         TweetWithAuthor[],
//         TweetWithAuthor
//     >(tweets, (currentOptimisticTweets, newTweet) => {
//         const newOptimisticTweets = [...currentOptimisticTweets];

//         const index = newOptimisticTweets.findIndex(
//             (tweet) => tweet.id === newTweet.id
//         );

//         newOptimisticTweets[index] = newTweet;

//         return newOptimisticTweets;
//     });

//     const supabase = createBrowserClient();

//     useEffect(() => {
//         const channel = supabase
//             .channel("realtime tweets")
//             .on(
//                 "postgres_changes",
//                 {
//                     event: "*",
//                     schema: "public",
//                     table: "tweets",
//                 },
//                 (payload) => {
//                     router.refresh();
//                 }
//             )
//             .subscribe();

//         return () => {
//             supabase.removeChannel(channel);
//         };
//     }, [supabase, router]);

//     return optimisticTweets.map((tweet) => (
//         <div key={tweet.id}>
//             <p>
//                 {tweet.author.name} {tweet.author.username}
//             </p>
//             <p>{tweet.title}</p>
//             <Likes tweet={tweet} addOptimisticTweet={addOptimisticTweet} />
//         </div>
//     ));
// };
