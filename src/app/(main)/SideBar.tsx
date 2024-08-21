import { Bell, Bookmark, House, MessageCircle, UserIcon } from 'lucide-react'
import React, { use } from 'react'
import { Button } from '@/components/ui/button'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from 'next/link'
import { validateRequest } from '@/auth'
const SidebarLinks = [{
    name: "Home",
    icon: <House size={18} />
},
{
    name: "Message",
    icon: <MessageCircle size={18} />
},
{
    name: "Bookmarks",
    icon: <Bookmark size={18} />
},
{
    name: "Notification",
    icon: <Bell size={18} />
},
]
export default async function SideBar() {
    const { user } = await validateRequest()
    return (
        <div className='sticky top-[64px] w-[100%] bg-[#000000] border-r h-[calc(100dvh-64px)] lg:p-4 py-4 px-1 font-cute1'>
            <div className='flex flex-col gap-2'>
                {SidebarLinks.map((sidebar, i) =>
                    <>
                        <TooltipProvider>
                            <Tooltip
                                delayDuration={200}
                            >
                                <TooltipTrigger asChild>
                                    <Button variant={'ghost'} key={i} className='flex gap-1 py-4 lg:justify-start justify-center items-center px-1 xl:px-4'>
                                        {sidebar.icon}
                                        <h1 className='text-[0.9rem] lg:text-[1rem] font-normal hidden lg:block'>{sidebar.name}</h1>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent align='center' side='left'
                                    className='bg-background lg:hidden block'
                                >
                                    {sidebar.name}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </>
                )}
                <Button variant={'ghost'} className='mt-2 flex gap-1 lg:justify-start justify-center items-center border-t'>
                <Link href={`/user/${user?.username}/profile`} className='h-full w-full'>
                    <div className='flex gap-1'>
                        <UserIcon size={18} />
                         <h1 className='text-[0.9rem] lg:text-[1rem] font-normal hidden lg:block'>Profile</h1>
                    </div>
                </Link>
                </Button>
                

            </div>
        </div>
    )
}
