"use client"
import kyInstance from '@/lib/ky'
import { PostPage } from '@/lib/types'
import { useInfiniteQuery } from '@tanstack/react-query'
import SkeletonState from '@/components/Reccomendation/Skeleton'
import SingleSkeletonState from '@/components/Reccomendation/Skele'
import React from 'react'
import InfinteScroll from '@/components/ui/InfinteScroll'
import PostContainer from '@/components/Post/post'
interface Props {
  userId: string
}


export default function UserPost({ userId }: Props) {
  const { data, status, hasNextPage ,isFetching,fetchNextPage,isFetchingNextPage} = useInfiniteQuery({
    queryKey: ["post-feed,","user-posts", userId],
    queryFn: ({ pageParam }) => kyInstance.get(`/api/user/${userId}/posts`, pageParam ? { searchParams: { cursor: pageParam } } : {}
    ).json<PostPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastpage) => lastpage.nextCursor

  })

  const posts = data?.pages.flatMap(page => page.posts) || []
  if (status === "pending") {
    return <SkeletonState />
  }
  if (status === "success" && !posts?.length && !hasNextPage) {
    return (
      <h1 className='text-center mt-10 font-cute1 text-xl'>
        No post available.Keep Meowing..
      </h1>
    )
  }
  if (status === "error") {
    return <p className='text-center text-destructive'>
      An Error Occur.Please Refresh the page to try again.
    </p>
  }
  return <InfinteScroll
  onBottomReached={()=>hasNextPage && !isFetching && fetchNextPage()}
  >
    {posts?.map((post)=>
    <>
      <PostContainer post={post} key={post.id}/>
    </>
  
    )}
    {isFetchingNextPage &&
      <SingleSkeletonState/>
    }
  </InfinteScroll>

}
