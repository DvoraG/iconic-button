/**
 * WordPress dependencies
 */
import { LinkControl } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Modern LinkControl component (WordPress 6.8+)
 *
 * @since 1.0.0
 *
 * @param {Object}   props                    Block properties from `@wordpress/block-editor`.
 * @param {Object}   props.attributes         The Block attributes.
 * @param {string}   props.attributes.url     The link URL.
 * @param {string}   props.attributes.target  The link target (e.g., '_blank' for new tab).
 * @param {string}   props.attributes.rel     The link rel attribute (e.g., 'nofollow').
 * @param {Function} props.setAttributes      Function to update block attributes, provided by `@wordpress/block-editor`.
 * @return {Element} The link interface in the toolbar as a React component.
 */
const ModernLinkControl = ({ attributes, setAttributes }) => {
	const { url, target, rel } = attributes;

	return (
		<LinkControl
			value={{
				url: url || '',
				opensInNewTab: target === '_blank',
				nofollow: !!(rel && rel.includes('nofollow')),
			}}
			onChange={({
				url: newUrl = '',
				opensInNewTab = false,
				nofollow = false,
			}) => {
				let newRel = rel || '';

				if (nofollow) {
					if (!newRel.includes('nofollow')) {
						newRel = newRel ? `${newRel} nofollow` : 'nofollow';
					}
				} else {
					newRel = newRel.replace(/\s*nofollow\s*/g, ' ').trim();
				}

				setAttributes({
					url: newUrl || '',
					target: opensInNewTab ? '_blank' : '',
					rel: newRel || '',
				});
			}}
			onRemove={() => {
				setAttributes({
					url: '',
					target: '',
					rel: '',
				});
			}}
			settings={[
				{
					id: 'opensInNewTab',
					title: __('Open in new tab', 'iconic-button'),
				},
				{
					id: 'nofollow',
					title: __('Mark as nofollow', 'iconic-button'),
				},
			]}
			hasRichPreviews
		/>
	);
};

export default ModernLinkControl;
