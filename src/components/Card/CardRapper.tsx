import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'

export default function CardRapper({maintitle,description,children}:{
    maintitle:string,
    description:string,
    children:React.ReactNode
}) {
  return (
    <div>
        <Card>
            <CardHeader>
                <CardTitle>
                    <p className='font-cute text-6xl font-bold text-center'>{maintitle}</p>
                </CardTitle>
                <CardDescription>
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    </div>
  )
}
