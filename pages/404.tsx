import type { NextPage } from 'next'
import ErrorPage from '../components/ErrorPage'

const NotFound: NextPage = () => {
	return (
		<ErrorPage
			title="Page Not Found"
			message="The page you are looking for is not found"
		/>
	)
}

export default NotFound
