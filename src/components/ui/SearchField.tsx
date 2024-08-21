"use client"
import { SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Input } from './input'

export default function SearchField() {
 const router=useRouter()
 function handleSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const form=e.currentTarget;
   const q=(form.q as HTMLInputElement).value.trim()
   if(!q) return;
   router.push(`/search?q=${encodeURIComponent(q)}`)
 }   
 return (
        <form className='relative' onSubmit={handleSubmit} method='GET' action="/search">
            <Input name='q' placeholder='Search' className='pl-8 w-[40vw] md:w-[30vw]' />
            <SearchIcon className=' text-muted-foreground absolute h-5 w-5 top-1/2 left-4 -translate-x-1/2 -translate-y-1/2'/>
        </form>
  )
}
