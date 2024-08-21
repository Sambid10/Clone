"use server"

import { validateRequest } from "@/auth"
import prisma from "@/lib/db"
import { PostDataInclude } from "@/lib/types"

export const DeletePost = async (id: string) => {
    const { user } = await validateRequest()
    if (!user) throw Error("Unauthorized User")

    const post = await prisma.post.findUnique({
        where: {
            id: id
        }
    })


    if (!post) throw new Error("No Post Found")
    if (post.userId !== user.id) throw new Error("Unauthorized")
    const deletedPost = await prisma.post.delete({
        where: {
            id: id
        },
        include: PostDataInclude(user.id)
    })
    return deletedPost
}