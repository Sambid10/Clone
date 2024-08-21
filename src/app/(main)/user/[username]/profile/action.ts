"use server"

import { validateRequest } from "@/auth";
import prisma from "@/lib/db";
import { getUserDataSelect } from "@/lib/types";
import { updateUserProfileSchema, updateUserProfileSchemaValues } from "@/lib/validation";

export async function updateUserProfile(values:updateUserProfileSchemaValues){
    console.log(values)
    try{
        const validatedValues=updateUserProfileSchema.parse(values)
        const {user}=await  validateRequest()
        if(!user) throw new Error("Unauthorized User")

        const updatedUser= await prisma.user.update({
            where:{
                id:user.id
            },data:{
                bio:validatedValues.bio,
                displayName:validatedValues.displayName
            },select:getUserDataSelect(user.id)
        })
        return updatedUser
    }catch(error){
        console.log(error)
    }
  
}