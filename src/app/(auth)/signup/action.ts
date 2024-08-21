"use server"

import { lucia } from "@/auth"
import prisma from "@/lib/db"
import { signupData, SignUpSchema } from "@/lib/validation"
import {hash} from "@node-rs/argon2"
import { generateIdFromEntropySize } from "lucia"
import { isRedirectError } from "next/dist/client/components/redirect"
import { cookies } from "next/headers"
export const signUp=async(
    credentials:signupData
):Promise<{error:string|boolean,success:string|boolean,redirect?:boolean}>=>{
    console.log(credentials)
    try{
        const {email,password,repeatPass,username}=SignUpSchema.parse(credentials)
        const hashpass=await hash(password,{
            memoryCost:19456,
            timeCost:2,
            outputLen:32,
            parallelism:1
        })
        const userId=generateIdFromEntropySize(10)
        const existinguserName=await prisma.user.findFirst({
            where:{
                username:{
                    equals:username,
                    mode:"insensitive"
                }
            }
        })
        if(existinguserName){
            return{
                error:"Username already in use.",success:false
            }
        }
        const existingEmail=await prisma.user.findFirst({
            where:{
                email:{
                    equals:email,
                    mode:"insensitive"
                }
            }
        })
        if(existingEmail){
            return {
                error:"Email already in use.",success:false
            }
        }

         const user=await prisma.user.create({
            data:{
                id:userId,
                username,
                displayName:username,
                hashedPass:hashpass,
                email:email
            }
        })
        const session=await lucia.createSession(userId,{})
        const sessioncookie=lucia.createSessionCookie(session.id)
        cookies().set(sessioncookie.name,sessioncookie.value,sessioncookie.attributes)
        return {success:`Signed in as ${user.displayName}`,redirect:true,error:false}
    }catch(error){
        if(isRedirectError(error)) throw error
        console.error(error)
        return{
            error:"Something went wrong..Please try again.",
            success:false
        }
    }
} 