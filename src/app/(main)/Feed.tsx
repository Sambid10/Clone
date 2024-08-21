"use client"
import PostContainer from '@/components/Post/post';
import SingleSkeletonState from '@/components/Reccomendation/Skele';
import SkeletonState from '@/components/Reccomendation/Skeleton';
import InfinteScroll from '@/components/ui/InfinteScroll';
import kyInstance from '@/lib/ky';
import {PostPage } from '@/lib/types';
import { useInfiniteQuery} from '@tanstack/react-query'


export default function ForYouFeed() {
    const {data,fetchNextPage,status,hasNextPage,isFetching,isFetchingNextPage}=useInfiniteQuery({
        queryKey:["post-feed,","for-you"],
        queryFn:({pageParam})=>kyInstance.get("/api/posts/for-you",
            pageParam ? {searchParams:{cursor:pageParam}} : {}
        ).json<PostPage>(),
        initialPageParam:null as string | null,
        getNextPageParam:(lastPage)=>lastPage.nextCursor
    })
    const posts=data?.pages.flatMap(page=>page.posts) || []
    if(status === "pending"){
        return <SkeletonState/>
    }
    if(status === "success" && !posts.length && !hasNextPage){
        return (
        <h1 className='text-center font-cute1 text-2xl'>
            That's all for today.Keep Meowing..
            </h1>)
    }
    if(status === "error"){
        return <p className='text-center text-destructive'>
            An Error Occur.Please Refresh the page to try again.
        </p>
    }

    return <InfinteScroll
            onBottomReached={()=>hasNextPage && !isFetching && fetchNextPage()}
        >
        {posts.map((post)=>(
            <PostContainer key={post.id} post={post}/>
        ))}
        {isFetchingNextPage && 
            <SingleSkeletonState/>
        }
        {status === "success" && !posts.length && !hasNextPage && (
                <h1 className='text-center font-cute1 text-2xl'>
                    That's all for today. Keep Meowing..
                </h1>
            )}
    </InfinteScroll>
}

