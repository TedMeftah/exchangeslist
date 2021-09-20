import Countries from 'world-countries'
import { isURL } from '../../lib/validations'

const BASE_URL = 'https://api.coingecko.com/api/v3/exchanges'

/**
 * @return {Promise<string[]>} an array containing a list of the possible  exchanges IDs
 */

export async function List(): Promise<string[]> {
	const res = await fetch(`${BASE_URL}/list`)
	const exchanges: CoinGeckoAPI.Exchange.ListItem[] = await res.json()

	return exchanges.map(({ id }) => id)
}

/**
 * @return an array containing a list of the possible  exchanges IDs
 */

export async function Get(page: number, limit = 10) {
	const res = await fetch(`${BASE_URL}?per_page=${limit}&page=${page}`)

	// CoinGecko uses headers for pagination, we use this to get the number of exhcanges
	const total = parseInt(res.headers.get('total') as string)

	const exchanges: CoinGeckoAPI.Exchange.Summary[] = await res.json()

	return {
		page,
		limit,
		total,
		exchanges: exchanges.map(
			(exchange): ExchangeSummary => ({
				id: exchange.id,
				name: exchange.name,
				rank: exchange.trust_score_rank,
				country: exchange.country,
				image: sanitizeImageURL(exchange.image)
			})
		)
	}
}

export async function Details(id: string): Promise<ExchangeDetails> {
	const res = await fetch(`${BASE_URL}/${id}`)
	const exchange: CoinGeckoAPI.Exchange.Details = await res.json()
	return {
		id,
		yearEstablished: exchange.year_established,
		name: exchange.name,
		url: exchange.url,
		description: exchange.description,
		rank: exchange.trust_score_rank,
		image: sanitizeImageURL(exchange.image),
		links: sanitizeSocialLinks(exchange),
		country: sanitizeCountry(exchange.country)
	}
}

function sanitizeCountry(name: string) {
	const country = Countries.find((country) => country.name.common === name)
	if (!country) return
	return {
		name: country.name.common,
		code: country.cca3,
		position: country.latlng
	}
}

function sanitizeImageURL(url: string) {
	if (url === 'missing_small.png') return
	return url.replace('small', 'large')
}

function sanitizeSocialLinks(exchange: CoinGeckoAPI.Exchange.Details) {
	let links: SocialNetworks = {}

	if (exchange.facebook_url) {
		links['facebook'] = exchange.facebook_url
	}

	if (exchange.twitter_handle) {
		// sometimes the twitter handle is actually a URL
		links['twitter'] = isURL(exchange.twitter_handle)
			? exchange.twitter_handle
			: `https://twitter.com/${exchange.twitter_handle}`
	}

	if (exchange.telegram_url) {
		// sometimes the telegram URL is actually a handle
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

	// extract possible known social media network from extra URLs
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
