/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import {
	ToolbarGroup,
	ToolbarButton,
	Popover,
	TextControl,
	ToolbarDropdownMenu,
} from '@wordpress/components';
/**
 * Internal dependencies
 */
import ModernLinkControl from '../components/link-control/modern-link-control';
import LegacyUrlInput from '../components/link-control/legacy-link-control';
import {
	getWordPressVersion,
	isVersionGreaterOrEqual,
} from '../utils/version-control';
import { sanitizePlainText } from '../utils/sanitize-input';
import { link as linkIcon, edit } from '@wordpress/icons';

/**
 * Default Toolbar component enhanced with Tooltip and Link settings for the icon button
 *
 * @since 1.0.0
 *
 * @param {Object}   props                      - Block properties.
 * @param {Object}   props.attributes           - The Block attributes.
 * @param {Function} props.setAttributes        - setAttributes updates the Block attributes.
 * @param {Object}   props.isLinkControlOpen    - Whether the link control is open.
 * @param {Object}   props.setIsLinkControlOpen - Function to toggle the link control.
 * @param {Object}   props.isTooltipOpen        - Whether the tooltip is open.
 * @param {Object}   props.setIsTooltipOpen     - Function to toggle the tooltip.
 * @return {Element} The enhanced Toolbar as a React component.
 */
const IconButtonToolbar = ({
	attributes,
	setAttributes,
	isLinkControlOpen,
	setIsLinkControlOpen,
	isTooltipOpen,
	setIsTooltipOpen,
}) => {
	const { tooltip, iconLabel } = attributes;
	const [localTooltip, setLocalTooltip] = useState(tooltip || '');

	useEffect(() => {
		setLocalTooltip(tooltip || '');
	}, [tooltip]);

	// Detect WordPress version once
	const wpVersion = getWordPressVersion();
	const useModernLinkControl = isVersionGreaterOrEqual(wpVersion, '6.8');

	const tooltipControls = [
		{
			title: __('Save & Close', 'iconic-button'),
			onClick: () => {
				const sanitizedTooltip = sanitizePlainText(localTooltip);
				// Use existing tooltip if iconLabel is empty (no icon selected yet)
				const finalTooltip =
					sanitizedTooltip.trim() ||
					iconLabel ||
					tooltip ||
					__('Button', 'iconic-button');
				setAttributes({
					tooltip: finalTooltip,
					buttonText: finalTooltip,
				});
				// Update local state to show what was actually saved
				setLocalTooltip(finalTooltip);
				setIsTooltipOpen(false);
			},
			isActive: isTooltipOpen,
		},
	];

	return (
		<>
			<ToolbarGroup>
				<ToolbarDropdownMenu
					icon={edit}
					label={__('Tooltip Settings', 'iconic-button')}
					controls={tooltipControls}
					isOpen={isTooltipOpen}
					onToggle={() => setIsTooltipOpen(!isTooltipOpen)}
				>
					{() => (
						<TextControl
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							label={__('Tooltip Text', 'iconic-button')}
							value={localTooltip}
							onChange={(value) => {
								const sanitizedValue = sanitizePlainText(value);
								setLocalTooltip(sanitizedValue);
							}}
							placeholder={
								iconLabel
									? __(
											'Enter tooltip (defaults to icon label)',
											'iconic-button'
										)
									: __(
											'Enter tooltip (e.g., Click me)',
											'iconic-button'
										)
							}
							help={
								localTooltip
									? __(
											"Text to display on hover or focus (e.g., 'Click me').",
											'iconic-button'
										)
									: __(
											'Tooltip is empty; will default to icon label.',
											'iconic-button'
										) +
										(iconLabel ? ` ("${iconLabel}")` : '')
							}
							style={{
								width: '200px',
								border: !localTooltip
									? '1px solid orange'
									: undefined,
							}}
						/>
					)}
				</ToolbarDropdownMenu>
				<ToolbarButton
					icon={linkIcon}
					label={__('Add or edit link', 'iconic-button')}
					onClick={() => setIsLinkControlOpen(!isLinkControlOpen)}
				/>
			</ToolbarGroup>
			{isLinkControlOpen && (
				<Popover
					placement="bottom"
					onClose={() => setIsLinkControlOpen(false)}
				>
					{useModernLinkControl ? (
						<ModernLinkControl
							attributes={attributes}
							setAttributes={setAttributes}
							isOpen={isLinkControlOpen}
							onClose={() => setIsLinkControlOpen(false)}
						/>
					) : (
						<LegacyUrlInput
							attributes={attributes}
							setAttributes={setAttributes}
							isOpen={isLinkControlOpen}
							onClose={() => setIsLinkControlOpen(false)}
						/>
					)}
				</Popover>
			)}
		</>
	);
};

export default IconButtonToolbar;
