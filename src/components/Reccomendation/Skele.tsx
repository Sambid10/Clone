import React from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
export default function SingleSkeletonState() {
  return (
    <div>
      <SkeletonTheme baseColor='#1A1A1A' highlightColor='#333333'>
        <Skeleton count={1} className='animate-pulse h-[10vh] rounded-2xl mt-5' />
      </SkeletonTheme>


    </div>

  )
}

