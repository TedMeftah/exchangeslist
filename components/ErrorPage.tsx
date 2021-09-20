import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

interface Props {
	message: string
	title: string
}
export default function ErrorPage({ message, title }: Props) {
	return (
		<>
			<Head>
				<title>{title} | Exchanges List</title>
			</Head>
			<div>
				<h1>Oppps...</h1>
				<p>{message}</p>
				<Link href="/">
					<a>Take me home</a>
				</Link>
			</div>
			<style jsx>{`
				div {
					@apply flex flex-col h-screen mx-auto w-screen max-w-4xl p-4 justify-center items-start;
				}

				h1 {
					@apply font-bold mb-4 tracking-wider text-3xl;
				}

				p {
					@apply text-lg mb-4 tracking-wide text-gray-500;
				}

				a {
					@apply rounded bg-blue-500 shadow-md text-black py-1 px-3 shadow-blue-900 block;
					@apply transition transition-colors;

					&:hover {
						@apply bg-blue-400 text-blue-900;
					}
				}

				@screen md {
					div {
						@apply p-8;
					}

					h1 {
						@apply font-bold mb-4 text-4xl;
					}

					p {
						@apply text-xl;
					}
				}
			`}</style>
		</>
	)
}
