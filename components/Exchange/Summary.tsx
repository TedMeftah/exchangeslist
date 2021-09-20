import Link from 'next/link'

import { GlobeAltIcon } from '@heroicons/react/solid'

import Logo from './Logo'

interface Props {
	exchange: ExchangeSummary
}

export default function ExchangeCard({ exchange }: Props) {
	return (
		<>
			<li className="rounded flex bg-gray-700 border-gray-600 border-1 shadow-lg p-4 items-center overflow-hidden relative">
				<Logo src={exchange.image} alt={exchange.name} className="h-15 w-15" />
				<div className="ml-5">
					<h3 className="font-bold text-xl">
						<Link href={`/exchanges/${exchange.id}`}>
							<a>{exchange.name}</a>
						</Link>
					</h3>
					<p className="flex text-sm text-gray-400 items-center">
						{exchange.country && <GlobeAltIcon className="h-4 mr-1 w-4" />}
						{exchange.country}
						{exchange.yearEstablished && exchange.country && ', '}
						{exchange.yearEstablished}
					</p>
				</div>
				<span className="rank good">
					#{exchange.rank.toString().padStart(3, '0')}
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
