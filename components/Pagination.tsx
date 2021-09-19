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
        console.log(props)
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
            if (i == 1 || i == this.numPages || i >= left && i < right) {
                if (lastAdded + 1 < i) {
                    result.push("...");
                }
                result.push(i);
                lastAdded = i
            }
        }
        
        return result;
    }

	render() {
		return (
			<nav>
				<ul className="flex">
					{this.generate().map((i, j) => (
						<li key={j} className="p-4">
							<Link href={`?page=${i}`}>
								<a>{i}</a>
							</Link>
						</li>
					))}
				</ul>
			</nav>
		)
	}
}