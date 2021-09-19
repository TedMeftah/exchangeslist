import type { NextPage } from 'next'

const Home: NextPage = () => {
	return (
		<>
			<div>Welcome</div>
      <style jsx>{`
        div {
          @apply bg-gray-800 p-4 text-light-900;
        }
      `}</style>
		</>
	)
}

export default Home
