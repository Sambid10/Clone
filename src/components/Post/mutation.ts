import { DeletePost } from "@/action/deletePost";
import { PostPage } from "@/lib/types";
import { InfiniteData, QueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";


export function useDeletePostMutaion() {
    const queryClient = useQueryClient()
    const router = useRouter()
    const pathname = usePathname()
    const mutation = useMutation({
        mutationFn: DeletePost,
        onSuccess: async (deletedPost) => {
            const queryFilter: QueryFilters = {
                queryKey: ["post-feed,"]
            }
            await queryClient.cancelQueries(queryFilter)
            queryClient.setQueriesData<InfiniteData<PostPage, string | null>>(queryFilter,
                (oldata) => {
                    if (!oldata) return
                    return {
                        pageParams: oldata.pageParams,
                        pages: oldata.pages.map(page => ({
                            nextCursor: page.nextCursor,
                            posts: page.posts.filter(p => p.id !== deletedPost.id)

                        }))
                    }
                }
            )

            if (pathname === `/post/{deletedPost.id}`) {
                router.push(`/users/${deletedPost.user.username}`)
            }
            toast.success("Post Successfully deleted.", {
                   className: "bg-green-800 border-none text-[#ffffff] font-cute1 text-base"
            })


        },

        onError(error) {
            console.log(error)
            toast.error("Sorry,Please try again..")
        }
    })
    return mutation

}