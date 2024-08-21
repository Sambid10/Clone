"use server"

import prisma from "@/lib/db"
import { signinData, signinSchema} from "@/lib/validation"
import {verify} from "@node-rs/argon2"
import { isRedirectError } from "next/dist/client/components/redirect"
import { lucia } from "@/auth"
import { cookies } from "next/headers"
export const signIn = async (credentials:signinData):Promise<{error:string | boolean,success:string | boolean,redirect?:boolean}> => {
    try {
        const {username,password}=signinSchema.parse(credentials)
        const user=await prisma.user.findFirst({
            where:{
                username:{
                    equals:username,
                    mode:"insensitive"
                }
            }
        })
        if(!user || !user.hashedPass){
           return {error:"No user found. Please try again..",success:false}
        }

        const passcheck=await verify(user.hashedPass,password,{
            memoryCost:19456,
            timeCost:2,
            outputLen:32,
            parallelism:1
        })
        if(!passcheck){
            return {error:"Incorrect password. Please try again.",success:false}
         }

        const session=await lucia.createSession(user.id,{})
        const sessioncookie=await lucia.createSessionCookie(session.id)
        cookies().set(sessioncookie.name,sessioncookie.value,sessioncookie.attributes)
        
        return { error: false, success: `Successfully signed in as ${user.username}`, redirect: true };
        
    } catch (err) {
            if(isRedirectError(err)) throw err
            return {
           error:"Something went wrong..Please try again.",
           success:false
            }
    }
}