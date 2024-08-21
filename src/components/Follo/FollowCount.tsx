"use client"
import userFolloInfo from '@/hooks/useFolloinfo'
import { followerInfo } from '@/lib/types'
import React from 'react'

interface Props{
    userId:string,initialState:followerInfo
}


export default function FollowCount({initialState,userId}:Props) {
    const {data}=userFolloInfo(userId,initialState)
  return (
    <span>
      Followers:{data.followers}
    </span>
  )
}
