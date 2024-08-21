"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { signinData, signinSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState, useTransition } from 'react'
import { Cat, PawPrint } from 'lucide-react';
import { useForm } from 'react-hook-form'
import { signIn } from './action'
import { Input } from '@/components/ui/input'
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'

import Link from 'next/link'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import AnimatedText from '@/components/AnimatedText'
import Image from 'next/image'
export default function SignInpage() {
    const [errors, setError] = useState<string | boolean>()
    const router = useRouter()
    const [isPending, setTransition] = useTransition()
    const [pass, setPass] = useState(false)
    const checkpass = () => {
        setPass((prev) => !prev)
    }
    const form = useForm<signinData>(
        {
            resolver: zodResolver(signinSchema),
            defaultValues: {
                username: "",
                password: ""
            }
        }
    )
    const handleSubmit = (values: signinData) => {
        setError(undefined)
        setTransition(async () => {
            const { error, success } = await signIn(values)
            if (error) {
                setError(error)
                toast.error(error, {
                    className: "bg-red-800 border-none text-[#ffffff] font-cute1 text-base"
                })
            }
            if (success) {
                router.push("/")
                setTimeout(() => {
                    toast.success(success, {
                        className: "bg-green-800 border-none text-[#ffffff] font-cute1 text-base"
                    })
                }, 1000)

            }
        })
    }
    return (
        <div className='min-h-screen flex relative'>

            <Image src={"/cat.svg"} height={100} width={100} alt='cat' className='absolute top-0 left-0 ' />


            <Image src={"/cats2.svg"} height={100} width={100} alt='cat' className='absolute top-0 right-0 ' />
            <div className='flex min-h-screen justify-center w-[100%]  px-2 lg:px-0 '>
                <div className='flex flex-col justify-center'>
                    <div
                        style={{ lineHeight: "500%" }}
                    >
                        <AnimatedText
                            text={"MeowTweets"}
                        />
                        <div className='flex flex-col font-cute lg:text-3xl text-[1.2rem] md:text-xl mb-4'
                            style={{ lineHeight: "100%" }}
                        >

                            <p className='font-semibold'>Welcome Back!</p>
                            <p className='font-medium text-gray-400 text-[1.2rem] md:text-[1.5rem]'>Please Login to your account.</p>
                        </div>
                    </div>


                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)}
                            className='flex flex-col gap-4 mt-2 font-cute1'
                        >
                            {/* {errors &&
                                <div className='text-[#ffffff] py-1.5 text-center rounded-md bg-red-400 font-medium text-[0.9rem]'>
                                    <div className='flex gap-2 justify-center items-center'>
                                        <CircleSlash className='h-4 w-4' />
                                        {errors}
                                    </div>
                                </div>} */}
                            <FormField
                                name='username'
                                control={form.control}
                                render={({ field }) =>
                                    <FormItem className='mb-1'>
                                        <div className='flex justify-between'>
                                            <FormLabel className='text-[0.93rem] md:text-xl font-medium'>Username:</FormLabel>
                                            <FormMessage className='text-[0.70rem] md:text-lg   font-light' />
                                        </div>

                                        <FormControl>
                                            <Input disabled={isPending} {...field} placeholder='Enter your username' type='text' />
                                        </FormControl>
                                    </FormItem>
                                }
                            >
                            </FormField>

                            <FormField
                                name='password'
                                control={form.control}
                                render={({ field }) =>
                                    <FormItem className='mb-1'>
                                        <div className='flex justify-between'>
                                            <FormLabel className='text-[0.93rem] md:text-xl font-medium'>Password:</FormLabel>
                                            <FormMessage className='text-[0.70rem] md:text-lg  font-light' />
                                        </div>
                                        <FormControl>
                                            <Input disabled={isPending} {...field} placeholder='Enter your password' type={pass ? "text" : "password"} />
                                        </FormControl>
                                    </FormItem>
                                }
                            >
                            </FormField>


                            <div className='flex gap-2 items-center h-full'>
                                <Checkbox id="pass"
                                    onClick={checkpass}
                                />
                                <label
                                    htmlFor="pass"
                                    className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Show password
                                </label>
                            </div>


                            <div className='w-full items-end  flex flex-col mt-2 '>
                                <Button disabled={isPending} type='submit' className='w-[30%] bg-gradient-to-r from-purple-800 via-pink-800 to-orange-800 text-[#FCFCFC] hover:from-purple-700 hover:via-pink-700 hover:to-orange-700 '>
                                    {isPending ?
                                        <div className='flex h-full gap-2 items-center'>
                                            <LoaderCircle className='animate-spin h-5 w-5' />
                                            <h1 className='md:text-lg text-base  font-semibold'>Loading</h1>
                                        </div> :
                                        <div className='flex items-center gap-1 md:gap-2'>
                                            <h1 className='text-base md:text-lg  font-semibold'>Sign In</h1>
                                            <PawPrint className='h-5 w-5 md:h-6 md:w-6' />
                                        </div>

                                    }
                                </Button>
                                <Link className={`mt-3  text-sm md:text-md hover:underline ${isPending && 'pointer-events-none'}`} href='/signup'>Don't have an account? Sign up here.</Link>
                            </div>
                        </form>
                    </Form>

                </div>

            </div>



        </div>
    )
}
