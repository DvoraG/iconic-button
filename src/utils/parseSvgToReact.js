/**
 * @file This file contains helper functions for sanitizing and converting SVG strings to React components.
 * It is designed to securely handle SVG data and render it within a WordPress context.
 */
/* WordPress dependencies */
import { createElement } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/* Constants */
const DEFAULT_SIZE = 16;
const DEFAULT_FILL = 'currentColor';
const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
const EVENT_HANDLER_REGEX = /on\w+="[^"]*"/gi;
const ELEMENT_NODE = 1;
const TEXT_NODE = 3;

/**
 * A list of attributes that are allowed on SVG elements.
 * @type {Array<string>}
 */
const ALLOWED_SVG_ATTRIBUTES = [
	'viewBox',
	'width',
	'height',
	'fill',
	'stroke',
	'stroke-width',
	'stroke-linecap',
	'stroke-linejoin',
	'd',
	'cx',
	'cy',
	'r',
	'x',
	'y',
	'x1',
	'x2',
	'y1',
	'y2',
	'points',
	'transform',
	'style',
	'class',
	'id',
	'role',
	'aria-hidden',
	'aria-label',
];

/**
 * A list of allowed SVG element tags to prevent XSS attacks.
 * @type {Array<string>}
 */
const ALLOWED_SVG_ELEMENTS = [
	'svg',
	'g',
	'path',
	'circle',
	'rect',
	'line',
	'polyline',
	'polygon',
	'text',
	'tspan',
	'title',
	'desc',
];

/**
 * Converts DOM attributes to React-compatible props (e.g., `class` to `className`).
 *
 * @since 1.0.0
 *
 * @param {NamedNodeMap} attributes The DOM element's attributes.
 * @return {Object<string, string>} A plain object of React props.
 */
const convertAttributesToProps = (attributes) => {
	const props = {};
	const attributeArray = Array.from(attributes);

	for (const attr of attributeArray) {
		const attrName = attr.name;
		let reactPropName = attrName;

		// Convert kebab-case to camelCase
		if (attrName.includes('-')) {
			reactPropName = attrName.replace(/-([a-z])/g, (g) =>
				g[1].toUpperCase()
			);
		}

		// Handle special React prop names
		if (reactPropName === 'class') {
			reactPropName = 'className';
		}

		props[reactPropName] = attr.value;
	}
	return props;
};

/**
 * Sanitizes an individual DOM element by removing disallowed attributes.
 *
 * @since 1.0.0
 *
 * @param {Element} element The DOM element to sanitize.
 */
function sanitizeAttributes(element) {
	const attributes = Array.from(element.attributes);
	attributes.forEach((attr) => {
		const attrName = attr.name.toLowerCase();
		if (
			attrName.startsWith('on') ||
			!ALLOWED_SVG_ATTRIBUTES.includes(attrName)
		) {
			element.removeAttribute(attrName);
		}
	});
}

/**
 * Recursively sanitizes a DOM element and its children based on a list of allowed elements and attributes.
 *
 * @since 1.0.0
 *
 * @param {Element}       element The DOM element to sanitize.
 * @param {string|number} [size]  The desired size for the SVG, used to adjust `stroke-width`.
 */
function sanitizeElement(element, size) {
	if (!ALLOWED_SVG_ELEMENTS.includes(element.tagName.toLowerCase())) {
		element.parentNode?.removeChild(element);
		return;
	}

	sanitizeAttributes(element);

	// Adjust stroke-width for better visibility
	if (
		element.tagName.toLowerCase() === 'path' &&
		element.hasAttribute('stroke')
	) {
		const sizeNum = parseFloat(size) || DEFAULT_SIZE;
		const baseStrokeWidth =
			parseFloat(element.getAttribute('stroke-width')) || 1;
		const scaleFactor = sizeNum / DEFAULT_SIZE;
		element.setAttribute('stroke-width', baseStrokeWidth * scaleFactor);
	}

	Array.from(element.children).forEach((child) =>
		sanitizeElement(child, size)
	);
}

/**
 * Recursively converts a DOM element into a React element.
 *
 * @since 1.0.0
 *
 * @param {Element} element     The DOM element to convert.
 * @param {string}  [parentKey] A unique key to ensure stable component rendering.
 * @return {Element|string|null} The created React element, a text node or null.
 */
function domToReact(element, parentKey = '') {
	const tagName = element.tagName.toLowerCase();
	const props = convertAttributesToProps(element.attributes);

	const children = Array.from(element.childNodes)
		.map((child, index) => {
			if (child.nodeType === ELEMENT_NODE) {
				return domToReact(child, `${parentKey}${tagName}-${index}-`);
			} else if (child.nodeType === TEXT_NODE) {
				return child.textContent;
			}
			return null;
		})
		.filter((child) => child !== null);

	// Separate key from props to avoid passing it to the component
	const key = parentKey ? `${parentKey}${tagName}` : undefined;
	return createElement(
		tagName,
		{ ...props, key },
		children.length > 0 ? children : null
	);
}

/**
 * Sanitizes an SVG string by removing `<script>` tags and event handlers.
 *
 * @since 1.0.0
 *
 * @param {string} svgString The raw SVG string to sanitize.
 * @return {string} The sanitized SVG string.
 */
const sanitizeSvgString = (svgString) => {
	return svgString.replace(SCRIPT_REGEX, '').replace(EVENT_HANDLER_REGEX, '');
};

/**
 * Creates a fallback React element to display in case of an error.
 *
 * @since 1.0.0
 *
 * @param {string} message   The message to display.
 * @param {string} className The CSS class name for the fallback element.
 * @return {Element} The created error fallback element.
 */
const createErrorFallback = (message, className) => {
	return createElement(
		'span',
		{
			className: `dgdevicob-icon-${className}`,
			'aria-label': message || __('Icon unavailable', 'iconic-button'),
			title: message, // Shows message on hover
		},
		'⚠️'
	);
};

/**
 * Parses a raw SVG string, sanitizes it, and converts it into a renderable React element.
 *
 * @since 1.0.0
 *
 * @param {string}        svgString The raw SVG string to parse.
 * @param {string|number} [size]    The desired width and height for the SVG.
 * @return {Element|null} The React element, or `null` if the input is invalid.
 */
function parseSvgToReact(svgString, size) {
	// Validate input - return early with null for graceful handling
	if (
		!svgString ||
		typeof svgString !== 'string' ||
		svgString.trim() === ''
	) {
		return null;
	}

	try {
		const sanitizedSvg = sanitizeSvgString(svgString);

		// eslint-disable-next-line no-undef
		const parser = new DOMParser();
		const doc = parser.parseFromString(sanitizedSvg, 'image/svg+xml');
		const parseError = doc.querySelector('parsererror');

		if (parseError) {
			return createErrorFallback('Icon unavailable', 'fallback');
		}

		const svgElement = doc.documentElement;
		sanitizeElement(svgElement, size);

		// Remove unnecessary XML attributes
		svgElement.removeAttribute('xmlns:xlink');
		svgElement.removeAttribute('xml:space');
		svgElement.removeAttribute('xmlns:serif');

		// Apply size if provided
		if (size) {
			svgElement.setAttribute('width', size);
			svgElement.setAttribute('height', size);
		}

		// Set default fill if not present
		if (!svgElement.hasAttribute('fill')) {
			svgElement.setAttribute('fill', DEFAULT_FILL);
		}

		return domToReact(svgElement);
	} catch (error) {
		// Return graceful fallback instead of throwing
		return createErrorFallback('Icon could not be loaded', 'error');
	}
}

export { parseSvgToReact };
