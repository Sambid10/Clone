"use client"
import React from 'react'
import { followerInfo } from '@/lib/types'
import userFolloInfo from '@/hooks/useFolloinfo'
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '../ui/button'
import kyInstance from '@/lib/ky'
import { toast } from 'sonner'

interface Props{
userId:string,
    initialState:followerInfo
}
export default function FolloButton({userId,initialState}:Props) {
    const queryClient=useQueryClient()
    const {data}=userFolloInfo(userId,initialState)
    const queryKey:QueryKey=["follower-info,",userId];
    const {mutate}=useMutation({
        mutationFn:()=>data.isFollowing ? kyInstance.delete(`/api/user/${userId}/follow`) 
        :  kyInstance.post(`/api/user/${userId}/follow`),
        onMutate:async()=>{
          
          
          await queryClient.cancelQueries({queryKey})
          const previousState=queryClient.getQueryData<followerInfo>(queryKey)

          queryClient.setQueryData<followerInfo>(queryKey,()=>({
            followers:(previousState?.followers || 0) + (previousState?.isFollowing ? -1 :1),
            isFollowing:!previousState?.isFollowing
          }))

          return {previousState}
        },
        onError(error, variables, context) {
       
          queryClient.setQueryData(queryKey,context?.previousState)
          console.log(error)
        toast.error("ASS")
        },
     
    })
  return (
    <Button 
    onClick={()=>mutate()}
    size={"sm"}
    className={data.isFollowing ? " bg-[#cfcfcf]" : "bg-[#375a7f] hover:bg-[#375a7f]"}>
        <h1 className='text-base font-medium  font-cute1 text-[#ffffff]'>
        {data.isFollowing ? <h1 className='text-black'>Unfollow</h1> : "Follow"}
        </h1>
          
    </Button>
  )
}
