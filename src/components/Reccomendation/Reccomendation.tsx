"use server"
import { validateRequest } from '@/auth'
import prisma from '@/lib/db'
import { getUserDataSelect } from '@/lib/types'
import React from 'react'
import UserButton from '../ui/UserButton'
import FolloButton from '../FolloButton/FolloButton'
import Link from 'next/link'

export default async function Reccomendation() {
    const { user: loggedInUser } = await validateRequest()
    if (!loggedInUser) return null
    const noofusers = await prisma.user.count()
    const usersubscribe = await prisma.user.findMany({
        where: {
            NOT: {
                id: loggedInUser.id
            },
            followers: {
                none: {
                    FollowerId: loggedInUser.id
                }
            }
        },
        select: getUserDataSelect(loggedInUser.id),
        take: 4,
        skip: 5//Math.floor(Math.random() * noofusers)
    })
    return (
        <>
            {usersubscribe.map((user, i) =>
                <div className='px-4 font-cute1' key={i}>
                    <div className='flex justify-between bg-background px-2 py-1 rounded-xl items-center border'>
                        <div className='flex gap-2 items-center'>
                            <UserButton clickable={false} />
                            <div className='flex flex-col'>
                                <Link href={`/user/${user.username}/profile`} className='hover:underline underline-offset-2'>
                                    <h1 className='capitalize text-lg font-medium'>{user.username}</h1>
                                </Link>

                                <h2 className='text-muted-foreground text-sm'>@{user.displayName}</h2>
                            </div>
                        </div>
                        <div>
                            {/* <Button variant={'secondary'} size={'sm'} className='bg-gradient-to-r from-purple-700 via-pink-700 to-orange-700 text-[#ffffff] hover:from-purple-600 hover:via-pink-600 hover:to-orange-600'>
                            <h1 className='text-[1rem] font-medium'>Follow </h1>
                        </Button> */}
                            <FolloButton userId={user.id} initialState={{
                                followers: user._count.followers, 
                                isFollowing: user.followers.some(
                                    ({ FollowerId }) => FollowerId === user.id)
                            }} />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
