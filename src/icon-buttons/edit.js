/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */
import './editor.scss';

/**
 * Edit component for the Icon Buttons block.
 *
 * Renders the block icon wrapper and allows adding Icon Button blocks inside it.
 *
 * @return {Element} The icon buttons wrapper component as React component.
 */
const Edit = () => {
	const blockProps = useBlockProps({
		className: 'has-global-padding',
	});

	return (
		<div {...blockProps}>
			<InnerBlocks
				allowedBlocks={['dgdev/icon-button']}
				template={[['dgdev/icon-button']]}
			/>
		</div>
	);
};

export default Edit;
