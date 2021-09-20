import type { NextPage } from 'next'
import Link from 'next/link'
import { ExternalLinkIcon } from '@heroicons/react/solid'
import { Exchanges } from '../../data/coingecko'
import Exchange from '../../components/Exchange'
import { removeUndefined } from '../../lib/helpers'

interface Props {
	exchange: ExchangeDetails
}

const ExchangePage: NextPage<Props> = ({ exchange }) => {
	return (
		<div className="rounded mx-auto bg-gray-500 shadow-lg mt-16 max-w-4xl pt-1">
			<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
				<div className="-mt-12 sm:flex sm:space-x-5 sm:-mt-16 sm:items-end">
					<div className="flex">
						{exchange.image && (
							<Exchange.Logo
								className="rounded-full h-24 w-24 sm:h-32 sm:w-32"
								src={exchange.image}
								alt={exchange.name}
							/>
						)}
					</div>
					<div className="mt-6 sm:flex sm:(space-x-6 flex-1 min-w-0 pb-1 items-center justify-end) ">
						<div className="flex-1 mt-6 min-w-0 sm:hidden md:block">
							<h1 className="font-bold text-2xl text-gray-900 truncate">
								{exchange.name}
							</h1>
						</div>
						<div className="flex flex-col space-y-3 mt-6 justify-stretch sm:flex-row sm:space-y-0 sm:space-x-4">
							<button
								type="button"
								className="bg-white border rounded-md font-medium border-gray-300 shadow-sm text-sm py-2 px-4 text-gray-700 inline-flex justify-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
							>
								<ExternalLinkIcon
									className="h-5 mr-2 -ml-1 text-gray-400 w-5"
									aria-hidden="true"
								/>
								<Link href={exchange.url}>
									<a>Visit Now</a>
								</Link>
							</button>
							<Exchange.SocialLinks links={exchange.links} />
						</div>
					</div>
				</div>
				<div className="flex-1 mt-6 min-w-0 hidden sm:block md:hidden">
					<h1 className="font-bold text-2xl text-gray-900 truncate">{exchange.name}</h1>
				</div>
				<div>
					{exchange.description}
				</div>
			</div>
		</div>
	)
}

export async function getStaticProps<Props>(context: { params: any }) {
	try {
		const exchange = await Exchanges.Details(context.params.exchange)
		return {
			props: { exchange: removeUndefined(exchange) }
		}
	} catch {
		return { notFound: true }
	}
}

export async function getStaticPaths() {
	try {
		const ids = await Exchanges.List()
		return {
			paths: ids.map((id) => ({ params: { exchange: id } })),
			fallback: false
		}
	} catch {
		return {
			paths: [],
			fallback: false
		}
	}
}

export default ExchangePage
