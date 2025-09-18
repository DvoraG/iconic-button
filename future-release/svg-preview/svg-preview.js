import { __ } from '@wordpress/i18n';
import { parseSvgToReact } from '../../src/utils/parseSvgToReact';

// SVG Preview Component
const SVGPreview = ({ svgCode }) => {
	if (!svgCode || typeof svgCode !== 'string') {
		return <p>{__('No valid SVG code provided.', 'iconic-button')}</p>;
	}
	try {
		const svgComponent = parseSvgToReact(svgCode, '50px', undefined);

		return <div style={{ marginBottom: '10px' }}>{svgComponent}</div>;
	} catch (e) {
		return <p>{__('Invalid SVG code.', 'iconic-button')}</p>;
	}
};

/**
 *
 */
export default SVGPreview;
