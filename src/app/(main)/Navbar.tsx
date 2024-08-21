import SearchField from '@/components/ui/SearchField'
import UserButton from '@/components/ui/UserButton'
import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <div className='sticky z-30 top-0 '>
      <div className='h-16 border-b  bg-[#000000]'>
        <div className=' max-w-7xl mx-auto flex justify-between items-center h-full px-4 '>
          <div className=' font-semibold text-2xl md:text-4xl font-cute bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent'>
            <Link href={"/"}>
              MeowTweets
            </Link>

          </div>
          <div>
            <SearchField />
          </div>
          <div>
            <UserButton clickable={true} />
          </div>
        </div>

      </div>
    </div>
  )
}
