/**
 * WordPress dependencies
 */
import { select } from '@wordpress/data';
/**
 * Internal dependencies
 */
import { checkIsDark } from '../components/color-control/color-utils';
import { log } from './logger';

/**
 * Get the theme context (light or dark) based on background color.
 *
 * @since 1.0.0
 *
 * @return {Object} { themeContext: ('light' or 'dark'), baseColor: (hex), contrastColor: (hex)}
 */
const getThemeContext = () => {
	try {
		const blockEditorSelector = select('core/block-editor');

		const baseColor = blockEditorSelector
			?.getSettings()
			?.colors?.find(
				(color) => color.slug === 'base' || color.slug === 'background'
			)?.color;

		if (!baseColor || typeof baseColor !== 'string') {
			log('warn', 'Background color variable not found, using fallback');
			return fallbackThemeContext();
		}

		const contrastColor = blockEditorSelector
			?.getSettings()
			?.colors?.find(
				(color) =>
					color.slug === 'contrast' || color.slug === 'foreground'
			)?.color;

		if (!contrastColor || typeof contrastColor !== 'string') {
			log('warn', 'Text color variable not found, using fallback');
			return fallbackThemeContext();
		}

		const newContext = checkIsDark(baseColor) ? 'dark' : 'light';
		return { newContext, baseColor, contrastColor };
	} catch (error) {
		log('error', 'Error determining theme context:', { error });
		return fallbackThemeContext();
	}
};

function fallbackThemeContext() {
	return {
		themeContext: 'light',
		baseColor: '#ffffff',
		contrastColor: '#000000',
	};
}

export { getThemeContext };
