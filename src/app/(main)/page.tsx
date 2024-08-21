import { PostEditor } from "@/components/Post/editor/Editor";
import ForYouFeed from "./Feed";
export default async function Home() {
  return (
    <main className="bg-[#000000] font-cute1  md:p-6 p-4">
      <div className="min-h-[calc(100dvh-64px)] w-[100%] flex flex-col">
        <PostEditor />
        <ForYouFeed/>
      </div>
    </main>
  );
}
