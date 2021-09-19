import Link from 'next/link'
import Image from 'next/image'

import { GlobeAltIcon } from '@heroicons/react/solid'

interface Exchange {
	id: string
	name: string
	country: string
	image: string
	trust_score: number
	trust_score_rank: number
	year_established: number
}

interface Props {
	exchange: Exchange
}

export function ExchangeCard({ exchange }: Props) {
	return (
		<>
			<li className="rounded flex bg-gray-700 border-gray-600 border-1 shadow-lg p-4 items-center overflow-hidden relative">
				<svg viewBox="0 0 100 100" fill="none" className="h-15 w-15">
					<mask id="mask" fill="white">
						<circle cx="50" cy="50" r="50" />
					</mask>
					<circle fill="white" mask="url(#mask)" cx="50" cy="50" r="49" />
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
				<div className="ml-5">
					<h3 className="font-bold text-xl">
						<Link href={`/exchanges/${exchange.id}`}>
							<a>{exchange.name}</a>
						</Link>
					</h3>
					<p className="flex text-sm text-gray-400 items-center">
						{exchange.country && <GlobeAltIcon className="h-4 mr-1 w-4" />}
						{exchange.country}
						{exchange.year_established && exchange.country && ', '}
						{exchange.year_established}
					</p>
				</div>
				<span className="rank good">
					#{exchange.trust_score_rank.toString().padStart(3, '0')}
				</span>
			</li>
			<style jsx>{`
				.rank {
					@apply top-2 right-2 absolute;
					@apply inline-flex items-center;
					@apply font-medium text-sm;
					@apply rounded-md py-0.5 px-2.5;
				}
                .rank.good {
                    @apply bg-green-900 text-green-400;
                }
			`}</style>
		</>
	)
}
