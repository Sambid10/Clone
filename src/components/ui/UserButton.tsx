"use client";
import { useSession } from '@/app/(main)/SessionProvider';
import React from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSubContent,DropdownMenuSub,DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from './dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { useTheme } from 'next-themes';
import { Monitor, Moon, Sun, User } from 'lucide-react';
import Logout from './logout';
interface UserButtonProps {
    className?: string;
    clickable?:boolean,
}

export default function UserButton({ className,clickable }: UserButtonProps) {
    const { user } = useSession();
    const { setTheme, theme } = useTheme();
    return (
        <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className={` ${clickable ? 'cursor-pointer' : 'pointer-events-none'}`}>
                    <Avatar className='h-9 w-9'>
                        <AvatarImage  src="" />
                        <AvatarFallback><User/></AvatarFallback>
                    </Avatar>
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align='end' className='w-[180px] md:w-[250px]'>
                <DropdownMenuLabel>
                    <div className='flex flex-col'>
                        <p className='text-lg capitalize'>{user.displayname}</p>
                        <p className='font-normal text-accent-foreground'>{user.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
               
                {/* <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <Monitor size={16} className='mr-2' />
                         Themes
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent >
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                                <Monitor size={16} className='mr-2' />
                                System
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("light")}>
                                <Sun size={16} className='mr-2' />
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>
                                <Moon size={16} className='mr-2' />
                                Dark
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                             */}
                       

                <DropdownMenuSeparator />
               
             <DropdownMenuLabel>
             <Logout/>
             </DropdownMenuLabel>
            </DropdownMenuContent>
        </DropdownMenu></>
        
    );
}
