import Link from 'next/link'

import { GlobeAltIcon } from '@heroicons/react/solid'

import Logo from './Logo'

interface Props {
	exchange: ExchangeSummary
}

export default function Summary({ exchange }: Props) {
	return (
		<>
			<Link href={`/exchanges/${exchange.id}`}>
				<a>
					<Logo src={exchange.image} alt={exchange.name} className="h-16 w-16" />
					<div className="ml-5">
						<h3 className="">{exchange.name}</h3>
						<p>
							{exchange.country && <GlobeAltIcon className="h-4 mr-1 w-4" />}
							{exchange.country}
						</p>
					</div>
					<span className="rank">
						{exchange.rank ? `#${exchange.rank.toString().padStart(3, '0')}` : '---'}
					</span>
				</a>
			</Link>

			<style jsx>{`
				a {
					@apply rounded flex bg-gray-700 shadow-lg ring-inset p-4 ring-gray-600 ring-1 items-center overflow-hidden relative;
					@apply transform transition-transform scale-100;
					&:hover {
						@apply transform scale-103;
					}
				}

				h3 {
					@apply font-bold text-xl;
				}

				p {
					@apply flex text-sm text-gray-400 items-center;
				}
				.rank {
					@apply top-2 right-2 absolute;
					@apply inline-flex items-center;
					@apply font-medium text-sm;
					@apply rounded-md py-0.5 px-2.5;
					@apply bg-green-900 text-green-400;
				}
			`}</style>
		</>
	)
}
