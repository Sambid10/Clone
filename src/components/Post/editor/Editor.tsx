"use client"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import UserButton from "@/components/ui/UserButton"
import { Button } from "@/components/ui/button"
import { LoaderCircle } from "lucide-react"
import { useSubmitPostMutation } from "./mutation"
export const PostEditor = () => {

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bold: false,
                italic: false
            }),
            Placeholder.configure({
                placeholder: "Meow meow...."

            })

        ],
        immediatelyRender: false
    },

    )

    const input = editor?.getText({
        blockSeparator: "\n"
    }) || "";

    const mutation = useSubmitPostMutation()
    const onSubmit = () => {
        mutation.mutate(input, {
            onSuccess: () => {
                editor?.commands.clearContent()
            }

        })
    }
    return (
        <div className="bg-background border  p-2 rounded-xl h-[15vh] mb-6">
            <div className="flex h-full w-full gap-2 ">
                <UserButton clickable={false} />
                <EditorContent
                    disabled={mutation.isPending}
                    editor={editor}
                    className=" example w-full overflow-y-auto rounded-xl h-[100%] pl-3 pr-20 py-2 relative"
                />
                <div className="relative">
                    <div className="absolute right-0 bottom-0 ">
                        <Button
                            disabled={mutation.isPending || !input.trim()}
                            className="bg-gradient-to-r from-purple-700 via-pink-700 to-orange-700 text-[#FCFCFC] hover:from-purple-600 hover:via-pink-600 hover:to-orange-600"
                            variant={"secondary"} onClick={onSubmit}>
                            {mutation.isPending ?
                                <LoaderCircle className="animate-spin" /> :
                                <h1 className="text-base font-medium">Meow</h1>
                            }
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    )
}