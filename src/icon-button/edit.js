/**
 * WordPress dependencies
 */
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
} from '@wordpress/block-editor';
import { useState, useEffect, useMemo } from '@wordpress/element';
/**
 * Internal dependencies
 */
import IconButtonToolbar from '../controls/toolbar.js';
import SettingControls from '../controls/setting-controls.js';
import StylingControls from '../controls/styling-controls.js';
import { setButtonInlineStyle } from '../components/color-control/color-utils.js';
import { getThemeContext } from '../utils/themeContext.js';
import {
	getIconSizePx,
	setStyleVariant,
	generateAriaLabel,
	setRelAttribute,
	getLinkClasses,
	getThemeClass,
} from '../utils/icon-button-utils.js';
import './editor.scss';

/**
 * Edit component for the Icon Button block.
 *
 * Renders the block editor interface for configuring a single button's text, icon, color and border radius in the block inspector
 * as well as setting a link and adjust the tooltip in the block's toolbar.
 *
 * @param {Object} props                            Block properties from `@wordpress/block-editor`.
 * @param {Object} props.attributes                 Block attributes.
 * @param {string} props.attributes.url             The link URL.
 * @param {string} props.attributes.rel             The link rel attribute (e.g., 'nofollow').
 * @param {string} props.attributes.target          The link target (e.g., '_blank' for new tab).
 * @param {string} props.attributes.iconType        Icon type (e.g., 'font-awesome').
 * @param {string} props.attributes.fontAwesomeIcon Font Awesome icon class (e.g., 'fa-solid fa-star').
 * @param {string} props.attributes.iconAnimation   Icon animation class (e.g., 'fa-spin').
 * @param {string} props.attributes.iconSize        Icon size (e.g., 'small', 'medium', 'large').
 * @param {boolean} props.attributes.showText       Whether to show button text.
 * @param {string} props.attributes.buttonText      Button text string.
 * @param {string} props.attributes.iconPosition    Icon position relative to text (e.g., 'before' or 'after').
 * @param {string} props.attributes.styleVariant    Style variant (e.g., 'fill' or 'outline').
 * @param {string} props.attributes.tooltip         Tooltip text for the icon button.
 * @param {string} props.attributes.iconLabel       Accessible label for the icon (used if no button text).
 * @param {string} props.attributes.ariaLabel       Aria-label attribute for the button.
 * @param {string} props.attributes.themeContext    Theme context (e.g., 'light' or 'dark').
 * @param {Object} props.setAttributes              Function to update block attributes, provided by `@wordpress/block-editor`.
 * @param {Object} props.clientId                   The unique client ID for the block instance.
 * @return {Element} The block editor interface for the iconic button block as a React component.
 */
const Edit = ({ attributes, setAttributes, clientId }) => {
	const {
		url,
		rel,
		target,
		iconType,
		fontAwesomeIcon,
		iconAnimation,
		iconSize,
		showText,
		buttonText,
		iconPosition,
		styleVariant,
		tooltip,
		iconLabel,
		ariaLabel,
		themeContext,
	} = attributes;

	const iconSizePx = getIconSizePx(iconSize);

	const [feedbackMessage, setFeedbackMessage] = useState();
	const [isLinkControlOpen, setIsLinkControlOpen] = useState(false);
	const [isTooltipOpen, setIsTooltipOpen] = useState(false);

	const currentVariantClassName = wp.data
		.select('core/block-editor')
		.getBlock(clientId)?.attributes.className;

	useEffect(() => {
		setStyleVariant(currentVariantClassName, styleVariant, setAttributes);
	}, [currentVariantClassName, styleVariant, setAttributes]);

	useEffect(() => {
		const { newContext } = getThemeContext();

		if (attributes.themeContext !== newContext) {
			setAttributes({ themeContext: newContext });
		}
	}, [attributes.themeContext, setAttributes]);

	useEffect(() => {
		if (fontAwesomeIcon && iconLabel && !buttonText) {
			setAttributes({ buttonText: iconLabel });
		}
	}, [fontAwesomeIcon, iconLabel, buttonText, setAttributes]);

	const style = useMemo(
		() => setButtonInlineStyle({ attributes }),
		[attributes]
	);

	useEffect(() => {
		const newAriaLabel = generateAriaLabel(attributes);
		const newRel = setRelAttribute(attributes);
		// Determine the external link status
		const isExternal =
			url &&
			url.startsWith('http') &&
			!url.includes(window.location.hostname);

		// Update the attributes
		setAttributes({
			isExternalLink: isExternal,
			rel: newRel,
			ariaLabel: newAriaLabel,
		});
	}, [url, buttonText, iconLabel, styleVariant, attributes, setAttributes]);

	const linkClasses = getLinkClasses(attributes);
	const themeClass = getThemeClass(themeContext);

	const blockProps = useBlockProps({
		className: themeClass,
		tabIndex: 0,
		style,
	});

	return (
		<>
			<BlockControls>
				<IconButtonToolbar
					attributes={attributes}
					setAttributes={setAttributes}
					isLinkControlOpen={isLinkControlOpen}
					setIsLinkControlOpen={setIsLinkControlOpen}
					isTooltipOpen={isTooltipOpen}
					setIsTooltipOpen={setIsTooltipOpen}
				/>
			</BlockControls>
			<InspectorControls group="settings">
				<SettingControls
					attributes={attributes}
					setAttributes={setAttributes}
				/>
			</InspectorControls>
			<InspectorControls group="styles">
				<StylingControls
					attributes={attributes}
					setAttributes={setAttributes}
				/>
			</InspectorControls>
			<div {...blockProps}>
				<a
					className={linkClasses}
					href={url}
					target={target || '_self'}
					rel={rel || ''}
					style={style}
					aria-label={ariaLabel}
					title={tooltip || iconLabel || ''}
					onClick={(e) => {
						e.preventDefault();
						setFeedbackMessage('Button was clicked');
					}}
				>
					<div className="wp-block-dgdev-icon-button__text">
						{iconPosition === 'after' && showText && (
							<span className="text-span-before">
								{buttonText}
							</span>
						)}
						{iconType === 'font-awesome' && fontAwesomeIcon && (
							<i
								className={`${fontAwesomeIcon} ${iconAnimation}`}
								style={{ fontSize: iconSizePx }}
								aria-hidden="true"
							></i>
						)}
						{iconPosition === 'before' && showText && (
							<span className="text-span-after">
								{buttonText}
							</span>
						)}
					</div>
				</a>
				<div
					className="wp-block-dgdev-icon-button__feedback sr-only"
					aria-live="polite"
				>
					{feedbackMessage}
				</div>
			</div>
		</>
	);
};

export default Edit;
