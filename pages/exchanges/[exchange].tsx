import type { NextPage } from 'next'

import { Exchanges } from '../../data/coingecko'
import { removeUndefined } from '../../helpers'

import Head from 'next/head'
import { ExternalLinkIcon, GlobeAltIcon } from '@heroicons/react/solid'
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
			<div className="container">
				<div className="header">
					<Exchange.Logo className="logo" src={exchange.image} alt={exchange.name} />

					<div className="info">
						<h1>
							{exchange.name}
							<span>#{exchange.rank.toString().padStart(3, '0')}</span>
						</h1>

						<p>
							{exchange.country?.name && <GlobeAltIcon className="h-4 mr-1 w-4" />}
							{exchange.country?.name}
							{exchange.country?.name && exchange.yearEstablished && ', '}
							{exchange.yearEstablished}
						</p>
					</div>

					<div className="navigation">
						<a className="button" target="_blank" rel="noreferrer" href={exchange.url}>
							<ExternalLinkIcon className="h-4 mr-1 w-4" aria-hidden="true" />
							Visit Now
						</a>
						<Exchange.SocialLinks links={exchange.links} />
					</div>
				</div>

				<p className="content">
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo, voluptates nisi
					velit dolorem neque, eum, ratione eligendi impedit animi officiis libero
					recusandae cum! Repellendus iste sed voluptas ut odit eaque.
				</p>

				<style jsx>{`
					.container {
						@apply rounded bg-gray-700 border-gray-600 border-1 shadow-lg p-4 items-center relative;
						@apply mx-auto mt-10 max-w-4xl;
					}
					.container :global(.logo) {
						@apply rounded-full h-24 w-24 sm:h-30 sm:w-30;
						@apply mx-auto -mt-10;
					}
					.header {
						@apply mb-4;
					}
					.info {
						@apply my-4;
						h1 {
							@apply font-bold tracking-wider text-2xl text-gray-200;
							@apply text-center;
							& span {
								@apply font-light text-gray-400;
							}
						}
						p {
							@apply flex text-gray-500 items-center justify-center;
						}
					}

					.button {
						@apply rounded flex font-semibold bg-lime-500 ring-inset text-sm py-2 px-3 ring-lime-400 ring-1 text-green-900 justify-center items-center;
						@apply transition-colors;
						@apply mb-3;
						&:hover {
							@apply bg-lime-400;
						}
					}
                    .content {
                        @apply text-lg text-gray-400;
                    }
					@screen md {
						.container {
							@apply mt-20 p-6;
						}
						.header {
							@apply flex;
						}
						.info {
							@apply mr-auto my-0 ml-5;
							h1 {
								@apply text-left;
							}
							p {
								@apply justify-start;
							}
						}

						.button {
							@apply order-2 mb-0 ml-2;
						}

						.navigation {
							@apply flex items-start;
						}
						.container :global(.logo) {
							@apply mx-0 -mt-15;
						}
					}
				`}</style>
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
			fallback: true
		}
	} catch {
		return {
			paths: [],
			fallback: false
		}
	}
}

export default ExchangePage
