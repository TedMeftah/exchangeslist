const { default: WindiCSS } = require('windicss-webpack-plugin')

/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	images: {
		domains: ['assets.coingecko.com']
	},
	webpack(config) {
		config.plugins.push(new WindiCSS())
		return config
	}
}
