import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = ({ exchanges }) => {
	return (
		<>
			<ul>
				{exchanges.map((exchange) => (
					<li key={exchange.id}>
						<h3>
							<Link href={`/exchanges/${exchange.id}`}>
								<a>{exchange.name}</a>
							</Link>
						</h3>
					</li>
				))}
			</ul>
			<nav>
				<ul>
					<li>
						<Link href="?page=1">
							<a>1</a>
						</Link>
					</li>
				</ul>
			</nav>
		</>
	)
}

export async function getStaticProps() {
	const page = 1
	const res = await fetch(
		`https://api.coingecko.com/api/v3/exchanges?per_page=10&page=${page}`
	)

	const exchanges = await res.json()

	return {
		props: { exchanges }
	}
}

export default Home
