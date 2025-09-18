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

	// Check if any custom style attributes are set - early check out
	if (!borderRadius && !backgroundColor && !textColor && !gradient) {
		return undefined;
	}

	const style = {
		borderRadius: borderRadius ? `${borderRadius}px` : undefined,
	};

	if (styleVariant === 'outline') {
		style.backgroundColor = 'transparent';
		style.color = textColor;
	} else if (gradient) {
		style.backgroundImage = gradient;
		style.color = textColor;
	} else {
		style.backgroundColor = backgroundColor;
		style.color = textColor;
	}
	// Return the style object only if it has properties.
	// This is a more robust check than the simple one above for edge cases.
	if (Object.keys(style).length > 0) {
		return style;
	}
	return undefined;
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

export {
	getThemeColorsAndGradients,
	setButtonInlineStyle,
	getDefaultColors,
	isDefaultColor,
};
