import { Prisma } from "@prisma/client";

export function getUserDataSelect(loggedinUserId: string) {
  return {
    id: true,
    username: true,
    avatatarUrl: true,
    displayName: true,
    createdAt:true,
    bio:true,
    followers: {
      where: {
        FollowerId:loggedinUserId
      },
      select: {
        FollowerId: true
      }
    },
    _count: {
      select: {
        followers: true,
        post:true
      },
    },

  } satisfies Prisma.UserSelect
}


export function PostDataInclude(loggedinUserId:string){
  return {
    user: {
      select: getUserDataSelect(loggedinUserId)
    }
  }satisfies Prisma.PostInclude
}

export type Userdata=Prisma.UserGetPayload<{
  select:ReturnType<typeof getUserDataSelect>
}>

export type PostDataTypes = Prisma.PostGetPayload<{
  include: ReturnType<typeof PostDataInclude>
}>



export interface PostPage {
  posts: PostDataTypes[];
  nextCursor: string | null
}

export interface followerInfo {
  followers: number,
  isFollowing: boolean,
}