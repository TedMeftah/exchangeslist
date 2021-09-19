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
}

const Home: NextPage<Props> = ({ exchanges }) => {
	return (
		<>
			<ul className="grid gap-2 grid-cols-1 grid-cols-2">
				{exchanges.map((exchange) => (
					<ExchangeCard exchange={exchange} key={exchange.id} />
				))}
			</ul>
			<Pagination current={1} total={306} />
		</>
	)
}

Home.getInitialProps = async ({query}) => {
	const page = parseInt(query.page as string) || 1
	const exchanges = await Exchanges.Get(page)

	return { exchanges, page }
}

export default Home
