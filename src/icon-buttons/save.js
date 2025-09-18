/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */
import './style.scss';

/**
 * Renders the saved content of the icon buttons block in the frontend.
 *
 * @return {Element} The icon buttons wrapper component as React component.
 */
const save = () => {
	const blockProps = useBlockProps.save({
		className: 'has-global-padding',
	});

	return (
		<div {...blockProps}>
			<InnerBlocks.Content />
		</div>
	);
};

export default save;
