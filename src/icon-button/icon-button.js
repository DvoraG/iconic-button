/**
 * A React component that renders an SVG icon representing the icon button in the block editor.
 *
 * @since 1.0.0
 *
 * @return {Element} The SVG icon as a React element.
 */
const IconButton = () => {
	return (
		<svg
			viewBox="0 0 24 24"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle
				cx="11"
				cy="11"
				r="5"
				fill="none"
				stroke="black"
				strokeWidth="1.5"
			/>
			<rect
				x="3"
				y="3"
				width="16"
				height="16"
				fill="none"
				stroke="black"
				strokeWidth="1.5"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default IconButton;
