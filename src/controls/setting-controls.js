/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	SelectControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { useEffect, useRef } from '@wordpress/element';
/**
 * Internal dependencies
 */
import IconPicker from '../components/icon-picker-control/icon-picker';
import { sanitizePlainText } from '../utils/sanitize-input';

/**
 * Component that renders the settings controls in the block inspector.
 *
 * The settings controls allow the user to configure select an icon, an icon animation, an icon size, enable button text,
 * change the button text content, and position the icon relative to the text.
 *
 * @since 1.0.0
 *
 * @param {Object} props                            Block properties from `@wordpress/block-editor`.
 * @param {Object} props.attributes                 Block attributes.
 * @param {string} props.attributes.iconType        Icon type (e.g., 'font-awesome').
 * @param {string} props.attributes.fontAwesomeIcon Font Awesome icon class (e.g., 'fa-solid fa-star').
 * @param {string} props.attributes.iconAnimation   Icon animation class (e.g., 'fa-spin').
 * @param {string} props.attributes.iconSize        Icon size (e.g., 'small', 'medium', 'large').
 * @param {boolean} props.attributes.showText       Whether to show button text.
 * @param {string} props.attributes.buttonText      Button text string.
 * @param {string} props.attributes.iconPosition    Icon position relative to text (e.g., 'before' or 'after').
 * @param {Function} props.setAttributes            Function to update block attributes, provided by `@wordpress/block-editor`.
 * @return {Element} The settings controls interface in the block inspector as a React component.
 */
const SettingsControl = ({ attributes, setAttributes }) => {
	const {
		iconType,
		fontAwesomeIcon,
		iconAnimation,
		iconSize,
		showText,
		buttonText,
		iconPosition,
	} = attributes;

	const buttonTextRef = useRef(null);
	useEffect(() => {
		if (showText && buttonTextRef.current) {
			buttonTextRef.current.focus();
			buttonTextRef.current.select();
		}
	}, [showText]);

	return (
		<>
			<PanelBody title={__('Icon Button Settings', 'iconic-button')}>
				{iconType === 'font-awesome' && (
					<>
						<p>
							{__('Choose a Font Awesome Icon', 'iconic-button')}
						</p>
						<IconPicker
							value={fontAwesomeIcon}
							onChange={({ value, label }) =>
								setAttributes({
									fontAwesomeIcon: value,
									iconLabel: label,
									tooltip: label,
									buttonText: label,
								})
							}
						/>
						<SelectControl
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							label={__('Icon Animation', 'iconic-button')}
							value={iconAnimation}
							options={[
								{
									label: __('None', 'iconic-button'),
									value: '',
								},
								{
									label: __('Spin', 'iconic-button'),
									value: 'fa-spin',
								},
								{
									label: __('Bounce', 'iconic-button'),
									value: 'fa-bounce',
								},
							]}
							onChange={(newAnimation) =>
								setAttributes({
									iconAnimation: newAnimation,
								})
							}
						/>
					</>
				)}
				<SelectControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					label={__('Icon Size', 'iconic-button')}
					value={iconSize}
					options={[
						{
							label: __('Small (16px)', 'iconic-button'),
							value: 'small',
						},
						{
							label: __('Medium (20px)', 'iconic-button'),
							value: 'medium',
						},
						{
							label: __('Large (24px)', 'iconic-button'),
							value: 'large',
						},
						{
							label: __('X-Large (28px)', 'iconic-button'),
							value: 'xLarge',
						},
					]}
					onChange={(newIconSize) =>
						setAttributes({ iconSize: newIconSize })
					}
				/>
			</PanelBody>
			<PanelBody title={__('Button Text Settings', 'iconic-button')}>
				<ToggleControl
					__nextHasNoMarginBottom
					label={__('Show Button Text', 'iconic-button')}
					checked={showText}
					onChange={() => setAttributes({ showText: !showText })}
				/>
				{showText && (
					<>
						<SelectControl
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							label={__('Icon Position', 'iconic-button')}
							value={iconPosition}
							options={[
								{
									label: __('Before Text', 'iconic-button'),
									value: 'before',
								},
								{
									label: __('After Text', 'iconic-button'),
									value: 'after',
								},
							]}
							onChange={(newPosition) =>
								setAttributes({ iconPosition: newPosition })
							}
						/>
						<TextControl
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							label={__('Button Text', 'iconic-button')}
							value={buttonText || ''}
							onChange={(newText) => {
								const sanitizedText =
									sanitizePlainText(newText);

								if (sanitizedText.length === 0) {
									setAttributes({ showText: false });
								} else {
									setAttributes({
										buttonText: sanitizedText,
										tooltip: sanitizedText,
									});
								}
							}}
							ref={buttonTextRef}
						/>
					</>
				)}
			</PanelBody>
		</>
	);
};

export default SettingsControl;
