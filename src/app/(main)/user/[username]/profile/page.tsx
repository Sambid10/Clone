
import { validateRequest } from "@/auth"
import FollowCount from "@/components/Follo/FollowCount"
import FolloButton from "@/components/FolloButton/FolloButton"
import EditProfileButton from "@/components/EditProfileButton"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import prisma from "@/lib/db"
import { followerInfo, getUserDataSelect, Userdata } from "@/lib/types"
import { formatDate } from "date-fns"
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


export const generateMetaData = async ({ params: { username } }: PageProps): Promise<Metadata> => {
    const { user: loggedInuser } = await validateRequest()
    if (!loggedInuser) return {}

    const user = await getUser(username, loggedInuser.id)
    return {
        title:`${loggedInuser.username} (@${user.displayName})`
    }

}


export default async function Page({ params: { username } }: PageProps) {
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
interface ProfilePage {
    user: Userdata,
    loggedInuserId: string
}

export const ProfilePage = ({ user, loggedInuserId }: ProfilePage) => {


    const followerinfo: followerInfo = { followers: user._count.followers, isFollowing: !!user.followers.some(({ FollowerId }) => FollowerId === loggedInuserId) }
    // const followerinfo: followerInfo = {
    //     followers: user._count.followers,
    //     isFollowing: !!user.followers.some(({ FollowerId }) => { FollowerId === loggedInuserId })
    // }
    return (
        <div className=" ">
            <div className="h-fit bg-primary-foreground rounded-xl flex flex-col gap-2 px-2 py-2 border-b">
                <div className="flex justify-center border-b py-2">
                    <Avatar className='h-52 w-52 bg-black rounded-full'>
                        <AvatarImage src="" />
                        <AvatarFallback><User className="h-full w-full" /></AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <h1 className="text-5xl font-semibold capitalize">{user.username}</h1>
                        <h1 className="text-gray-400">@{user.displayName}</h1>
                    </div>
                    {user.id === loggedInuserId ?
                        <EditProfileButton user={user}/> :
                        <FolloButton userId={user.id} initialState={followerinfo} />
                    }

                </div>
                <h1 className="text-base">Joined Since {formatDate(user.createdAt, "MM/dd/yyyy")}</h1>
                <div className="flex gap-4 text-base">
                    <h1>Post:{''}
                        {user._count.post}
                    </h1>
                    <FollowCount userId={user.id} initialState={followerinfo} />
                </div>
                {user.bio && 
                    <div className=" border-t">
                        <h1 className="mt-1 font-cute1 text-xl">~ {user.bio}</h1>
                    </div>
                }
            </div>
          <h1 className="text-center  text-4xl font-semibold mt-4 mb-4 underline underline-offset-4">{user.id === loggedInuserId ? "My" : `${user.displayName}'s`} Posts</h1>
        </div>
    )
}

