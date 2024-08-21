"use server"

import { lucia, validateRequest } from "@/auth"
import { cookies } from "next/headers"
export const signOut=async():Promise<{success:string | boolean}>=>{
    const {session}=await validateRequest()
    if(!session){
        throw new Error("Unauthorized")
    }
    await lucia.invalidateSession(session.id)
    const sessioncookie=lucia.createBlankSessionCookie();
    cookies().set(sessioncookie.name,sessioncookie.value,sessioncookie.attributes)
    return {success:"Signed Out Successfully"}
}