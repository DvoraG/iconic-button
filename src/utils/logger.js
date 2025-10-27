/* eslint-disable no-console */
/**
 * Logs errors or warnings to the console in development mode.
 *
 * Outputs messages to the console for debugging the Iconic Button block in the
 * WordPress block editor. Only active when NODE_ENV is not 'production'.
 *
 * @since 1.0.0
 *
 * @param {string} level     Log level: 'error' or 'warning'.
 * @param {string} message   The log message.
 * @param {Object} [details] Optional details object.
 * @return {void}
 */
export function log(level, message, details = {}) {
	if (process.env.NODE_ENV !== 'production') {
		const logMessage = `[Iconic Button] ${message}`;
		const enrichedDetails = {
			...details,
			timestamp: new Date().toISOString(),
			url: window.location.href,
			userAgent: navigator.userAgent,
		};

		switch (level) {
			case 'error':
				console.error(logMessage, enrichedDetails);
				break;
			case 'warning':
				console.warn(logMessage, enrichedDetails);
				break;
			default:
				console.warn(logMessage, enrichedDetails);
				break;
		}
	}
}
