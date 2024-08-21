"use client"
import kyInstance from "@/lib/ky";
import { followerInfo } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function userFolloInfo(userId:string,initialState:followerInfo){
    const query=useQuery({
        queryKey:["follower-info,",userId],
        queryFn:()=>kyInstance.get(`/api/user/${userId}/follow`).json<followerInfo>(),
        initialData:initialState,
        staleTime:Infinity,
    })
    return query
}