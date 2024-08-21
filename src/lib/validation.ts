import *  as z from "zod"
const requiredString = z.string().trim().min(1, { message: "Required field." })
export const SignUpSchema = z.object({
    email: requiredString.email("Invalid email."),
    username: requiredString.regex(
        /^[a-zA-Z0-9_-]+$/, "Only Letters,numbers,- & _ allowed"
    ),
    password: requiredString.min(2, { message: "Must be atleast 2 characters." }),
    repeatPass: z.string().min(1,{message:"Required field."})
}).refine((data) => data.password === data.repeatPass, {
    path: ["repeatPass"],
    message: "Password don't match."
}

)
export type signupData = z.infer<typeof SignUpSchema>

export const signinSchema = z.object({
    username: requiredString,
    password: requiredString
})
export type signinData = z.infer<typeof signinSchema>


export type PostData=z.infer<typeof PostSchema>

export const PostSchema=z.object({
    content:requiredString
})

export const updateUserProfileSchema=z.object({
    displayName:requiredString,
    bio:z.string().max(1000,"Must be less than 1000 characters..")
    
})
export type updateUserProfileSchemaValues=z.infer<typeof updateUserProfileSchema>