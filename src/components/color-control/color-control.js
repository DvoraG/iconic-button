/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	ColorPalette,
	GradientPicker,
	TabPanel,
	PanelBody,
	Button,
} from '@wordpress/components';
import { ContrastChecker } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */
import {
	getThemeColorsAndGradients,
	getDefaultColors,
	isDefaultColor,
} from './color-utils';
import { getThemeContext } from '../../utils/themeContext'; // Function determine if current theme is light or dark.
import './color-control.scss';

/**
 * Color control component for the Iconic Button block.
 *
 * Provides a color picker and gradient selector for configuring button background and text colors in the block editor, using WordPress components.
 *
 * @since 1.0.0
 *
 * @param {Object} props                              Block properties from `@wordpress/block-editor`.
 * @param {Object} props.attributes                   Block attributes.
 * @param {string} props.attributes.backgroundColor   Background color value (e.g., '#0073aa').
 * @param {string} props.attributes.textColor         Text color value (e.g., '#ffffff').
 * @param {string} props.attributes.gradient          Gradient value (e.g., 'linear-gradient(...)').
 * @param {string} props.attributes.styleVariant      Style variant (e.g., 'fill' or 'outline').
 * @param {Function} props.setAttributes              Function to update block attributes, provided by `@wordpress/block-editor`.
 * @return {Element} The color picker and gradient selector interface as a React component.
 */
const ColorControl = ({ attributes, setAttributes }) => {
	const { backgroundColor, textColor, gradient, styleVariant } = attributes;

	// Function loads theme colors and gradients for the user to select from in the color picker.
	const { themeColors, themeGradients } = getThemeColorsAndGradients();

	// Get theme background and contrast color from themeContext as default colors.
	const { baseColor, contrastColor } = getThemeContext();

	// Determine default colors based on style variant and theme context
	const { defaultBackgroundColor, defaultTextColor } = getDefaultColors(
		styleVariant,
		baseColor,
		contrastColor
	);

	// Tabs array for the TabPanel component, defining 'background-color' and 'gradient' tabs.
	const tabs = [
		{
			name: 'background-color',
			title: __('Background', 'iconic-button'),
		},
		{ name: 'gradient', title: __('Gradient', 'iconic-button') },
	];

	return (
		<PanelBody title={__('Color Settings', 'iconic-button')}>
			{styleVariant === 'fill' && (
				<div className="custom-tab-panel-wrapper">
					<TabPanel
						className="color-tab-panel"
						activeClass="is-active"
						tabs={tabs}
					>
						{(tab) => {
							if (tab.name === 'background-color') {
								return (
									<>
										<ColorPalette
											colors={themeColors}
											value={backgroundColor}
											disableCustomColors
											onChange={(newBgColor) =>
												setAttributes({
													backgroundColor: newBgColor,
													hasDefaultColors:
														isDefaultColor(
															newBgColor,
															defaultBackgroundColor
														),
												})
											}
										/>
										<h4>
											{__('Text Color', 'iconic-button')}
										</h4>
										<ColorPalette
											colors={themeColors}
											value={textColor}
											disableCustomColors
											onChange={(newTextColor) =>
												setAttributes({
													textColor: newTextColor,
													hasDefaultColors:
														isDefaultColor(
															newTextColor,
															defaultTextColor
														),
												})
											}
										/>
										{!gradient && (
											<ContrastChecker
												backgroundColor={
													backgroundColor ||
													defaultBackgroundColor
												}
												textColor={
													textColor ||
													defaultTextColor
												}
												isLargeText={false}
											/>
										)}
									</>
								);
							} else if (tab.name === 'gradient') {
								return (
									<>
										<div
											className="gradient-contrast-warning"
											aria-live="polite"
										>
											<p>
												{__(
													'Gradients are not supported by automatic contrast checking. Please verify that the text color contrasts with the lightest and darkest parts of the gradient using an external tool like',
													'iconic-button'
												)}
												<a
													href="https://webaim.org/resources/contrastchecker/"
													target="_blank"
													rel="noopener noreferrer"
												>
													{__(
														'WebAIM Contrast Checker',
														'iconic-button'
													)}
												</a>
												{__(
													'for accessibility (WCAG ≥ 4.5:1).',
													'iconic-button'
												)}
											</p>
										</div>
										<GradientPicker
											value={gradient}
											gradients={themeGradients}
											disableCustomGradients
											onChange={(newGradient) =>
												setAttributes({
													gradient: newGradient,
													hasDefaultColors:
														!newGradient,
												})
											}
										/>
										<div className="gradient-picker__custom-clear-wrapper">
											<Button
												variant="tertiary"
												className="components-button is-next-40px-default-size"
												onClick={() =>
													setAttributes({
														gradient: null,
														hasDefaultColors: true,
													})
												}
												disabled={!gradient}
											>
												{__('Clear', 'iconic-button')}
											</Button>
										</div>
									</>
								);
							}
						}}
					</TabPanel>
				</div>
			)}
			{styleVariant !== 'fill' && (
				<>
					<h4>{__('Text Color', 'iconic-button')}</h4>
					<ColorPalette
						colors={themeColors}
						value={textColor}
						disableCustomColors
						onChange={(newTextColor) =>
							setAttributes({
								textColor: newTextColor,
								hasDefaultColors: isDefaultColor(
									newTextColor,
									defaultTextColor
								),
							})
						}
					/>
					<ContrastChecker
						backgroundColor={baseColor}
						textColor={textColor || defaultTextColor}
						isLargeText={false}
					/>
				</>
			)}
		</PanelBody>
	);
};

export default ColorControl;
