"use client"
import { Button } from '../ui/button'
import React from 'react'
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Loader2, Trash } from 'lucide-react'
import { useDeletePostMutaion } from './mutation'
import { PostDataTypes } from '@/lib/types'
interface Props {
    post: PostDataTypes
}
export default function DeleteDialog({ post }: Props) {
    const mutation = useDeletePostMutaion()
    const handleDelete = () => {
        mutation.mutate(post.id)
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger className='h-full w-[100%]'>
                <div className='flex gap-1 items-center hover:bg-[#000] py-2 px-2 w-[100%] ease-in duration-200'>
                    <Trash className='text-red-500' size={18}/>
                    Delete
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your post
                        and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                        className='bg-gradient-to-r from-purple-800 via-pink-800 to-orange-800 text-[#FCFCFC] hover:from-purple-700 hover:via-pink-700 hover:to-orange-700'
                        onClick={handleDelete}>
                        {mutation.isPending ?
                            <Loader2 className='animate-spin' />
                            : <h1>Ok</h1>
                        }
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
