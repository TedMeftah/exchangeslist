import type { NextPage } from 'next'

import { Exchanges } from '../../data/coingecko'
import { removeUndefined } from '../../lib/helpers'

import Head from 'next/head'
import { ExternalLinkIcon } from '@heroicons/react/solid'
import Exchange from '../../components/Exchange'

interface Props {
	exchange: ExchangeDetails
}

const ExchangePage: NextPage<Props> = ({ exchange }) => {
	return (
		<>
			<Head>
				<title>{exchange.name} | Exchanges List</title>
			</Head>
			<div className="rounded mx-auto bg-gray-500 shadow-lg mt-16 max-w-4xl p-4">
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

							<div className="flex flex-col justify-stretch sm:flex-row sm:space-y-0 sm:space-x-4">
								<a
									className="rounded flex font-semibold bg-green-600 text-sm py-2 px-3 text-green-900 justify-center items-center sm:oreder-2"
									target="_blank"
									rel="noreferrer"
									href={exchange.url}
								>
									<ExternalLinkIcon className="h-4 mr-1 w-4" aria-hidden="true" />
									Visit Now
								</a>
								<Exchange.SocialLinks links={exchange.links} className="sm:order-1" />
							</div>
						</div>
					</div>
					<div className="flex-1 mt-6 min-w-0 hidden sm:block md:hidden">
						<h1 className="font-bold text-2xl text-gray-900 truncate">{exchange.name}</h1>
					</div>
					<div>{exchange.description}</div>
				</div>
			</div>
		</>
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
