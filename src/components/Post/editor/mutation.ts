import { InfiniteData, QueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitPost } from "./action";
import { toast } from "sonner";
import { PostPage } from "@/lib/types";
import { useSession } from "@/app/(main)/SessionProvider";

export  function useSubmitPostMutation(){

    const {user}=useSession()
    const queryClient=useQueryClient()
    const mutation=useMutation({
        mutationFn:SubmitPost,
        onSuccess:async(nepost)=>{
                const queryFilter={
                    queryKey:["post-feed,"],
                    predicate(query){
                        return query.queryKey.includes("for-you") ||
                        (query.queryKey.includes("user-posts") && query.queryKey.includes(user.id))
                    }
                }satisfies QueryFilters
                await queryClient.cancelQueries(queryFilter)
                queryClient.setQueriesData<InfiniteData<PostPage,string | null>>
                (queryFilter,
                    (old)=>{
                        const firstpage=old?.pages[0];
                        if(firstpage){
                            return {
                                pageParams:old.pageParams,
                                pages:[{
                                    posts:[
                                        nepost,...firstpage.posts
                                    ],
                                    nextCursor:firstpage.nextCursor,
                                },
                                ...old.pages.slice(1)
                            ]
                            }
                        }
                  
                })
                queryClient.invalidateQueries({
                    queryKey:queryFilter.queryKey,
                    predicate(query){
                        return queryFilter.predicate(query) && !query.state.data
                    }
                })
                console.log("PP{{")
                toast.success("Post Created Sucessfully",{
                    className:"bg-green-800 border-none text-[#ffffff] font-cute1 text-base"
                })
        },
        onError(error){
            console.log(error)
            toast.error("Failed to post.Please try again")
        },

    })
    return mutation
}