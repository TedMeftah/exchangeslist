import type { NextPage } from 'next'
import Link from 'next/link'

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
	const res = await fetch(`https://api.coingecko.com/api/v3/exchanges/${params.exchange}`)

	const exchange = await res.json()

	return {
		props: { exchange }
	}
}

export async function getStaticPaths() {
	const res = await fetch(`https://api.coingecko.com/api/v3/exchanges/list`)
	const exchanges = await res.json()
	return {
		paths: exchanges.map(({ id }) => ({ params: { exchange: id } })),
        fallback: true
	}
}

export default Exchange
