/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */
import {
	getLinkClasses,
	getThemeClass,
	getIconSizePx,
} from '../utils/icon-button-utils';
import { getButtonInlineStyle } from '../components/color-control/color-utils';
import './style.scss';

/**
 * Save function for the Iconic Button block.
 *
 * Generates the frontend HTML for a single button with an icon.
 *
 * @param {Object} props                            Block properties from `@wordpress/block-editor`.
 * @param {Object} props.attributes                 Block attributes.
 * @param {string} props.attributes.url             The link URL.
 * @param {string} props.attributes.target          The link target (e.g., '_blank' for new tab).
 * @param {string} props.attributes.rel             The link rel attribute (e.g., 'nofollow').
 * @param {boolean} props.attributes.showText       Whether to show button text.
 * @param {string} props.attributes.buttonText      Button text string.
 * @param {string} props.attributes.iconPosition    Icon position relative to text (e.g., 'before' or 'after').
 * @param {string} props.attributes.iconType        Icon type (e.g., 'font-awesome').
 * @param {string} props.attributes.fontAwesomeIcon Font Awesome icon class (e.g., 'fa-solid fa-star').
 * @param {string} props.attributes.iconAnimation   Icon animation class (e.g., 'fa-spin').
 * @param {string} props.attributes.iconSize        Icon size (e.g., 'small', 'medium', 'large').
 * @param {string} props.attributes.themeContext    Theme context (e.g., 'light' or 'dark').
 * @param {string} props.attributes.tooltip         Tooltip text for the icon button.
 * @param {string} props.attributes.iconLabel       Accessible label for the icon (used if no button text).
 * @param {string} props.attributes.ariaLabel       Aria-label attribute for the button.
 * @param {boolean} props.attributes.isExternalLink Whether the link attached to the button is external.
 * @param {boolean}  props.attributes.isScrollToTop  Whether the link is for scrolling to top.
 * @return {Element} The frontend HTML as a React component.
 */
const save = ({ attributes }) => {
	const {
		url,
		rel,
		target,
		showText,
		buttonText,
		iconPosition,
		iconType,
		fontAwesomeIcon,
		iconAnimation,
		iconSize,
		themeContext,
		tooltip,
		iconLabel,
		ariaLabel,
		isExternalLink,
		isScrollToTop,
	} = attributes;

	const linkClasses = getLinkClasses(attributes);
	const themeClass = getThemeClass(themeContext);
	const inlineStyle = getButtonInlineStyle({ attributes });
	const iconSizePx = getIconSizePx(iconSize);

	const content = (
		<>
			<div className="wp-block-dgdev-icon-button__text">
				{iconPosition === 'after' && showText && (
					<span className="text-span-before">{buttonText}</span>
				)}
				{iconType === 'font-awesome' && fontAwesomeIcon && (
					<i
						className={`${fontAwesomeIcon} ${iconAnimation}`}
						style={{ fontSize: iconSizePx }}
						aria-hidden="true"
					></i>
				)}
				{iconPosition === 'before' && showText && (
					<span className="text-span-after">{buttonText}</span>
				)}
			</div>
		</>
	);

	// Component for non-linked button
	const ButtonSpan = () => (
		<span
			role="button"
			tabIndex={0}
			className={linkClasses}
			style={inlineStyle}
			title={tooltip || iconLabel || ''}
			aria-label={ariaLabel}
		>
			{content}
		</span>
	);

	// Component for linked button
	const ButtonAnchor = () => (
		<a
			href={url}
			target={target}
			rel={rel}
			className={linkClasses}
			style={inlineStyle}
			title={tooltip || iconLabel || ''}
			aria-label={ariaLabel}
			// tabIndex={0} not needed, <a> is natively focusable
		>
			{content}
			{isExternalLink && (
				<div className="wp-block-dgdev-icon-button__indicator"></div>
			)}
		</a>
	);
	return (
		<div
			{...useBlockProps.save({
				className: themeClass,
				// Remove tabIndex to avoid wrapper focus
			})}
		>
			{!url || (url === '#' && !isScrollToTop) ? (
				<ButtonSpan />
			) : (
				<ButtonAnchor />
			)}
			<div
				className="wp-block-dgdev-icon-button__feedback sr-only"
				aria-live="polite"
			></div>
		</div>
	);
};

export default save;
