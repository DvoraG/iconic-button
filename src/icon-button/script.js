/**
 * Internal dependencies
 */
import { log } from '../utils/logger';

/**
 * Initializes the script after the DOM has been fully loaded.
 * It queries all icon-button blocks and sets up event listeners and observers.
 *
 * @since 1.0.0
 *
 * @event DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', () => {
	const buttons = document.querySelectorAll('.wp-block-dgdev-icon-button');

	const updateThemeClass = () => {
		if (!buttons.length) {
			return;
		}

		buttons.forEach((button) => {
			if (button.getAttribute('data-updating')) {
				return;
			}
			button.setAttribute('data-updating', 'true');

			const bodyStyle = window.getComputedStyle(document.body);
			const bgColor = bodyStyle.backgroundColor;

			/**
			 * Determines if a given color is "dark" based on its luminance.
			 * @param {string} color - The color string (e.g., 'rgb(r,g,b)' or '#rrggbb').
			 * @return {boolean} True if the color is dark, otherwise false.
			 */
			const isDark = (color) => {
				const rgbMatch = color.match(
					/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*\d+\.\d+)?\)/i
				);
				if (rgbMatch && rgbMatch.length >= 4) {
					const r = parseInt(rgbMatch[1], 10);
					const g = parseInt(rgbMatch[2], 10);
					const b = parseInt(rgbMatch[3], 10);
					const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
					return luminance < 128;
				}
				if (color.startsWith('#')) {
					const hex = color.slice(1);
					const r = parseInt(
						hex.length === 3 ? hex[0] + hex[0] : hex.slice(0, 2),
						16
					);
					const g = parseInt(
						hex.length === 3 ? hex[1] + hex[1] : hex.slice(2, 4),
						16
					);
					const b = parseInt(
						hex.length === 3 ? hex[2] + hex[2] : hex.slice(4, 6),
						16
					);
					const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
					return luminance < 128;
				}
				log('warn', 'Unrecognized color format:', { color });

				return false;
			};

			const newContext = isDark(bgColor) ? 'dark' : 'light';
			const currentContext = button.classList.contains('is-theme-dark')
				? 'dark'
				: 'light';

			if (newContext !== currentContext) {
				button.classList.remove(
					currentContext === 'dark'
						? 'is-theme-dark'
						: 'is-theme-light'
				);
				button.classList.add(`is-theme-${newContext}`);
			}

			button.removeAttribute('data-updating');
		});
	};

	updateThemeClass(); // Initial update
	let timeout;
	/**
	 * Debounces a function call.
	 * @param {Function} callback   The function to debounce.
	 * @param {number}   delay      The delay in milliseconds.
	 */
	const debounce = (callback, delay) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => callback(), delay);
	};

	const handleButtonClick = (button) => {
		const feedbackContainer = button.querySelector(
			'.wp-block-dgdev-icon-button__feedback'
		);
		if (feedbackContainer) {
			feedbackContainer.textContent = 'Button was clicked';

			setTimeout(() => {
				feedbackContainer.textContent = '';
			}, 3000);
		}
	};

	buttons.forEach((button) => {
		const buttonLink = button.querySelector(
			'.wp-block-dgdev-icon-button__link'
		);
		if (buttonLink) {
			buttonLink.addEventListener('click', (event) => {
				const buttonsInGroup = document.querySelectorAll(
					'.wp-block-dgdev-icon-buttons .wp-block-dgdev-icon-button__link'
				);
				buttonsInGroup.forEach((btn) => {
					btn.classList.remove('selected');
					btn.removeAttribute('aria-current');
				});
				event.currentTarget.classList.add('selected');
				event.currentTarget.setAttribute('aria-current', 'page');

				handleButtonClick(button);
			});
		}
	});

	// eslint-disable-next-line no-undef
	const observer = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			if (mutation.attributeName === 'style') {
				debounce(updateThemeClass, 200);
			}
		});
	});
	observer.observe(document.body, {
		attributes: true,
		attributeFilter: ['style'],
	});

	window.addEventListener('resize', () => debounce(updateThemeClass, 200));
});
