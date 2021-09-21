export default function LoadingSummary() {
	return (
		<div>
			<style jsx>{`
				div {
					@apply rounded bg-gray-700 h-16 p-4 box-content;
					animation: pulse 1.4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
				}
				@keyframes pulse {
					0%,
					100% {
						opacity: 1;
					}
					50% {
						opacity: 0.3;
					}
				}
			`}</style>
		</div>
	)
}
