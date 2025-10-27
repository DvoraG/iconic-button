<?php
/**
 * Plugin Name:       Iconic Button
 * Description:       A customizable button block with icons and text for WordPress, enhancing your site with styled call-to-action buttons.
 * Version:           1.0.0
 * Requires at least: 6.6
 * Tested up tp:      6.8
 * Requires PHP:      7.4
 * Author:            Dvora Gvili
 * Author URI:        https://www.dgdev-studio.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       iconic-button
 * Domain Path:       /languages/
 *
 * @package Dgdev
 */

namespace dgdev;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

define( 'ICONIC_BUTTON_VERSION', '1.0.0' );
define( 'ICONIC_BUTTON_FA_VERSION', '7.0.1' );

if ( defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	delete_option( 'iconic_button_settings' );
}

/**
 * Logs errors or warnings to debug.log if WP_DEBUG is enabled.
 *
 * @since 1.0.0
 * @param string $level   Log level: 'error' or 'warning'.
 * @param string $message The log message.
 * @param array  $details Optional details as array.
 * @return void
 */
function iconic_button_log( $level, $message, $details = array() ) {
	if ( ! defined( 'WP_DEBUG' ) || ! WP_DEBUG ) {
		return; // Only log if WP_DEBUG is enabled.
	}

	$levels = array( 'error', 'warning' );
	if ( ! in_array( $level, $levels, true ) ) {
		$level = 'warning'; // Default fallback.
	}

	$log_message = sprintf(
		'[Iconic Button] %s: %s - Details: %s',
		strtoupper( $level ),
		sanitize_text_field( $message ),
		wp_json_encode( array_map( 'sanitize_text_field', (array) $details ) )
	);
	// phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log -- Guarded by WP_DEBUG, safe for production.
	error_log( $log_message ); // Logs to wp-content/debug.log.
}

/**
 * Initializes the Iconic Button block type for the block editor.
 *
 * Registers the 'dgdev/icon-buttons' and 'dgdev/icon-button' blocks using
 * WordPress block registration functions. Uses modern collection-based registration
 * for WP 6.7+ or falls back to individual registration for older versions.
 *
 * @since 1.0.0
 * @return void
 */
function iconic_button_block_init() {
	static $registered = false;

	if ( $registered ) {
		return;
	}
	$registered = true;

	if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) && version_compare( get_bloginfo( 'version' ), '6.7', '>=' ) ) {
		wp_register_block_types_from_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
	} else {
		register_block_type( __DIR__ . '/build/icon-buttons' );
		register_block_type( __DIR__ . '/build/icon-button' );
	}
}
add_action( 'init', __NAMESPACE__ . '\iconic_button_block_init' );

/**
 * Enqueue FontAwesome styles on the frontend when the Iconic Button block is present.
 *
 * Checks if the 'dgdev/icon-button' block is used in the current post and enqueues
 * FontAwesome CSS only if needed.
 *
 * @since 1.0.0
 * @return void
 */
// function iconic_button_enqueue_fontawesome_frontend() {
// 	static $already_run = false;

// 	if ( is_admin() || $already_run ) {
// 		return;
// 	}

// 	$already_run = true;

// 	global $post;
// 	if ( $post && has_block( 'dgdev/icon-button', $post ) ) {
// 		$fontawesome_url = plugins_url( 'assets/fontawesome-free-' . \ICONIC_BUTTON_FA_VERSION . '-web/css/all.min.css', __FILE__ );
// 		wp_enqueue_style(
// 			'fontawesome-frontend',
// 			$fontawesome_url,
// 			array(),
// 			\ICONIC_BUTTON_FA_VERSION,
//       'all' // Load in footer to avoid render blocking
// 		);
// 	}
// }
// add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\iconic_button_enqueue_fontawesome_frontend' );

/**
 * Enqueues necessary frontend assets (FontAwesome CSS and theme detection JS) 
 * when the Iconic Button block is present on the page.
 *
 * @since 1.0.0
 * @return void
 */
function iconic_button_enqueue_frontend_assets() {
    static $already_run = false;

    // 1. Only run on the frontend and only once
    if ( is_admin() || $already_run ) {
        return;
    }

    $already_run = true;

    global $post;
    
    // 2. Check if the block is used on the current post/page
    if ( $post && has_block( 'dgdev/icon-button', $post ) ) {
        
        // A. Enqueue FontAwesome CSS (Existing Logic)
        $fontawesome_url = plugins_url( 'assets/fontawesome-free-' . \ICONIC_BUTTON_FA_VERSION . '-web/css/all.min.css', __FILE__ );
        wp_enqueue_style(
            'fontawesome-frontend',
            $fontawesome_url,
            array(),
            \ICONIC_BUTTON_FA_VERSION,
            'all'
        );
        
        // B. Enqueue Theme Detection Script (NEW Logic)
        // This script is crucial for theme class detection on the frontend.
        // wp_enqueue_script(
        //     'dgdev-iconic-button-view-script', // Unique handle
        //     plugins_url( 'build/icon-button/script.js', __FILE__ ), // Adjust path if needed
        //     array(), // No dependencies necessary for this script
        //     \ICONIC_BUTTON_VERSION, // Use plugin version for cache busting
        //     true // Enqueue in the footer (defer)
        // );
    }
}
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\iconic_button_enqueue_frontend_assets' );

/**
 * Enqueue FontAwesome webfonts ASAP on the frontend when the Iconic Button block is present.
 *
 * Checks if the 'dgdev/icon-button' block is used in the current post and enqueues
 * FontAwesome webfonts only if needed. Prevents chaining requests by preloading the font.
 *
 * @since 1.0.0
 * @return void
 */
function iconic_button_preload_fontawesome_font() {
	$font_url = plugins_url( 'assets/fontawesome-free-' . \ICONIC_BUTTON_FA_VERSION . '-web/webfonts/fa-solid-900.woff2', __FILE__ );
	global $post;
	if ( $post && has_block( 'dgdev/icon-button', $post ) ) {
		echo '<link rel="preload" href="' . esc_url( $font_url ) . '" as="font" type="font/woff2" crossorigin>';
	}
}
add_action( 'wp_head', __NAMESPACE__ . '\iconic_button_preload_fontawesome_font', 1 );

/**
 * Enqueues FontAwesome styles in the WordPress block editor.
 *
 * Loads FontAwesome CSS for post, page, or site editor screens to ensure icons
 * are displayed correctly during block editing.
 *
 * @since 1.0.0
 * @return void
 */
function iconic_button_enqueue_fontawesome_editor() {
	if ( ! is_admin() ) {
		return;
	}

	global $current_screen;
	if ( $current_screen && in_array( $current_screen->base, array( 'post', 'page', 'site-editor' ), true ) ) {
		$fontawesome_url = plugins_url( 'assets/fontawesome-free-' . \ICONIC_BUTTON_FA_VERSION . '-web/css/all.min.css', __FILE__ );
		wp_enqueue_style(
			'fontawesome',
			$fontawesome_url,
			array(),
			\ICONIC_BUTTON_FA_VERSION
		);
	}
}
add_action( 'enqueue_block_assets', __NAMESPACE__ . '\iconic_button_enqueue_fontawesome_editor' );

/**
 * Applies performance optimizations: 'defer' to the custom JS and
 * asynchronous loading to the combined CSS.
 *
 * @param string $tag    The script or style tag HTML.
 * @param string $handle The script or style handle.
 * @return string The modified tag.
 */
function iconic_button_optimize_assets( $tag, $handle ) {
    // 1. Defer the JavaScript file (script.js)
    if ( 'dgdev-icon-button-script' === $handle ) {
        // This script is an event listener and can be safely deferred.
        return str_replace( '<script ', '<script defer ', $tag );
    }

    // 2.Async load FontAwesome
	if ( 'fontawesome-frontend' === $handle ) {
		return str_replace( 
			"rel='stylesheet'", 
			"rel='preload' as='style' onload=\"this.onload=null;this.rel='stylesheet'\"", 
			$tag 
		);
	}

    // 3. Asynchronously load the block CSS (style-index.css)
    if ( 'dgdev-icon-button-style' === $handle ) {
        // Use the classic async CSS pattern to load non-render-blocking.
        return str_replace( 
            "rel='stylesheet'", 
            "rel='preload' as='style' onload=\"this.onload=null;this.rel='stylesheet'\"", 
            $tag 
        );
    }
    
    return $tag;
}

// Apply the filter for both styles and scripts
add_filter( 'script_loader_tag', __NAMESPACE__ . '\iconic_button_optimize_assets', 10, 2 );
add_filter( 'style_loader_tag', __NAMESPACE__ . '\iconic_button_optimize_assets', 10, 2 );