/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * An array of default Font Awesome icons available in the plugin.
 *
 * @since 1.0.0
 *
 * @type {Array<Object>} Each object contains a `label` (user-friendly name) and `value` (CSS class name).
 */
export const allIcons = [
	{ label: __('Add', 'iconic-button'), value: 'fas fa-plus' },
	{ label: __('Check', 'iconic-button'), value: 'fas fa-check' },
	{
		label: __('Chevron Left', 'iconic-button'),
		value: 'fas fa-chevron-left',
	},
	{ label: __('Edit', 'iconic-button'), value: 'fas fa-pen' },
	{ label: __('Email', 'iconic-button'), value: 'fas fa-envelope' },
	{ label: __('Heart', 'iconic-button'), value: 'fas fa-heart' },
	{ label: __('Home', 'iconic-button'), value: 'fas fa-house' },
	{ label: __('Link', 'iconic-button'), value: 'fas fa-link' },
	{ label: __('Notification', 'iconic-button'), value: 'fas fa-bell' },
	{ label: __('Search', 'iconic-button'), value: 'fas fa-magnifying-glass' },
	{ label: __('Settings', 'iconic-button'), value: 'fas fa-gear' },
	{ label: __('User', 'iconic-button'), value: 'fas fa-user' },
];
