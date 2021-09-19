type ExchangesListResponse = { id: string; name: string }
export async function getExchangesIDs(): Promise<string[]> {
	const res = await fetch(`https://api.coingecko.com/api/v3/exchanges/list`)
	const exchanges: ExchangesListResponse[] = await res.json()

	return exchanges.map(({ id }) => id)
}

type ExchangeDetailsResponse = {
    name: string,
    year_established: number,
    country: string,
    description: string,
    url: string,
    image: string,
    facebook_url: string,
    reddit_url: string,
    telegram_url: string,
    slack_url: string,
    other_url_1: string,
    other_url_2: string,
    twitter_handle: string,
    centralized: boolean,
    trust_score: number,
    trust_score_rank: number,
    trade_volume_24h_btc: number,
}

export async function getExchangeDetails(id: string): Promise<any> {
	const res = await fetch(`https://api.coingecko.com/api/v3/exchanges/${id}`)
	const exchange: ExchangeDetailsResponse = await res.json()

	return exchange
}


type ExchangeMinDetailsResponse = {
    id: string,
    name: string,
    year_established: number,
    country: string,
    description: string,
    url: string,
    image: string,
    has_trading_incentive: boolean,
    trust_score:  number,
    trust_score_rank: number,
    trade_volume_24h_btc: number,
    trade_volume_24h_btc_normalized: number
}

export async function getExchanges(page: number, perPage = 10) {
    const res = await fetch(
		`https://api.coingecko.com/api/v3/exchanges?per_page=${perPage}&page=${page}`
	)

    const exchanges: ExchangeMinDetailsResponse[] = await res.json()

    return exchanges
}

