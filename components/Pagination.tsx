import Link from 'next/link'
import { Component } from 'react'

interface Props {
	perPage?: number
	current: number
	total: number
}

interface state {
	current: number
}

export class Pagination extends Component<Props, state> {
	perPage: number
	numPages: number
	total: number

	constructor(props: Props) {
		super(props)
		this.perPage = props.perPage || 10
		this.total = props.total
		this.numPages = Math.ceil(this.total / this.perPage)
		this.state = { current: props.current }
	}

	generate() {
		const delta = 2
		const left = this.state.current - delta
		const right = this.state.current + delta + 1

		let result = []
		let lastAdded = 1
		for (let i = 1; i <= this.numPages; i++) {
			if (i == 1 || i == this.numPages || (i >= left && i < right)) {
				if (lastAdded + 1 < i) {
					result.push('...')
				}
				result.push(i)
				lastAdded = i
			}
		}

		return result
	}

	render() {
		return (
			<nav>
				<ul>
					{this.generate().map((page, j) => {
						if (page === '...') {
							return <span key={j}>...</span>
						}

						return (
							<li key={j}>
								<Link href={`?page=${page}`}>
									<a className={this.state.current === page ? 'highlight' : ''}>
										{page.toString().padStart(2, '0')}
									</a>
								</Link>
							</li>
						)
					})}
				</ul>
				<style jsx>{`
					ul {
						@apply cursor-default flex py-4 px-8 justify-center select-none;

						span,
						a {
							@apply bg-gray-800 py-2 px-3 text-gray-500 leading-6 block;
						}

						a {
							@apply transition-colors;

							&:hover {
								@apply bg-gray-700 text-gray-400;
							}

							&.highlight {
								@apply pointer-events-none;
								@apply bg-blue-900 ring-inset ring-blue-700 ring-1 text-blue-400;
							}

							li:last-child & {
								@apply rounded-r;
							}
							li:first-child & {
								@apply rounded-l;
							}
						}
					}
				`}</style>
			</nav>
		)
	}
}
