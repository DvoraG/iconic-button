/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { URLInput } from '@wordpress/block-editor';
import { ToggleControl, Button } from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * Legacy URLInput component (WordPress 6.7 and earlier)
 *
 * @since 1.0.0
 *
 * @param {Object}   props                          Block properties from `@wordpress/block-editor`.
 * @param {Object}   props.attributes               Block attributes.
 * @param {string}   props.attributes.url           The URL attribute.
 * @param {string}   props.attributes.target        The link target attribute.
 * @param {string}   props.attributes.rel           The link rel attribute.
 * @param {boolean}  props.attributes.isScrollToTop Whether the link is for scrolling to top.
 * @param {Function} props.setAttributes            Function to update block attributes.
 * @param {Function} props.onClose                  Function to close the URL input.
 * @return {Element} The link interface in the toolbar as a React component.
 */
const LegacyUrlInput = ({ attributes, setAttributes, onClose }) => {
	const { url, target, rel, isScrollToTop } = attributes;

	// For display purposes, show empty string if it's the "no link" state
	const isNoLink = url === '#' && !isScrollToTop;
	const [tempUrl, setTempUrl] = useState(isNoLink ? '' : url || '');

	const handleSave = () => {
		// If tempUrl is empty, set to '#' with isScrollToTop=false (no link state)
		// If tempUrl is '#', keep isScrollToTop as is
		// If tempUrl has a value, isScrollToTop should be false
		const finalUrl = tempUrl || '#';
		let finalScrollToTop = false;

		if (tempUrl === '#') {
			finalScrollToTop = isScrollToTop;
		}

		setAttributes({
			url: finalUrl,
			isScrollToTop: finalScrollToTop,
		});
		onClose();
	};

	const handleRemoveLink = () => {
		setAttributes({
			url: '#',
			target: '',
			rel: '',
			isScrollToTop: false,
		});
		setTempUrl('');
		onClose();
	};

	return (
		<div style={{ padding: '16px', width: '350px' }}>
			<URLInput
				__nextHasNoMarginBottom
				value={tempUrl}
				onChange={(newUrl) => setTempUrl(newUrl)}
				placeholder={__(
					'Enter URL, # for scroll to top, or leave empty for no link',
					'iconic-button'
				)}
				onKeyDown={(event) => {
					if (event.key === 'Enter') {
						handleSave();
					}
				}}
			/>

			{/* Only show link options if there's a URL or it's # */}
			{tempUrl && tempUrl !== '#' && (
				<>
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
									newRel = newRel
										? `${newRel} nofollow`
										: 'nofollow';
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
				</>
			)}

			{/* Show scroll to top toggle when URL is # or empty */}
			{(!tempUrl || tempUrl === '#') && (
				<div style={{ marginTop: '12px' }}>
					<ToggleControl
						__nextHasNoMarginBottom
						label={__('Scroll to top', 'iconic-button')}
						checked={isScrollToTop}
						help={
							isScrollToTop
								? __(
										'Button will scroll to top when clicked',
										'iconic-button'
									)
								: __(
										'Button will have no link functionality',
										'iconic-button'
									)
						}
						onChange={(newScrollToTop) => {
							setAttributes({
								isScrollToTop: newScrollToTop,
							});
							// If enabling scroll to top, set tempUrl to #
							if (newScrollToTop && !tempUrl) {
								setTempUrl('#');
							}
						}}
					/>
				</div>
			)}

			<div
				style={{
					display: 'flex',
					gap: '8px',
					justifyContent: 'end',
					marginBlockStart: '12px',
				}}
			>
				{(url && url !== '#') || (url === '#' && isScrollToTop) ? (
					<Button
						variant="secondary"
						isDestructive
						onClick={handleRemoveLink}
					>
						{__('Remove Link', 'iconic-button')}
					</Button>
				) : null}
				<Button variant="primary" onClick={handleSave}>
					{__('Save', 'iconic-button')}
				</Button>
			</div>
		</div>
	);
};

export default LegacyUrlInput;
