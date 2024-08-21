"use server"

import { validateRequest } from "@/auth"
import prisma from "@/lib/db"
import { PostDataInclude } from "@/lib/types"
import {  PostSchema } from "@/lib/validation"

export const SubmitPost=async(input:string)=>{
    const {user}=await validateRequest()
    if(!user) throw Error("Not Authorized")
    const {content}=PostSchema.parse({content:input})
    console.log(content)
   const nepost= await prisma.post.create({
    data:{
        userId:user.id,
        content:content
    },include:PostDataInclude(user.id)
   })
    return nepost
}