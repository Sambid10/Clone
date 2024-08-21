
import { validateRequest } from "@/auth"
import FollowCount from "@/components/Follo/FollowCount"
import FolloButton from "@/components/FolloButton/FolloButton"
import EditProfileButton from "@/components/EditProfileButton"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import prisma from "@/lib/db"
import { followerInfo, getUserDataSelect, Userdata } from "@/lib/types"
import { formatDate } from "date-fns"
import ProfilePage from "./ProfilePage"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { cache} from "react"
import { User } from "lucide-react"
import UserPost from "./UserPost"

interface PageProps {
    params: { username: string }
}

const getUser = cache(async (username: string, loggedInuserId: string) => {
    const user = await prisma.user.findFirst({
        where: {
            username: {
                equals: username,
                mode: "insensitive"
            }
        },
        select: getUserDataSelect(loggedInuserId)
    })
    if (!user) notFound()
    return user
})


// export const generateMetaData = async ({ params: { username } }: PageProps): Promise<Metadata> => {
//     const { user: loggedInuser } = await validateRequest()
//     if (!loggedInuser) return {}

//     const user = await getUser(username, loggedInuser.id)
//     return {
//         title:`${loggedInuser.username} (@${user.displayName})`
//     }

// }


export default async function ProPage({ params: { username } }: PageProps) {
    const { user: loggedInuser } = await validateRequest();
    if (!loggedInuser) return {}
    const user = await getUser(username, loggedInuser.id)
    return <main className="bg-[#000] min-h-[calc(100dvh-10px)] px-4 py-4">
        <div className="flex flex-col ">
        <ProfilePage user={user} loggedInuserId={loggedInuser.id} />
        <UserPost userId={user.id} />
        </div>
       
    </main>
}

