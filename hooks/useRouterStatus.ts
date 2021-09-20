import { useState, useEffect } from 'react'
import Router from 'next/router'

export default function useRouterStatus() {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isError, setIsError] = useState<boolean>(false)
	const [error, setError] = useState<Error>()

	useEffect(() => {
		function onStart() {
			setIsLoading(true)
		}

		function onComplete() {
			setIsLoading(false)
			setIsError(false)
			setError(undefined)
		}

		function onError(error: Error) {
			setIsLoading(false)
			setIsError(true)
			setError(error)
		}

		Router.events.on('routeChangeStart', onStart)
		Router.events.on('routeChangeComplete', onComplete)
		Router.events.on('routeChangeError', onError)

		return () => {
			Router.events.off('routeChangeStart', onStart)
			Router.events.off('routeChangeComplete', onComplete)
			Router.events.off('routeChangeError', onError)
		}
	}, [])

	return { isLoading, isError, error }
}
