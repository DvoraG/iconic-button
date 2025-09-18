/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useMemo } from '@wordpress/element';
import {
	TextControl,
	Tooltip,
	Button,
	BaseControl,
} from '@wordpress/components';
/**
 * Internal dependencies
 */
import { allIcons as fontAwesomeIcons } from '../../utils/initial-icons'; // All the icons used in the picker.
import './icon-picker.scss';

const allIcons = [...fontAwesomeIcons];

/**
 * Icon Picker component.
 *
 * This component allows users to select an icon by clicking on it.
 * It uses local imports for the SCSS styles and the initial icon data.
 *
 * @since 1.0.0
 *
 * @param {Object}   props          Block properties from `@wordpress/block-editor`.
 * @param {string}   props.value    The currently selected icon.
 * @param {Function} props.onChange A function to call when an different icon is selected.
 * @return {Element} The icon picker interface as a React component.
 */
const IconPicker = ({ value, onChange }) => {
	const [search, setSearch] = useState('');
	const filteredIcons = useMemo(() => {
		return allIcons.filter((icon) => {
			const isValid =
				icon &&
				typeof icon.label === 'string' &&
				icon.label.trim() !== '' &&
				typeof icon.value === 'string';
			if (!isValid) {
				return false;
			}
			return icon.label.toLowerCase().includes(search.toLowerCase());
		});
	}, [search]);

	return (
		<BaseControl className="dgdevicob-icon-picker" __nextHasNoMarginBottom>
			<TextControl
				__next40pxDefaultSize
				__nextHasNoMarginBottom
				label={__('Search Icons', 'iconic-button')}
				value={search}
				onChange={setSearch}
				placeholder={__('Type to filter icons…', 'iconic-button')}
			/>
			<div className="dgdevicob-icon-picker__grid">
				{filteredIcons.length > 0 ? (
					filteredIcons.map((icon) => (
						<Tooltip text={icon.label} key={icon.value}>
							<Button
								className="dgdevicob-icon-picker__button"
								isPressed={value === icon.value}
								onClick={() =>
									onChange({
										value: icon.value,
										label: icon.label,
									})
								}
							>
								{icon.value ? (
									<i
										className={icon.value}
										aria-hidden="true"
									></i>
								) : (
									<span>{__('None', 'iconic-button')}</span>
								)}
							</Button>
						</Tooltip>
					))
				) : (
					<p>{__('No icons found.', 'iconic-button')}</p>
				)}
			</div>
		</BaseControl>
	);
};

export default IconPicker;
