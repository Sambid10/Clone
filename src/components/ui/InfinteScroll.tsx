"use client"
import { useInView } from 'react-intersection-observer';
import React from 'react'
interface Props extends React.PropsWithChildren{
    onBottomReached:()=>void;
    className?:string
}


export default function InfinteScroll({onBottomReached,className,children}:Props) {
   const {ref}=useInView({
    rootMargin:"200px",
    onChange(inView) {
        if(inView){
            onBottomReached()
        }
    },
   })
  return (
    <div>
        {children}
        <div ref={ref}/>
    </div>
  )
}
