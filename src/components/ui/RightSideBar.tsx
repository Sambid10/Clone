import React, { Suspense } from 'react'
import Reccomendation from '../Reccomendation/Reccomendation'

import SkeletonState from '../Reccomendation/Skeleton'
import TrendingTopic from '../Reccomendation/Trending'

export default function RightSideBar() {
  return (
    <div className='sticky top-[64px] w-[100%]  bg-[#000000] border-l h-[calc(100dvh-64px)] md:p-4 py-4 px-1 font-cute1'>
            <div className='flex flex-col gap-2'>
                <h1 className='text-3xl font-bold'>
                  People you may Know
                </h1>
                <Suspense fallback={<SkeletonState/>}>
                <Reccomendation/>
                <TrendingTopic/>
                </Suspense>
            </div>
        </div>
  )
}

