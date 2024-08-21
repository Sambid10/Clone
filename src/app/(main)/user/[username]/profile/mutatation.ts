"use client"
import { useUploadThing } from "@/lib/uploadthing";
import { updateUserProfileSchemaValues } from "@/lib/validation";
import { InfiniteData, QueryFilters, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { updateUserProfile } from "./action";
import { PostPage } from "@/lib/types";
import { toast } from "sonner";

export function useUpdateProfileMutation(){
    const router=useRouter()
    const queryClient=useQueryClient()

    const {startUpload:StartAvatarUpload} = useUploadThing("avatar")

    const mutation=useMutation({
        mutationFn:async({values,avatar}:{values:updateUserProfileSchemaValues,avatar?:File})=>{
                return Promise.all([
                    updateUserProfile(values),
                    avatar && StartAvatarUpload([avatar])
                ])
        },
        onSuccess:async([ updatedUser,uploadResult])=>{
            const nayaAvatarUrl=uploadResult?.[0].serverData.avatarUrl

            const queryFilter:QueryFilters={
                queryKey:["post-feed,"]
            }
            await queryClient.cancelQueries(queryFilter)

            queryClient.setQueriesData<InfiniteData<PostPage,string | null>>(
                queryFilter,
                (olddata)=>{
                    if(!olddata) return;

                    return{
                        pageParams:olddata.pageParams,
                        pages:olddata.pages.map(page=>({
                            nextCursor:page.nextCursor,
                            posts:page.posts.map(post=>{
                                if(post.user.id === updatedUser?.id){
                                    return {
                                        ...post,
                                        user:{
                                            ...updatedUser,
                                            avatatarUrl:nayaAvatarUrl || updatedUser.avatatarUrl
                                        }
                                    }
                                }
                                return post
                            })
                        }))
                    }
                }
            )
            router.refresh()
            toast.success("Profile Updated")
        
        },

        onError(error){
            console.log(error)
            toast.error("Something went wrong.Please try again..")
        }
    })
    return mutation
}