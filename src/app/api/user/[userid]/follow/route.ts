import { validateRequest } from "@/auth";
import prisma from "@/lib/db";
import { followerInfo } from "@/lib/types";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,
    { params: { userid } }: { params: { userid: string } }

) {

    try {
        const { user: loggedinUser } = await validateRequest()
        if (!loggedinUser) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userid
            },
            select: {
                followers: {
                    where: {
                        FollowerId: loggedinUser.id
                    },
                    select: {
                        FollowerId: true
                    }
                },
                _count: {
                    select: {
                        followers: true
                    }
                }
            }
        })
        if (!user) {
            return NextResponse.json({ error: "Account Not Found" }, { status: 404 })
        }
        const data: followerInfo = {
            followers: user._count.followers,
            isFollowing: !!user.followers.length
        }
        return Response.json(data)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}



export async function POST(req: NextRequest, {
    params: { userid }
}: { params: { userid: string } }) {
    try {
        const { user: loggedinUser } = await validateRequest()
        if (!loggedinUser) return NextResponse.json({ error: "Unauthorzied" }, { status: 401 })
        await prisma.follow.upsert({
            where: {
                FollowerId_FollowingId: {
                    FollowerId: loggedinUser.id,
                    FollowingId: userid
                }
            },
            create: {
                FollowerId: loggedinUser.id,
                FollowingId: userid
            }, update: {}
        })

        return new NextResponse()
    } catch (error) {
         console.log(error)
        return NextResponse.json({ error: "Internal Server" }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest, {
    params: { userid }
}: { params: { userid: string } }) {
    try{
        const { user: loggedinUser } = await validateRequest()
        if (!loggedinUser) return NextResponse.json({ error: "Unauuthorzide" }, { status: 401 })
        
        await prisma.follow.deleteMany({
            where:{
                FollowerId:loggedinUser.id,
                FollowingId:userid
            }
        })

        return new NextResponse()
    }catch(error){
        console.log
        (error)
        return NextResponse.json({error:"Server Error"},{status:500})
    }
   

}