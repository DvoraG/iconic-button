/**
 * Internal dependencies
 */
import { checkIsDark } from '../components/color-control/color-utils';

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

			const newContext = checkIsDark(bgColor) ? 'dark' : 'light';
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

				// >>> NEW LINE TO FIX FOCUS ISSUE <<<
				// Removes focus, preventing the persistent active/focus state.
				event.currentTarget.blur();
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
