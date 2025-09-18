/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { URLInput } from '@wordpress/block-editor';
import { ToggleControl } from '@wordpress/components';

/**
 * Legacy URLInput component (WordPress 6.7 and earlier)
 *
 * @since 1.0.0
 *
 * @param {Object}   props                    Block properties from `@wordpress/block-editor`.
 * @param {Object}   props.attributes         Block attributes.
 * @param {string}   props.attributes.url     The URL attribute.
 * @param {string}   props.attributes.target  The link target attribute.
 * @param {string}   props.attributes.rel     The link rel attribute.
 * @param {Function} props.setAttributes      Function to update block attributes.
 * @param {Function} props.onClose            Function to close the URL input.
 * @return {Element} The link interface in the toolbar as a React component.
 */
const LegacyUrlInput = ({ attributes, setAttributes, onClose }) => {
	const { url, target, rel } = attributes;
	return (
		<div style={{ padding: '16px', width: '350px' }}>
			<URLInput
				value={url || ''}
				onChange={(newUrl) => {
					setAttributes({
						url: newUrl || '',
					});
				}}
				placeholder={__('Enter URL', 'iconic-button')}
			/>

			<div style={{ marginTop: '12px' }}>
				<ToggleControl
					__nextHasNoMarginBottom
					label={__('Open in new tab', 'iconic-button')}
					checked={target === '_blank'}
					onChange={(opensInNewTab) => {
						setAttributes({
							target: opensInNewTab ? '_blank' : '',
						});
					}}
				/>
			</div>

			<div style={{ marginTop: '8px' }}>
				<ToggleControl
					__nextHasNoMarginBottom
					label={__('Mark as nofollow', 'iconic-button')}
					checked={!!(rel && rel.includes('nofollow'))}
					onChange={(nofollow) => {
						let newRel = rel || '';

						if (nofollow) {
							if (!newRel.includes('nofollow')) {
								newRel = newRel
									? `${newRel} nofollow`
									: 'nofollow';
							}
						} else {
							newRel = newRel
								.replace(/\s*nofollow\s*/g, ' ')
								.trim();
						}

						setAttributes({
							rel: newRel,
						});
					}}
				/>
			</div>

			{url && (
				<div style={{ marginTop: '12px' }}>
					<button
						type="button"
						className="components-button is-link is-destructive"
						onClick={() => {
							setAttributes({
								url: '',
								target: '',
								rel: '',
							});
							onClose();
						}}
					>
						{__('Remove Link', 'iconic-button')}
					</button>
				</div>
			)}
		</div>
	);
};

export default LegacyUrlInput;
