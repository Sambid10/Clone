"use client"
import { useSession } from '@/app/(main)/SessionProvider'
import { followerInfo, Userdata } from '@/lib/types'
import React, { PropsWithChildren } from 'react'
import { Tooltip, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { TooltipContent } from '@radix-ui/react-tooltip'
import Link from 'next/link'
import UserButton from './ui/UserButton'
import FolloButton from './FolloButton/FolloButton'
import FollowCount from './Follo/FollowCount'


interface ProfileToolTipsProps extends PropsWithChildren {
    user: Userdata
}
export default function ProfileToolTips({ children, user }: ProfileToolTipsProps) {
    const { user: loggedInuser } = useSession()
    const followerState: followerInfo = { followers: user._count.followers, isFollowing: !!user.followers.some(({ FollowerId }) => FollowerId === loggedInuser.id) }
    return (

        <TooltipProvider>
            <Tooltip delayDuration={150}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent align='start' className='px-2 py-2 bg-[#121212] rounded-xl w-52'>
                    <div className='flex justify-between border-b py-2'>
                        <UserButton clickable={false} />
                        {user.id !== loggedInuser.id &&
                            <FolloButton userId={user.id} initialState={followerState} />
                        }
                    </div>

                    <div className='flex flex-col'>
                        <div className='flex gap-1 items-center'>
                            <h1 className='text-lg capitalize'>{user.username}</h1>
                            <h1 className='text-sm text-gray-400'>@{user.displayName}</h1>
                        </div>
                        <FollowCount initialState={followerState} userId={user.id}/>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
