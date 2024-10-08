import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {formatDistanceToNowStrict,formatDate} from "date-fns"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function GetDate(from:Date){
  const currentDate=new Date()
  if(currentDate.getTime() - from.getTime() < 24*60*60*1000){
    return formatDistanceToNowStrict(from,{addSuffix:true})
  }else{
    if(currentDate.getFullYear() === from.getFullYear()){
      return formatDate(from,"MMMM d")
    }else{
      return formatDate(from,"MMM d, yyyy")
    }
  }
}
export function PostCount(num:number):string{
  return Intl.NumberFormat("en-US",{
    notation:"compact",
    maximumFractionDigits:1
  }).format(num)
}