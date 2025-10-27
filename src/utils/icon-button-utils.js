/**
 * Internal dependencies
 */
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
			: 'fill';

		if (newStyleVariant !== styleVariant) {
			setAttributes({
				styleVariant: newStyleVariant,
			});
		}
	}
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

	let linkDestination = '';

	if (isExternalLink) {
		linkDestination = 'Button leads to an external link';
	} else if (url === '#') {
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

	const buttonMeaning = buttonText || iconLabel;
	const buttonState =
		styleVariant === 'fill' || styleVariant === '' ? 'fill' : 'outlined';

	return `${buttonMeaning} button state: ${buttonState}, ${linkDestination}`;
};

/**
 * Updates the link associated attributes.
 *
 * @since 1.0.0
 *
 * @param {Object} attributes                   Block attributes.
 * @param {string} attributes.rel               Current rel attribute.
 * @param {string} attributes.target            The link target.
 * @param {string} attributes.url               The link URL.
 * @param {boolean} attributes.isExternalLink   Whether the link is external.
 * @return {Object} An object containing the updated rel and target attributes.
 */
const setLinkAttributes = (attributes) => {
	const { rel, target, url } = attributes;
	let newRel = rel || '';
	const newTarget = target || '';

	newRel = newRel.replace(/\s+/g, ' ').trim();

	const relAttributes = ['noreferrer', 'noopener'];

	const isSectionAnchor = url && url.startsWith('#') && url !== '#';

	if (isSectionAnchor) {
		const existingRels = newRel ? newRel.split(/\s+/) : [];
		const filteredRels = existingRels.filter(
			(attr) => !relAttributes.includes(attr)
		);
		newRel = filteredRels.join(' ').trim();
	} else if (newTarget === '_blank') {
		const existingRels = newRel ? newRel.split(/\s+/) : [];

		relAttributes.forEach((attr) => {
			if (!existingRels.includes(attr)) {
				existingRels.push(attr);
			}
		});

		newRel = existingRels.join(' ');
	} else {
		const existingRels = newRel ? newRel.split(/\s+/) : [];
		const filteredRels = existingRels.filter(
			(attr) => !relAttributes.includes(attr)
		);
		newRel = filteredRels.join(' ').trim();
	}

	return {
		rel: newRel || undefined,
		target: newTarget || undefined,
	};
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
 * @return {string} The combined CSS class string that is passed to the anchor tag.
 */
const getLinkClasses = (attributes) => {
	const { styleVariant, showText, buttonText, isExternalLink } = attributes;
	const classes = [
		'wp-block-dgdev-icon-button__link',
		styleVariant ? `is-style-${styleVariant}` : 'is-style-fill',
		!showText || !buttonText ? 'no-text' : '',
		isExternalLink ? 'has-external-link' : '',
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
	generateAriaLabel,
	setLinkAttributes,
	getLinkClasses,
	getThemeClass,
};
