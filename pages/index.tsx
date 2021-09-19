import type { NextPage } from 'next'
import Link from 'next/link'
import { getExchanges } from '../lib/coingeko'

interface Props {
	exchanges: Exchange[];
}

interface Exchange {
	id: string,
	name: string
}

const Home: NextPage<Props> = ({ exchanges }) => {
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

export async function getStaticProps<Props>() {
	const exchanges = await getExchanges(1)

	return {
		props: { exchanges }
	}
}

export default Home
