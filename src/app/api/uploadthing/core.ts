import { validateRequest } from "@/auth";
import prisma from "@/lib/db";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    avatar:f({
        image:{maxFileSize:"512KB"}
    })
    .middleware(async()=>{
        const {user}=await validateRequest()
        if(!user) throw new UploadThingError("Unauthorized")
        return {user}
    }).onUploadComplete(async ({metadata,file})=>{
        const AvatarUrl=file.url.replace("/f/",`/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}`)
        await prisma.user.update({
            where:{
                id:metadata.user.id
            },
            data:{
                avatatarUrl:AvatarUrl
            }
        })
        return {avatarUrl:AvatarUrl}
    })

} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;