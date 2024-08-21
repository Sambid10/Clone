import { validateRequest } from "@/auth";
import prisma from "@/lib/db";
import { PostDataInclude, PostPage } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest,
    {params:{userid}}:{params:{userid:string}}) {
    
        try{
            const {user}=await validateRequest()
            if(!user) return Response.json({error:"Unauthorized"},{status:401})

            const pagesize=10;
            const cursor=req.nextUrl.searchParams.get("cursor") || undefined

            const posts=await prisma.post.findMany({
                where:{userId:userid},
                include:PostDataInclude(user.id),
                orderBy:{
                    createdAt:"desc"
                },
                take:pagesize+1,
                cursor:cursor ? {id:cursor} : undefined

            })

            const nextCursor=posts.length > pagesize ? posts[pagesize].id : null

            const data:PostPage={
                nextCursor,
                posts:posts.slice(0,pagesize)
            }
            return Response.json(data)
        }catch(error){
            console.log(error)
            return Response.json({error:"Internal Server Error.."},{
                status:500
            })
        }
}