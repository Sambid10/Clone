"use client"
import React, { useState, useTransition } from 'react'
import { PawPrint } from 'lucide-react';
import AnimatedText from '@/components/AnimatedText'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { CircleSlash, LoaderCircle } from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod"
import { Checkbox } from "@/components/ui/checkbox"
import { signupData, SignUpSchema } from '@/lib/validation'
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { signUp } from './action'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
export default function SignUppage() {
    const [error, setError] = useState<string | boolean>()
    const [pass, setpass] = useState<boolean>(false)
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const form = useForm<signupData>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            email: "",
            password: "",
            repeatPass: "",
            username: "",
        }

    })
    const HandleSubmit = (values: signupData) => {
        setError(undefined)
        startTransition(async () => {
            const { error, success } = await signUp(values)
            if (error) {
                setError(error)
                toast.error(error,{
                    className:"bg-red-800 border-none text-[#ffffff] font-cute1 text-base"
                })
            }
            if (success) {
                router.push("/")
                setTimeout(() => {
                    toast.success(success, {
                        
                            className:"bg-green-800 border-none text-[#ffffff] font-cute1 text-base"
                        
                    })
                }, 500)
            }
        })
    }
    const checkPass = () => {
        setpass((prev) => !prev)
    }
    return (
        <div className='min-h-screen flex relative'>
            
            <Image src={"/cat.svg"} height={100} width={100} alt='cat' className='absolute top-0 left-0 ' />
            <Image src={"/cats2.svg"} height={100} width={100} alt='cat' className='absolute top-0 right-0 '/>
            <div className='flex min-h-screen justify-center w-[100%]  p-4 lg:p-0 '>
                <div className='flex flex-col justify-center'>
                    <div
                        style={{ lineHeight: "500%" }}
                    >
                        <AnimatedText
                            text={"MeowTweets"}
                        />
                        <div className='flex flex-col font-cute lg:text-3xl text-xl mb-4'
                            style={{ lineHeight: "100%" }}
                        >
                            <p className='font-semibold'>Sign up your new account!!</p>
                        </div>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(HandleSubmit)}
                            className='flex flex-col gap-2 mt-2 font-cute1'
                        >
                            {/* {error && <div className='text-[#ffffff] py-1.5 text-center rounded-xl bg-red-400 font-semibold text-[0.9rem]'>
                                <div className='flex gap-2 justify-center items-center '>
                                    <CircleSlash className='h-4 w-4' />
                                    {error}
                                </div>

                            </div>} */}
                            <FormField
                                name='username'
                                control={form.control}
                                render={({ field }) =>
                                    <FormItem className='mb-2'>
                                        <div className='flex justify-between'>
                                            <FormLabel className='text-[0.93rem] md:text-xl font-medium'>Username:</FormLabel>
                                            <FormMessage className='text-[0.70rem] md:text-lg   font-light'/>
                                        </div>
                                        <FormControl>
                                            <Input disabled={isPending} {...field} type='text' placeholder='Enter your username.' />
                                        </FormControl>

                                    </FormItem>
                                }
                            >
                            </FormField>

                            <FormField
                                name='email'
                                control={form.control}
                                render={({ field }) =>
                                    <FormItem className='mb-2'>
                                        <div className='flex justify-between'>
                                            <FormLabel className='text-[0.93rem] md:text-xl font-medium'>Email:</FormLabel>
                                            <FormMessage className='text-[0.70rem] md:text-lg   font-light'/>
                                        </div>
                                        <FormControl>
                                            <Input disabled={isPending}  {...field} type='text' placeholder='Enter your email.' />
                                        </FormControl>

                                    </FormItem>
                                }
                            >
                            </FormField>



                            <FormField
                                name='password'
                                control={form.control}
                                render={({ field }) =>
                                    <FormItem className='mb-2'>
                                        <div className='flex justify-between'>
                                            <FormLabel className='text-[0.93rem] md:text-xl font-medium'>Password:</FormLabel>
                                            <FormMessage className='text-[0.70rem] md:text-lg   font-light'/>
                                        </div>

                                        <FormControl>
                                            <Input disabled={isPending} {...field} type={pass ? "text" : "password"} placeholder='Enter your password.' />
                                        </FormControl>

                                    </FormItem>
                                }
                            >
                            </FormField>

                            <FormField
                                name='repeatPass'
                                control={form.control}
                                render={({ field }) =>
                                    <FormItem className='mb-2'>
                                        <div className='flex justify-between'>
                                            <FormLabel className='text-[0.93rem] md:text-xl font-medium'>Repeat Password:</FormLabel>
                                            <FormMessage className='text-[0.70rem] md:text-lg  font-light'/>
                                        </div>

                                        <FormControl>
                                            <Input disabled={isPending} {...field} type={pass ? "text" : "password"} placeholder='Re-enter your password.' />
                                        </FormControl>

                                    </FormItem>
                                }
                            >
                            </FormField>

                            <div className='flex gap-2 h-full items-center'>
                                <Checkbox id="pass"
                                    onClick={checkPass}
                                />
                                <label
                                    htmlFor="pass"
                                    className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Show password
                                </label>
                            </div>

                            <div className='flex  flex-col items-end w-full'>
                                <Button disabled={isPending} type='submit' className={`w-[30%] bg-gradient-to-r from-purple-800 via-pink-800 to-orange-800 text-[#FCFCFC] hover:from-purple-700 hover:via-pink-700 hover:to-orange-700 `}>
                                    {isPending ?
                                        <div className='flex items-center justify-center h-full gap-1'>
                                            <LoaderCircle className='animate-spin h-5 w-5' />
                                            <h1 className='md:text-lg text-base  font-semibold'>Loading</h1>
                                        </div> :
                                           <div className='flex items-center gap-1 md:gap-2'>
                                           <h1 className='text-base md:text-lg   font-semibold'>Sign Up</h1>
                                           <PawPrint className='h-5 w-5 md:h-6 md:w-6'/>
                                     </div>
                                          
                                        

                                    }

                                </Button>

                                <Link href={"/signin"} className={`mt-2  text-sm md:text-md hover:underline ${isPending && 'pointer-events-none'}`}>Already have an account? Sign in here.</Link>

                            </div>

                        </form>
                    </Form>

                </div>


            </div>
        </div>
    )
}
