import type { NextPage } from 'next'
import ErrorPage from '../components/ErrorPage'

const NotFound: NextPage = () => {
	return <ErrorPage title="Server Error" message="Something went wrong on our end" />
}

export default NotFound
