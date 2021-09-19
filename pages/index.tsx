import type { NextPage } from 'next'
import Link from 'next/link'
import { ExchangeCard } from '../components/ExchangeCard'
import { Exchanges } from '../lib/coingecko'

interface Props {
	exchanges: Exchange[]
}

interface Exchange {
	id: string
	name: string
	country: string
	image: string
	trust_score: number
	trust_score_rank: number
}

const Home: NextPage<Props> = ({ exchanges }) => {
	return (
		<>
			<ul className="grid gap-2 grid-cols-1 grid-cols-2">
				{exchanges.map((exchange) => (
					<ExchangeCard exchange={exchange} key={exchange.id} />
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
	const exchanges = await Exchanges.Get(1)

	return {
		props: { exchanges }
	}
}

export default Home
