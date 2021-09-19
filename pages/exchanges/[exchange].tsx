import type { NextPage } from 'next'
import Link from 'next/link'
import { Exchanges } from '../../lib/coingecko'

interface Props {
	exchange: {
		id: string
		name: string
		image: string
		year_established: string
		description: string
		country: {
			code: string
			name: string
			position: [number, number]
		}
	}
}

const ExchangePage: NextPage<Props> = ({ exchange }) => {
	return (
		<>
			<nav className="mb-8">
				<ul>
					<li>
						<Link href="/">
							<a>Home</a>
						</Link>
					</li>
				</ul>
			</nav>
			<img src={exchange.image} />
			<h3>{exchange.name}</h3>
			<h3>{exchange.year_established}</h3>
			<span>{exchange.country.code}</span>
			<span>{exchange.country.name}</span>
			<span>{exchange.country.position}</span>
			<p>{exchange.description}</p>
		</>
	)
}

export async function getStaticProps<Props>(context: { params: any }) {
	const exchange = await Exchanges.Details(context.params.exchange)

	return {
		props: { exchange }
	}
}

export async function getStaticPaths() {
	let ids = await Exchanges.List()
	return {
		paths: ids.map((id) => ({ params: { exchange: id } })),
		fallback: true
	}
}

export default ExchangePage
