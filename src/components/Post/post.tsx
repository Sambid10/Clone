"use client"
import { PostDataTypes } from '@/lib/types'
import React from 'react'
import UserButton from '../ui/UserButton'
import { GetDate } from '@/lib/utils'
import { useSession } from '@/app/(main)/SessionProvider'
import MorePostButton from './MorePostButton'
import Link from 'next/link'
import Linkify from '../Linkify'
import ProfileToolTips from '../ProfileToolTips'
interface Props {
    post: PostDataTypes
}
export default function PostContainer({ post }: Props) {
    const { user } = useSession()
    return (
        <article
            className='flex justify-between border-b border-t items-start group'
        >
            <div className='flex  gap-2 py-4 px-1'>
                <div className='flex justify-between'>

                    <Link href={`/user/${post.user.username}/profile`}>
                        <UserButton clickable={false} />
                    </Link>



                </div>
                <div className='flex flex-col '>

                    <div className='flex gap-2 items-center'>
                        <ProfileToolTips
                            user={post.user}
                        >
                            <Link href={`/user/${post.user.username}/profile`} className='hover:underline underline-offset-2'>

                            <h1 className='capitalize text-lg font-semibold'>{post.user.username}</h1>
                               </Link>
                        </ProfileToolTips>

                     
                        <h2 className='text-gray-400 text-sm'>@{post.user.displayName}</h2>

                        <p className='text-gray-400 text-sm ml-[-5px]'>&middot;{GetDate(post.createdAt)}</p>
                    </div>
                    <Linkify>
                        <p className='mt-1 whitespace-pre-line break-words'>{post.content}</p>
                    </Linkify>

                </div>


            </div>
            <div>
                {post.user.id === user.id &&

                    <MorePostButton
                        post={post}
                    />

                }
            </div>
        </article>
    )
}
