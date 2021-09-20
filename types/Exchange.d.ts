type SocialNetwork = 'facebook' | 'twitter' | 'reddit' | 'medium' | 'telegram' | 'slack'

type SocialNetworks = { [K in SocialNetwork]?: string }
