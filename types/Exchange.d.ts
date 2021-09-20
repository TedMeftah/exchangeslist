type SocialNetwork =
	| 'facebook'
	| 'twitter'
	| 'reddit'
	| 'medium'
	| 'telegram'
	| 'slack'
	| 'discord'

type SocialNetworks = { [K in SocialNetwork]?: string }

interface CountryInfo {
	name: string
	code: string
	position: [number, number]
}

interface ExchangeDetails {
	id: string
	name: string
	url: string
	image?: string
	yearEstablished?: number
	description: string
	country?: CountryInfo
	rank: number
	links: SocialNetworks
}

interface ExchangeSummary {
	id: string
	name: string
	image?: string
	yearEstablished?: number
	country?: string
	rank: number
}
