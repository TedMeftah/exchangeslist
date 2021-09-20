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

export async function Get(page: number, limit = 10) {
	const res = await fetch(`${BASE_URL}?per_page=${limit}&page=${page}`)

	// CoinGecko uses headers for pagination, we us this to get the number of exhcanges
	const total = parseInt(res.headers.get('total') as string)

	const exchanges: Summary[] = await res.json()

	return {
		limit,
		page,
		total,
		exchanges: exchanges.map((exchange) => ({
			...exchange,
			image: sanitizeImageURL(exchange.image)
		}))
	}
}

export async function Details(id: string): Promise<any> {
	const res = await fetch(`${BASE_URL}/${id}`)
	const exchange: Details = await res.json()
	const country = Countries.find(({ name }) => name.common === exchange.country)

	return {
		...exchange,
		image: sanitizeImageURL(exchange.image),
		links: sanitizeSocialLinks(exchange),
		country: {
			name: country?.name.common,
			code: country?.cca2,
			position: country?.latlng
		}
	}
}

function sanitizeImageURL(url: string): string {
	if (url === 'missing_small.png') return '/empty.png'
	return url.replace('small', 'large')
}

function sanitizeSocialLinks(exchange: Details) {
	let links: SocialNetworks = {}
	if (exchange.facebook_url) links['facebook'] = exchange.facebook_url
	if (exchange.twitter_handle) links['twitter'] = `https://twitter.com/${exchange.twitter_handle}`
	if (exchange.telegram_url) links['telegram'] = exchange.telegram_url
	if (exchange.reddit_url) links['reddit'] = exchange.reddit_url
	if (exchange.slack_url) links['slack'] = exchange.slack_url
	if (exchange.other_url_1.includes('medium.com')) links['medium'] = exchange.other_url_1
	if (exchange.other_url_2.includes('medium.com')) links['medium'] = exchange.other_url_2
	return links
}