/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, RangeControl } from '@wordpress/components';
/**
 * Internal dependencies
 */
import ColorControl from '../components/color-control/color-control.js';

/**
 * Component that renders the styling controls in the block inspector.
 *
 * The styling controls allows the user to adjust the background color and text color, as well as the border radius.
 *
 * @since 1.0.0
 *
 * @param {Object}   props                          Block properties from `@wordpress/block-editor`.
 * @param {Object}   props.attributes               Block attributes.
 * @param {number}   props.attributes.borderRadius  Border radius in pixels.
 * @param {Function} props.setAttributes            Function to update block attributes, provided by `@wordpress/block-editor`.
 * @return {Element} The styling controls interface in the block inspector as a React component.
 */
const StylingControls = ({ attributes, setAttributes }) => {
	const { borderRadius } = attributes;

	return (
		<>
			<ColorControl
				attributes={attributes}
				setAttributes={setAttributes}
			/>
			<PanelBody title={__('Border Settings', 'iconic-button')}>
				<RangeControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					label={__('Border Radius (px)', 'iconic-button')}
					value={borderRadius}
					onChange={(newRadius) =>
						setAttributes({ borderRadius: newRadius })
					}
					min={0}
					max={48}
					step={4}
				/>
			</PanelBody>
		</>
	);
};

export default StylingControls;
