import type { NextPage } from 'next'

import Exchange from '../components/Exchange'
import { Pagination } from '../components/Pagination'
import { Exchanges } from '../data/coingecko'

interface Props {
	exchanges: Exchange[]
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
					<Exchange.Card exchange={exchange} key={exchange.id} />
				))}
			</ul>
			<Pagination key={page} current={page} total={306} />
		</>
	)
}

Home.getInitialProps = async ({ query }) => {
	try {
		const page = parseInt(query.page as string) || 1
		const exchanges = await Exchanges.Get(page)

		return { exchanges, page }
	} catch (e) {
		console.log(e)
		return {exchanges: [], page: 1}
	}
}

export default Home
