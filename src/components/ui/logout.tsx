"use client"
import React, { useTransition } from 'react'
import { Button } from './button'
import { useRouter } from 'next/navigation'
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
import { signOut } from '@/app/(auth)/signout/action'
import { LoaderCircle } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
export default function Logout() {
  const [isPending, startTransition] = useTransition()
  const queryClient=useQueryClient()
  const router = useRouter()
  const handleSignout = () => {
    startTransition(async () => {
      queryClient.clear();
      const { success } = await signOut()
      if (success) {
        router.push("/signin")
      }
    })
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size={'default'} variant={'outline'} className='cursor-pointer h-full w-full flex justify-start '>
          <h1 className='text-base font-normal text-md'>Signout</h1>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='font-cute1'>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            <h1>Are You sure you want to Signout?</h1>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <Button onClick={handleSignout} className='bg-gradient-to-r from-purple-700 via-pink-700 to-orange-700 text-[#FCFCFC]'>
            {isPending ? <LoaderCircle className='animate-spin' /> :
              <h1 className=' font-medium'>Yes</h1>
            }
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
