
import React from 'react'
import Link from 'next/link'
import { LinkIt, LinkItUrl } from "react-linkify-it"
export default function Linkify({ children }: {
    children: React.ReactNode
}) {
    return (
        <>
            <LinkifyUsername>
                <LinkifyHastag>
                    <LinkifyUrl>
                        {children}
                    </LinkifyUrl>
                </LinkifyHastag>
            </LinkifyUsername>

        </>
    )
}
function LinkifyUrl({ children }: {
    children: React.ReactNode
}) {
    return <LinkItUrl className='hover:underline text-blue-400'>
        {children}
    </LinkItUrl>
}


function LinkifyUsername({ children }: {
    children: React.ReactNode
}) {
    return (
        <LinkIt
            regex={/(@[a-zA-Z0-9_-]+)/}
            component={(match, key) => {
                const username = match.slice(1)
                return (
                    <Link
                        className='hover:underline text-blue-400'
                        href={`/user/${username}/profile`} key={key}>
                        {match}
                    </Link>
                )
            }}
        >
            {children}
        </LinkIt>
    )
}


function LinkifyHastag(
    { children }: {
        children: React.ReactNode
    }
) {
    return (
        <LinkIt
            regex={/(#[a-zA-Z0-9]+)/}
            component={(match, key) => {
                const hastag = match.slice(1)
                return (
                    <Link key={key} href={`/hashtag/${hastag}`} className='hover:underline text-blue-400'>
                        {match}
                    </Link>
                )
            }}
        >
            {children}
        </LinkIt>
    )
}