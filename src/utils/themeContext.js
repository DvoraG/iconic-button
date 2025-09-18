/**
 * WordPress dependencies
 */
import { select } from '@wordpress/data';
/**
 * Internal dependencies
 */
import { log } from '../utils/logger';

/**
 * Get the theme context (light or dark) based on background color.
 *
 * @since 1.0.0
 *
 * @return {Object} { themeContext: ('light' or 'dark'), baseColor: (hex), contrastColor: (hex)}
 */
const getThemeContext = () => {
	try {
		// fetch global styles
		const blockEditorSelector = select('core/block-editor');

		// Extract background color and text color slug from styles
		const baseColor = blockEditorSelector
			?.getSettings()
			?.colors?.find((color) => color.slug === 'base')?.color;

		if (!baseColor || typeof baseColor !== 'string') {
			log('warn', 'Background color variable not found, using fallback');
			return fallbackThemeContext();
		}

		const contrastColor = blockEditorSelector
			?.getSettings()
			?.colors?.find((color) => color.slug === 'contrast')?.color;

		if (!contrastColor || typeof contrastColor !== 'string') {
			log('warn', 'Text color variable not found, using fallback');
			return fallbackThemeContext();
		}

		// Determine if dark based on luminance
		const isDark = (color) => {
			const rgb = color.match(
				/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i
			);
			if (rgb) {
				const r = parseInt(rgb[1], 16);
				const g = parseInt(rgb[2], 16);
				const b = parseInt(rgb[3], 16);

				const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
				return luminance < 128; // Threshold for dark
			}
			return false;
		};

		const newContext = isDark(baseColor) ? 'dark' : 'light';
		return { newContext, baseColor, contrastColor };
	} catch (error) {
		log('error', 'Error determining theme context:', { error });
		return fallbackThemeContext();
	}
};

// Fallback function for when global styles are unavailable
function fallbackThemeContext() {
	return {
		themeContext: 'light',
		baseColor: '#ffffff',
		contrastColor: '#000000',
	}; // Default fallback
}

export { getThemeContext };
