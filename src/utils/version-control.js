import { LinkControl } from '@wordpress/block-editor';
/**
 * Detect current WordPress version
 *
 * @since 1.0.0
 *
 * @return {string} version Returns '6.8+' for current and future WordPress version or '6.7-' for older
 */
const getWordPressVersion = () => {
	if (window.wp?.data?.select('core')?.getSite) {
		const site = window.wp.data.select('core').getSite();
		if (site?.wordpress_version) {
			return site.wordpress_version;
		}
	}

	try {
		const testLinkControl = LinkControl;
		if (testLinkControl && typeof testLinkControl === 'function') {
			return '6.8+';
		}
	} catch (error) {
		return '6.7-';
	}

	return '6.7-'; // Default to older version for safety
};

/**
 * Compare version strings
 *
 * @since 1.0.0
 *
 * @param {string} version       The current WordPress version.
 * @param {string} targetVersion The version '6.8' when LinkControl component was introduced.
 * @return {boolean} true/false  When current WorPress version equals or is greater 6.8, false if current version is 6.7 or less.
 */
const isVersionGreaterOrEqual = (version, targetVersion) => {
	if (!version || version === '6.7-' || version === '6.8+') {
		return version === '6.8+';
	}

	const versionParts = version.split('.').map(Number);
	const targetParts = targetVersion.split('.').map(Number);

	for (
		let i = 0;
		i < Math.max(versionParts.length, targetParts.length);
		i++
	) {
		const vPart = versionParts[i] || 0;
		const tPart = targetParts[i] || 0;

		if (vPart > tPart) {
			return true;
		} else if (vPart < tPart) {
			return false;
		}
	}
	return true; // Equal versions
};

export { getWordPressVersion, isVersionGreaterOrEqual };
