"use client"
import React from 'react'
import { EllipsisVertical } from 'lucide-react'
import { PostDataTypes } from '@/lib/types'
interface Props {
    post: PostDataTypes
}
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DeleteDialog from './DeleteDialog'
export default function MorePostButton({ post }: Props) {
    return (
        <>
            <DropdownMenu >
                <DropdownMenuTrigger className='mt-3'>
                    <EllipsisVertical size={20} className='opacity-50 hover:opacity-100'/>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='px-2 py-2' align='end'>
                   <DeleteDialog post={post}/>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
