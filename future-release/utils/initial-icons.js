/**
 * @file This file manages the icons for the Iconic Button plugin, including a list of default icons and functions for managing custom icons via the REST API.
 */

import { __ } from '@wordpress/i18n';
import api from '@wordpress/api-fetch';
import { log } from './logger';

/**
 * An array of default Font Awesome icons available in the plugin.
 *
 * @type {Array<Object>}
 */
export const allIcons = [
	{ label: __('Add', 'iconic-button'), value: 'fas fa-plus' },
	{ label: __('Arrow Left', 'iconic-button'), value: 'fas fa-arrow-left' },
	{ label: __('Arrow Right', 'iconic-button'), value: 'fas fa-arrow-right' },
	{ label: __('Arrow Up', 'iconic-button'), value: 'fas fa-arrow-up' },
	{ label: __('Arrow Down', 'iconic-button'), value: 'fas fa-arrow-down' },
	{ label: __('Cart', 'iconic-button'), value: 'fas fa-cart-shopping' },
	{ label: __('Check', 'iconic-button'), value: 'fas fa-check' },
	{
		label: __('Chevron Left', 'iconic-button'),
		value: 'fas fa-chevron-left',
	},
	{
		label: __('Chevron Right', 'iconic-button'),
		value: 'fas fa-chevron-right',
	},
	{ label: __('Circle', 'iconic-button'), value: 'fas fa-circle' },
	{ label: __('Close', 'iconic-button'), value: 'fas fa-xmark' },
	{ label: __('Delete', 'iconic-button'), value: 'fas fa-trash' },
	{ label: __('Download', 'iconic-button'), value: 'fas fa-download' },
	{ label: __('Edit', 'iconic-button'), value: 'fas fa-pen' },
	{ label: __('Email', 'iconic-button'), value: 'fas fa-envelope' },
	{ label: __('Heart', 'iconic-button'), value: 'fas fa-heart' },
	{ label: __('Help', 'iconic-button'), value: 'fas fa-question' },
	{ label: __('Home', 'iconic-button'), value: 'fas fa-house' },
	{ label: __('Information', 'iconic-button'), value: 'fas fa-info' },
	{ label: __('Link', 'iconic-button'), value: 'fas fa-link' },
	{ label: __('Menu', 'iconic-button'), value: 'fas fa-bars' },
	{ label: __('Notification', 'iconic-button'), value: 'fas fa-bell' },
	{ label: __('Phone', 'iconic-button'), value: 'fas fa-phone' },
	{ label: __('Remove', 'iconic-button'), value: 'fas fa-minus' },
	{ label: __('Share', 'iconic-button'), value: 'fas fa-share-nodes' },
	{ label: __('Search', 'iconic-button'), value: 'fas fa-magnifying-glass' },
	{ label: __('Settings', 'iconic-button'), value: 'fas fa-gear' },
	{ label: __('Star', 'iconic-button'), value: 'fas fa-star' },
	{ label: __('Upload', 'iconic-button'), value: 'fas fa-upload' },
	{ label: __('User', 'iconic-button'), value: 'fas fa-user' },
	{
		label: __('Warning', 'iconic-button'),
		value: 'fas fa-triangle-exclamation',
	},
];

/**
 * An array to store custom icons that will be implemented with one of the next plugin versions.
 *
 * @type {Array<Object>}
 */
export let customIcons = [];
/**
 * Will fetch and store custom icons from the WordPress REST API.
 * The loaded icons are supposed to be stored in the `customIcons` variable.
 *
 * @return {Promise<void>}
 */
export const loadCustomIcons = async () => {
	try {
		const response = await api({
			// path: '/iconic-button/v1/custom-icons',   changed 1509
			path: 'iconic-button/v1/custom-icons',
			method: 'GET',
		});
		customIcons = response || [];
	} catch (error) {
		log('error', 'Failed to load custom icons:', error);
	}
};

/**
 * For implementation in one of the next plugin versions.
 * Adds a new custom icon to the `customIcons` array and saves it via the WordPress REST API.
 * The function first checks for duplicate icons before adding and saving.
 *
 * @param {string} label The user-friendly label for the new icon.
 * @param {string} value The value (CSS class name) for the new icon.
 * @return {Promise<void>}
 */
export const addCustomIcon = async (label, value) => {
	const newIcon = { label, value: value.toLowerCase().replace(/\s/g, '-') };
	if (
		!allIcons.some((icon) => icon.value === newIcon.value) &&
		!customIcons.some((icon) => icon.value === newIcon.value)
	) {
		customIcons.push(newIcon);
		try {
			await api({
				// path: '/iconic-button/v1/custom-icons',  - changed 1509
				path: 'iconic-button/v1/custom-icons',
				method: 'POST',
				data: customIcons,
			});
		} catch (error) {
			log('error', 'Failed to save custom icon:', error);
		}
	}
};
