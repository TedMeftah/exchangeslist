import type { NextPage } from 'next'

import { ExchangeCard } from '../components/ExchangeCard'
import { Pagination } from '../components/Pagination'
import { Exchanges } from '../lib/coingecko'

interface Props {
	exchanges: Exchange[],
	page: number
}

interface Exchange {
	id: string
	name: string
	country: string
	image: string
	trust_score: number
	trust_score_rank: number
	year_established: number
}

const Home: NextPage<Props> = ({ exchanges, page }) => {
	return (
		<>
			<ul className="mx-auto max-w-4xl grid p-4 gap-4 grid-cols-1 md:(grid-cols-2)">
				{exchanges.map((exchange) => (
					<ExchangeCard exchange={exchange} key={exchange.id} />
				))}
			</ul>
			<Pagination key={page} current={page} total={306} />
		</>
	)
}

Home.getInitialProps = async ({query}) => {
	const page = parseInt(query.page as string) || 1
	const exchanges = await Exchanges.Get(page)

	return { exchanges, page }
}

export default Home
