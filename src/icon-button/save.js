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
	setRelAttribute,
} from '../utils/icon-button-utils';
import { setButtonInlineStyle } from '../components/color-control/color-utils';
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
 * @return {Element} The frontend HTML as a React component.
 */
const save = ({ attributes }) => {
	const {
		url,
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
	} = attributes;

	const linkClasses = getLinkClasses(attributes);
	const themeClass = getThemeClass(themeContext);
	const newRel = setRelAttribute(attributes);
	const inlineStyle = setButtonInlineStyle({ attributes });
	const iconSizePx = getIconSizePx(iconSize);

	return (
		<div
			{...useBlockProps.save({
				className: themeClass,
			})}
		>
			<a
				href={url}
				target={attributes.target || '_self'}
				rel={newRel}
				className={linkClasses}
				style={inlineStyle}
				title={tooltip || iconLabel || ''}
				aria-label={ariaLabel}
			>
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
			</a>
			<div
				className="wp-block-dgdev-icon-button__feedback sr-only"
				aria-live="polite"
			></div>
		</div>
	);
};

export default save;
