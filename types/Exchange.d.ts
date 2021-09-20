type SocialNetwork =
	| 'facebook'
	| 'twitter'
	| 'reddit'
	| 'medium'
	| 'telegram'
	| 'slack'
	| 'discord'

type SocialNetworks = { [K in SocialNetwork]?: string }
