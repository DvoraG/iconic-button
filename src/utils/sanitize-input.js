/**
 * Create a custom sanitization function for user input.
 *
 * @since 1.0.0
 *
 * @param {string} text   The input text to sanitize.
 * @return {string} text  The sanitized text.
 */
const sanitizePlainText = (text) => {
	return text.replace(/[^\p{L}\d\s'.,!?-]/gu, '');
};

export { sanitizePlainText };
