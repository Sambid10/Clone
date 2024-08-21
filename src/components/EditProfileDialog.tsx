"use client"
import { Userdata } from '@/lib/types'
import React from 'react'
import { useState,useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogDescription, DialogTitle } from './ui/dialog'
import * as z from "zod"
import { useForm } from 'react-hook-form'
import { updateUserProfileSchema, updateUserProfileSchemaValues } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useUpdateProfileMutation } from '@/app/(main)/user/[username]/profile/mutatation'
import { LoaderCircle } from 'lucide-react'
import { Textarea } from './ui/textarea'
interface Props {
  user: Userdata,
  open: boolean,
  onOpenChange: (open: boolean) => void

}
export default function EditProfileDialog({ user, onOpenChange, open }: Props) {


  const form = useForm<z.infer<typeof updateUserProfileSchema>>({
    resolver: zodResolver(updateUserProfileSchema),
    defaultValues: {
      bio:"",
      displayName: user.displayName,
    },

  })
  const mutation=useUpdateProfileMutation()
  async function handleProfileUpdate(values:updateUserProfileSchemaValues){
    mutation.mutate({
      values,
    },{
      onSuccess:()=>{
        onOpenChange(false)
      }
    }
    
  )
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className='text-2xl'>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            className='flex flex-col gap-4 mt-2'
            onSubmit={form.handleSubmit(handleProfileUpdate)}>

            <FormField
              name='displayName'
              control={form.control}
              render={({ field }) =>
                <FormItem>
                  <div className='flex justify-between'>
                    <FormLabel>DisplayName:</FormLabel>
                    <FormMessage />
                  </div>
                  <FormControl>
                    <Input className='text-sm' {...field} placeholder='Enter your DisplayName' />
                  </FormControl>
                </FormItem>
              }
            />
            <FormField
              name='bio'
              control={form.control}
              render={({ field }) =>
                <FormItem>
                  <div className='flex justify-between'>
                    <FormLabel>Bio:</FormLabel>
                    <FormMessage />
                  </div>

                  <FormControl>
                    <Textarea {...field} placeholder='Enter your Bio' />
                   
                  </FormControl>
                </FormItem>
              }
            />
            <div className='flex justify-end'>
            <Button 
            className='w-32'
            size={'sm'}
            disabled={mutation.isPending}
            type='submit'>
              {mutation.isPending ?
                <LoaderCircle className='animate-spin'/> :
                <h1>Submit</h1>
              }
            </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
interface AvatarUrlProps{
  url:string,

}

export function AvatarUrlProfile({url}:AvatarUrlProps){
  return(
    <>
    </>
  )
}

