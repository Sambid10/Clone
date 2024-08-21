"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from './ui/button'
import { Userdata } from '@/lib/types'
import EditProfileDialog from './EditProfileDialog'
interface Props{
    user:Userdata
}
export default function EditProfileButton({user}:Props) {
    const [isDialogOpen,setDialogOpen]=useState(false)
  return (
    <>
     <Button 
    variant={"outline"}
    onClick={()=>setDialogOpen((prev)=>!prev)}>
        Edit Profile
    </Button>
        <EditProfileDialog user={user}
        onOpenChange={setDialogOpen}
        open={isDialogOpen}
        />
    </>
   

  )
}
