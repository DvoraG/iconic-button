/**
 * Internal dependencies
 */
import { log } from '../../utils/logger';

/**
 * Extracts the theme colors and gradients from the block editor settings.
 *
 * @since 1.0.0
 *
 * @return {Object} An object containing themeColors and themeGradients.
 */
const getThemeColorsAndGradients = () => {
	const store = wp.data.select('core/block-editor');
	const themeColors = store.getSettings().colors || {};
	const themeGradients = store.getSettings().gradients || {};
	return { themeColors, themeGradients };
};

const getButtonInlineStyle = ({ attributes }) => {
	const { borderRadius, backgroundColor, textColor, gradient, styleVariant } =
		attributes;

	if (!borderRadius && !backgroundColor && !textColor && !gradient) {
		return undefined;
	}
	const style = {};

	if (borderRadius) {
		style.borderRadius = `${borderRadius}px`;
	}
	if (backgroundColor) {
		style.backgroundColor = backgroundColor;
	}
	if (textColor) {
		style.color = textColor;
	}
	if (gradient) {
		style.backgroundImage = gradient;
	}
	if (styleVariant === 'outline' && !backgroundColor) {
		style.backgroundColor = 'transparent';
	}

	return Object.keys(style).length > 0 ? style : undefined;
};

/**
 * Generates inline styles for a button based on its attributes.
 *
 * @since 1.0.0
 *
 * @param {Object} props            - Block properties.
 * @param {Object} props.attributes - Block attributes.
 * @return {Object|undefined} An object containing inline styles or undefined if no styles are applied.
 */
const setButtonInlineStyle = ({ attributes }) => {
	const { borderRadius, backgroundColor, textColor, gradient, styleVariant } =
		attributes;

	const hasCustomColors = backgroundColor || textColor || gradient;

	if (!borderRadius && !hasCustomColors) {
		return undefined;
	}

	const style = {};

	if (borderRadius) {
		style.borderRadius = `${borderRadius}px`;
	}

	if (gradient) {
		style.backgroundImage = gradient;
	} else if (backgroundColor) {
		style.backgroundColor = backgroundColor;
	} else if (styleVariant === 'outline') {
		style.backgroundColor = 'transparent';
	}

	if (textColor) {
		style.color = textColor;
	}

	return Object.keys(style).length > 0 ? style : undefined;
};

/**
 * Returns default colors based on style variant.
 *
 * Calculates and returns default background and text colors for 'fill' or 'outline' variants, using theme context colors.
 *
 * @since 1.0.0
 *
 * @param {string} variant Style variant ('fill' or 'outline').
 * @param {string} baseColor Base color from theme context.
 * @param {string} contrastColor Contrast color from theme context.
 * @return {Object} An object with `defaultBackgroundColor` (string) and `defaultTextColor` (string).
 */
const getDefaultColors = (variant, baseColor, contrastColor) => {
	return variant === 'outline'
		? {
				defaultBackgroundColor: 'transparent',
				defaultTextColor: contrastColor,
			}
		: {
				defaultBackgroundColor: contrastColor,
				defaultTextColor: baseColor,
			};
};

/**
 * Checks is the current color is the default color.
 *
 * Compares the current color to the default color and to determine if it matches.
 *
 * @since 1.0.0
 *
 * @param {string} currentColor Current color value (e.g., '#0073aa').
 * @param {string} defaultColor Default color value (e.g., '#ffffff').
 * @return {boolean} True if current color is default, false otherwise.
 */
const isDefaultColor = (currentColor, defaultColor) => {
	return !currentColor || currentColor === defaultColor;
};

/**
 * Checks if a color is dark.
 *
 * Determines if the provided color string represents a dark color based on its luminance.
 *
 * @since 1.0.0
 *
 * @param {string} color Color string (e.g., 'rgb(r,g,b)' or '#rrggbb').
 * @return {boolean} True if the color is dark, false otherwise.
 */
const checkIsDark = (color) => {
	const rgbMatch = color.match(
		/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*\d+\.\d+)?\)/i
	);
	if (rgbMatch && rgbMatch.length >= 4) {
		const r = parseInt(rgbMatch[1], 10);
		const g = parseInt(rgbMatch[2], 10);
		const b = parseInt(rgbMatch[3], 10);
		const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
		return luminance < 128;
	}
	if (color.startsWith('#')) {
		const hex = color.slice(1);
		const r = parseInt(
			hex.length === 3 ? hex[0] + hex[0] : hex.slice(0, 2),
			16
		);
		const g = parseInt(
			hex.length === 3 ? hex[1] + hex[1] : hex.slice(2, 4),
			16
		);
		const b = parseInt(
			hex.length === 3 ? hex[2] + hex[2] : hex.slice(4, 6),
			16
		);
		const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
		return luminance < 128;
	}
	log('warn', 'Unrecognized color format:', { color });

	return false;
};

export {
	getThemeColorsAndGradients,
	getButtonInlineStyle,
	setButtonInlineStyle,
	getDefaultColors,
	isDefaultColor,
	checkIsDark,
};
