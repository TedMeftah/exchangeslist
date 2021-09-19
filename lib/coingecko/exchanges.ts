import Countries from 'world-countries'

interface ListItem {
	id: string
	name: string
}

interface Details {
	name: string
	year_established: number
	country: string
	description: string
	url: string
	image: string
	facebook_url: string
	reddit_url: string
	telegram_url: string
	slack_url: string
	other_url_1: string
	other_url_2: string
	twitter_handle: string
	centralized: boolean
	trust_score: number
	trust_score_rank: number
	trade_volume_24h_btc: number
}

interface Summary {
	id: string
	name: string
	year_established: number
	country: string
	description: string
	url: string
	image: string
	has_trading_incentive: boolean
	trust_score: number
	trust_score_rank: number
	trade_volume_24h_btc: number
	trade_volume_24h_btc_normalized: number
}


const BASE_URL = 'https://api.coingecko.com/api/v3/exchanges'

export async function List(): Promise<string[]> {
	const res = await fetch(`${BASE_URL}/list`)
	const exchanges: ListItem[] = await res.json()

	return exchanges.map(({ id }) => id)
}

export async function Get(page: number, perPage = 10) {
	const res = await fetch(`${BASE_URL}?per_page=${perPage}&page=${page}`)
	console.log(parseInt(res.headers.get('total') as string))

	const exchanges: Summary[] = await res.json()
	return exchanges
}

export async function Details(id: string): Promise<any> {
	const res = await fetch(`${BASE_URL}/${id}`)
	const exchange: Details = await res.json()
	const country = Countries.find(({ name }) => name.common === exchange.country)

	return {
		...exchange,
		country: {
			name: country?.name.common,
			code: country?.cca2,
			position: country?.latlng
		}
	}
}
