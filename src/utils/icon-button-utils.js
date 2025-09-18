/**
 * Internal dependencies
 */
import { getThemeContext } from './themeContext';
import { log } from './logger';

/**
 * Maps icon size attributes to pixel values.
 *
 * @since 1.0.0
 *
 * @param {string} iconSize  The icon size attribute ('small', 'medium', etc.).
 * @return {string} The icon size in pixels.
 */
const getIconSizePx = (iconSize) => {
	return (
		{
			small: '16px',
			medium: '20px',
			large: '24px',
			xLarge: '28px',
		}[iconSize] || '20px'
	);
};

/**
 * The function updates the attributes styleVariant, backgroundColor, textColor when the style variant changes.
 *
 * @since 1.0.0
 *
 * @param {string} currentVariantClassName  The current class name from the editor.
 * @param {string} styleVariant             The current block attribute for style variant.
 * @param {Function} setAttributes          The function to update the block's attributes.
 */
const setStyleVariant = (
	currentVariantClassName,
	styleVariant,
	setAttributes
) => {
	if (currentVariantClassName) {
		const styleClass = currentVariantClassName
			.split(' ')
			.find((cls) => cls.startsWith('is-style-'));

		const newStyleVariant = styleClass
			? styleClass.replace('is-style-', '')
			: 'fill'; // Default to filled

		if (newStyleVariant !== styleVariant) {
			const { contrastColor } = getThemeContext();

			switch (newStyleVariant) {
				case 'outline':
					setAttributes({
						styleVariant: newStyleVariant,
						textColor: contrastColor,
						backgroundColor: 'transparent',
					});
					break;
				default:
					setAttributes({
						styleVariant: newStyleVariant,
						backgroundColor: undefined,
						textColor: undefined,
					});
					break;
			}
		}
	}
};

/**
 * Filters out all falsey values from a style object.
 *
 * @since 1.0.0
 *
 * @param {Object} styleObj   The style object to be filtered.
 * @return {Object} A new style object containing only the truthy key-value pairs.
 */
const getInlineStyle = (styleObj) => {
	return Object.fromEntries(
		// eslint-disable-next-line no-unused-vars
		Object.entries(styleObj).filter(([key, value]) => value)
	);
};

/**
 * Generates an accessible aria-label string based on block attributes.
 *
 * @since 1.0.0
 *
 * @param {Object} attributes                   Block attributes.
 * @param {string} attributes.url               The button URL.
 * @param {string} attributes.buttonText        The button text.
 * @param {string} attributes.iconLabel         The icon label.
 * @param {string} attributes.styleVariant      The style variant ('fill' or 'outline').
 * @param {boolean} attributes.isExternalLink   Whether the link is external.
 * @return {string} The formatted aria-label.
 */
const generateAriaLabel = (attributes) => {
	const { url, buttonText, iconLabel, styleVariant, isExternalLink } =
		attributes;

	// Determine link destination
	let linkDestination = '';

	if (isExternalLink) {
		linkDestination = 'Button leads to an external link';
	} else if (url === '#') {
		// New condition for the default "#" URL
		linkDestination = 'Button leads to current page';
	} else if (url && url.startsWith('#')) {
		const anchorName = url.substring(1).replace(/-/g, ' ');
		linkDestination = `Button leads to the ${anchorName} section`;
	} else if (url) {
		try {
			const linkUrl = new URL(url);
			const pathParts = linkUrl.pathname
				.split('/')
				.filter((part) => part);
			if (pathParts.length > 0) {
				const pageSlug = pathParts[pathParts.length - 1];
				const pageName = pageSlug.replace(/-/g, ' ');
				linkDestination = `Button leads to the ${pageName}`;
			}
		} catch (error) {
			linkDestination = `Button leads to ${url}`;
			log('error', `Button leads to ${url}`, error);
		}
	}

	// Determine button meaning and state
	const buttonMeaning = buttonText || iconLabel;
	const buttonState =
		styleVariant === 'fill' || styleVariant === '' ? 'fill' : 'outlined';

	return `${buttonMeaning} button state: ${buttonState}, ${linkDestination}`;
};

/**
 * Updates the rel attribute.
 *
 * @since 1.0.0
 *
 * @param {Object} attributes                   Block attributes.
 * @param {string} attributes.rel               Current rel attribute.
 * @param {boolean} attributes.isExternalLink   Whether the link is external.
 * @return {string} The updated rel attribute.
 */
const setRelAttribute = (attributes) => {
	const { rel, isExternalLink } = attributes;
	let newRel = rel;
	const relAttributes = 'noreferrer noopener';

	if (isExternalLink) {
		// Add 'noreferrer noopener' for external links if missing.
		if (!newRel || !newRel.includes(relAttributes)) {
			newRel = newRel ? `${newRel} ${relAttributes}` : relAttributes;
		}
	} else if (newRel && newRel.includes(relAttributes)) {
		// Remove existing 'noreferrer noopener' for internal links, anchors.
		newRel = newRel.replace(relAttributes, '').trim();
	}
	return newRel;
};

/**
 * Generates the CSS classes to be passed to the anchor tag (icon button component).
 *
 * @since 1.0.0
 *
 * @param {Object} attributes                 Block attributes.
 * @param {string} attributes.styleVariant    The style variant attribute.
 * @param {boolean} attributes.showText       Whether to show the button text.
 * @param {string} attributes.buttonText      The button text.
 * @param {boolean} attributes.isExternalLink Whether the link is external.
 * @return {string} The combined CSS class string that is passed to the anchor tag.
 */
const getLinkClasses = (attributes) => {
	const { styleVariant, showText, buttonText, isExternalLink } = attributes;
	const classes = [
		'wp-block-dgdev-icon-button__link',
		styleVariant ? `is-style-${styleVariant}` : 'is-style-fill',
		!showText || !buttonText ? 'no-text' : '',
		isExternalLink ? 'external-link' : '',
	];
	return classes.join(' ').trim();
};

/**
 * Generates the CSS class for the block wrapper (icon buttons) based on the theme context.
 *
 * @since 1.0.0
 *
 * @param {string} themeContext   The theme context attribute ('light' or 'dark').
 * @return {string} The CSS classes for the theme.
 */
const getThemeClass = (themeContext) => {
	const safeThemeContext = ['light', 'dark'].includes(themeContext)
		? themeContext
		: 'light';
	return `wp-block-dgdev-icon-button ${
		safeThemeContext === 'dark' ? 'is-theme-dark' : 'is-theme-light'
	}`;
};

export {
	getIconSizePx,
	setStyleVariant,
	getInlineStyle,
	generateAriaLabel,
	setRelAttribute,
	getLinkClasses,
	getThemeClass,
};
