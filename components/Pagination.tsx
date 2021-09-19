import Link from 'next/link'

interface PaginationProps {
	perPage?: number
	current: number
	total: number
}

export function Pagination({ current, total, perPage = 10 }: PaginationProps) {
	const numPages = Math.ceil(total / perPage)
	console.log(numPages)
	return (
		<nav>
			<ul className="flex">
				{[...Array(numPages)].map((_, i) => (
					<li key={i}>
						<Link href={`?page=${i + 1}`}>
							<a>{i + 1}</a>
						</Link>
					</li>
				))}
			</ul>
		</nav>
	)
}
