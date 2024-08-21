import { validateRequest } from '@/auth'
import { redirect } from "next/navigation"
import React from 'react'
import SessionProvider from './SessionProvider'
import Navbar from './Navbar'
import SideBar from './SideBar'
import RightSideBar from '@/components/ui/RightSideBar'

export default async function Layout({ children }:
  {
    children: React.ReactNode
  }
) {
  const session = await validateRequest()
  if (!session.user) {
    return redirect("/signin")
  }
  return (
    <SessionProvider value={session}>
      <div className='flex flex-col'>
        <Navbar />
        <div className='flex relative w-full'>
          <div className='w-[15%]'>
          <SideBar />
          </div>
           <div className='lg:w-[55%] w-[85%]'>
           {children} 
           </div>
           <div className='md:w-[30%] hidden lg:block'>
           <RightSideBar/> 
           </div>
        </div>
      </div>
    </SessionProvider>


  )
}
