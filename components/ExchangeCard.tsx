import Link from 'next/link'
import Image from 'next/image'

interface Exchange {
	id: string
	name: string
	country: string
	image: string
	trust_score: number
	trust_score_rank: number
}

interface Props {
	exchange: Exchange
}

export function ExchangeCard({ exchange }: Props) {
	return (
		<li className="rounded bg-gray-700 border-gray-600 border-1 shadow-lg p-4 overflow-hidden relative">
			<svg viewBox="0 0 100 100" fill="none" className="h-10 w-10">
				<mask id="mask" fill="white">
					<circle cx="50" cy="50" r="50" />
				</mask>
				<foreignObject mask="url(#mask)" x="0" y="0" width="100%" height="100%">
					{exchange.image != 'missing_small.png' && (
						<Image
							className="rounded-full"
							src={exchange.image}
							alt={exchange.name}
							width={100}
							height={100}
						/>
					)}
				</foreignObject>
				<circle
					strokeOpacity="0.4"
					stroke="white"
					strokeWidth="2"
					mask="url(#mask)"
					cx="50"
					cy="50"
					r="49"
				/>
			</svg>
			<h3>
				<Link href={`/exchanges/${exchange.id}`}>
					<a>{exchange.name}</a>
				</Link>
			</h3>
			<span>{exchange.country}</span>
			{/* <span>{exchange.trust_score}</span> */}
			<svg
				viewBox="0 0 300 100"
				className="h-full inset-y-0 right-0 fill-gray-600 absolute"
			>
				<text
					x="106%"
					y="65%"
					fontFamily="Open Sans Condensed"
					className="opacity-50"
					fontVariant="tabular-nums"
					fontWeight="bold"
					fontSize="180"
					textAnchor="end"
					dominantBaseline="middle"
				>
					{exchange.trust_score_rank}
				</text>
			</svg>
		</li>
	)
}
