import Image from 'next/image'

interface Props {
	src?: string
	alt: string
	className?: string
}

export default function Logo({ src, alt, className }: Props) {
	return (
		<svg viewBox="0 0 100 100" fill="none" className={className}>
			<mask id="mask" fill="white">
				<circle cx="50" cy="50" r="50" />
			</mask>
			<circle fill="white" mask="url(#mask)" cx="50" cy="50" r="49" />
			<foreignObject mask="url(#mask)" x="0" y="0" width="100%" height="100%">
				{/* it's better to use the next/image compnent but it has a bug when it's nested in SVG foreignObject */}
				{/* eslint-disable-next-line @next/next/no-img-element */}
				{src && <img src={src} alt={alt} width={100} height={100} />}
			</foreignObject>
			<circle
				strokeOpacity="0.4"
				stroke="white"
				strokeWidth="2"
				mask="url(#mask)"
				cx="50"
				cy="50"
				r="49"
			/>
		</svg>
	)
}
