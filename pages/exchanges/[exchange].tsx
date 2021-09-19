import type { NextPage } from 'next'
import Link from 'next/link'
import { getExchangeDetails, getExchangesIDs } from '../../lib/coingeko'

const Exchange: NextPage = ({ exchange }) => {
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
			<span>{exchange.country}</span>
			<p>{exchange.description}</p>
		</>
	)
}

export async function getStaticProps({ params }) {

    const exchange = await getExchangeDetails(params.exchange)

	return {
		props: { exchange }
	}
}

export async function getStaticPaths() {
    let ids = await getExchangesIDs()
	return {
		paths: ids.map(id => ({ params: { exchange: id } })),
		fallback: true
	}
}

export default Exchange
