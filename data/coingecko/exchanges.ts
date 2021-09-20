import Countries from 'world-countries'
import { isURL } from '../../lib/validations'

const BASE_URL = 'https://api.coingecko.com/api/v3/exchanges'

export async function List(): Promise<string[]> {
	const res = await fetch(`${BASE_URL}/list`)
	const exchanges: CoinGeckoAPI.Exchange.ListItem[] = await res.json()

	return exchanges.map(({ id }) => id)
}

export async function Get(page: number, limit = 10) {
	const res = await fetch(`${BASE_URL}?per_page=${limit}&page=${page}`)

	// CoinGecko uses headers for pagination, we us this to get the number of exhcanges
	const total = parseInt(res.headers.get('total') as string)

	const exchanges: CoinGeckoAPI.Exchange.Summary[] = await res.json()

	return {
		page,
		limit,
		total,
		exchanges: exchanges.map((exchange) => ({
			...exchange,
			image: sanitizeImageURL(exchange.image)
		}))
	}
}

export async function Details(id: string): Promise<any> {
	const res = await fetch(`${BASE_URL}/${id}`)
	const exchange: CoinGeckoAPI.Exchange.Details = await res.json()
	return {
		...exchange,
		image: sanitizeImageURL(exchange.image),
		links: sanitizeSocialLinks(exchange),
		country: sanitizeCountry(exchange.country)
	}
}

function sanitizeCountry(name: string) {
	const country = Countries.find((country) => country.name.common === name)
	if (!country) return null
	return {
		name: country.name.common,
		code: country.cca3,
		position: country.latlng
	}
}

function sanitizeImageURL(url: string): string {
	if (url === 'missing_small.png') return '/empty.png'
	return url.replace('small', 'large')
}

function sanitizeSocialLinks(exchange: CoinGeckoAPI.Exchange.Details) {
	let links: SocialNetworks = {}

	if (exchange.facebook_url) {
		links['facebook'] = exchange.facebook_url
	}

	if (exchange.twitter_handle) {
		links['twitter'] = isURL(exchange.twitter_handle)
			? exchange.twitter_handle
			: `https://twitter.com/${exchange.twitter_handle}`
	}

	if (exchange.telegram_url) {
		links['telegram'] = isURL(exchange.telegram_url)
			? exchange.telegram_url
			: `https://t.me/${exchange.telegram_url}`
	}

	if (exchange.reddit_url) {
		links['reddit'] = exchange.reddit_url
	}
	if (exchange.slack_url) {
		links['slack'] = exchange.slack_url
	}

	;[exchange.other_url_1, exchange.other_url_2].forEach((url) => {
		switch (true) {
			case url.includes('medium.com'):
				links['medium'] = url
				break
			case url.includes('discordapp.com'):
				links['discord'] = url
				break
		}
	})

	return links
}
