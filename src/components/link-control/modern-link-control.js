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
 * @param {Object}   props                            Block properties from `@wordpress/block-editor`.
 * @param {Object}   props.attributes                 The Block attributes.
 * @param {string}   props.attributes.url             The link URL.
 * @param {string}   props.attributes.target          The link target (e.g., '_blank' for new tab).
 * @param {boolean}  props.isOpen                     Whether the LinkControl is open.
 * @param {string}   props.attributes.rel             The link rel attribute (e.g., 'nofollow').
 * @param {boolean}  props.attributes.isScrollToTop   Whether the link is for scrolling to top.
 * @param {Function} props.onClose                    Function to close the LinkControl.
 * @param {Function} props.setAttributes              Function to update block attributes, provided by `@wordpress/block-editor`.
 * @return {Element} The link interface in the toolbar as a React component.
 */
const ModernLinkControl = ({ attributes, setAttributes, isOpen, onClose }) => {
	const { url, target, rel, isScrollToTop } = attributes;

	const baseSettings = [
		{
			id: 'opensInNewTab',
			title: __('Open in new tab', 'iconic-button'),
		},
		{
			id: 'nofollow',
			title: __('Mark as nofollow', 'iconic-button'),
		},
	];

	const toTopSettings = [
		{
			id: 'isScrollToTop',
			title: __('Scroll to top', 'iconic-button'),
		},
	];

	// Use baseSettings when url is defined and not '#', otherwise use toTopSettings
	const settings = url && url !== '#' ? baseSettings : toTopSettings;

	return (
		<LinkControl
			value={{
				url: url || '#',
				opensInNewTab: target === '_blank',
				nofollow: !!(rel && rel.includes('nofollow')),
				isScrollToTop,
			}}
			onChange={({
				url: newUrl = '',
				opensInNewTab = false,
				nofollow = false,
				isScrollToTop: newScrollToTop = false,
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
					url: newUrl || '#',
					target: opensInNewTab ? '_blank' : '',
					rel: newRel || '',
					isScrollToTop: newScrollToTop,
				});
			}}
			onRemove={() => {
				setAttributes({
					url: '#',
					target: '',
					rel: '',
					isScrollToTop: false,
				});
				onClose();
			}}
			settings={settings}
			hasRichPreviews
			forceIsEditingLink={isOpen}
			showSuggestions
		/>
	);
};

export default ModernLinkControl;
