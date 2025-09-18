/**
 * A React component that renders an SVG icon representing the icon buttons in the block editor.
 *
 * @since 1.0.0
 *
 * @return {Element} The SVG icon as a React element.
 */
const IconButtons = () => {
	return (
		<svg
			width="24"
			height="24"
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
			<path
				d="M22 9L22 22L9 22"
				fill="none"
				stroke="black"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
		</svg>
	);
};

/**
 *
 */
export default IconButtons;
