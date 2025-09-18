import { parseSvgToReact } from '../../src/utils/parseSvgToReact';
import { log } from '../../src/utils/logger';

const SvgIcon = ({ svgCode, size }) => {
	// Debug log to inspect the svgCode value
	if (!svgCode || typeof svgCode !== 'string' || svgCode.trim() === '') {
		// eslint-disable-next-line no-console
		log('warn', 'SvgIcon: Invalid svgCode received:', { svgCode });
		// console.warn('SvgIcon: Invalid svgCode received:', svgCode);
		return null;
	}

	// Use parseSvgToReact to convert SVG string to React element
	const reactSvg = parseSvgToReact(svgCode, size);

	if (!reactSvg) {
		return null;
	}

	return (
		<div className="wp-block-dgdev-icon-button__svg-wrapper">
			{reactSvg}
		</div>
	);
};

/**
 *
 */
export default SvgIcon;
