import prisma from '@/lib/db'
import { unstable_cache } from 'next/cache'
import Link from 'next/link'
import React from 'react'
import { PostCount } from '@/lib/utils'
const getTrendingTopics=unstable_cache(
    async()=>{
        const result=await prisma.$queryRaw<{hashtag:string,count:bigint}[]>`
        SELECT LOWER(unnest(regexp_matches(content,'#[[:alnum:]_]+','g'))) AS hashtag,COUNT(*) AS count
        FROM posts
        GROUP BY (hashtag)
        ORDER BY count DESC,hashtag ASC
        LIMIT 5
        `;
        return result.map(r=>({
            hashtag:r.hashtag,
            count:Number(r.count)
        }))
    },
    ["trending_topics"],{
        revalidate:3*60*60
    }
)
export default async function TrendingTopic() {
    const trendingTopics=await getTrendingTopics()
  return (
    <div className='font-cute1'>
        <h1 className='text-3xl font-bold mt-2 mb-2'>Trending Topics</h1>
            <div className='bg-background px-4 rounded-xl py-2'>
            {trendingTopics.map(({hashtag,count})=>{
                const title=hashtag.split("#")[1];
                return <div   key={title} className=''>
                      <div className='flex flex-col border-b'>
                        <Link  href={`/hashtag/${title}`} className=' w-fit'>
                        <p className='text-lg hover:underline mt-1'>{hashtag}</p>
                        </Link>
                      <p className='text-md text-muted-foreground mb-1'>{PostCount(count)}{count === 1 ? " post" : " posts"}</p>
                      </div>
                    </div>
            })}
            </div>
          
    </div>
  )
}
