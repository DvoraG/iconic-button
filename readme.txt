=== Iconic Button by DG DevStudio ===
Contributors: Dvora Gvili
Tags: button, icon-button, gutenberg, accessible, wcag, block, font-awesome, responsive, keyboard-navigation, semantic-html
Requires at least: 6.6
Tested up to: 6.8
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Create beautiful, accessible icon buttons for WordPress. WCAG 2.1 Level AA compliant, performance-optimized, Gutenberg native.

== Description ==

**Iconic Button** is a lightweight, accessible WordPress block plugin that lets you create beautiful buttons with icons. 
Built with performance and accessibility in mind, it follows WCAG 2.1 Level AA standards and WordPress coding best practices.

= Key Features =

* **Gutenberg Native** - Two complementary blocks: Icon Buttons (wrapper) and Icon Button (individual button)
* **Icon Library** - 31 carefully selected Font Awesome icons included
* **Extendable** - Developers can add more Font Awesome 7.0.1 free icons
* **Two Style Variants** - Fill and Outline styles for different design needs
* **Full Accessibility** - WCAG 2.1 Level AA compliant with keyboard navigation and screen reader support
* **Performance Optimized** - Minimal footprint: ~1.7 KiB JavaScript, ~14-17 KiB CSS
* **Automatic Dark Mode** - JavaScript detects theme and adapts button default colors automatically
* **Theme Colors** - Uses your theme's color palette for consistent design
* **Text Options** - Add text before or after icons, or use icon-only buttons
* **Smart Tooltips** - Automatic tooltips for icon-only buttons
* **Link Types** - Support for internal links, external links, and anchor links
* **External Link Indicator** - Visual indicator for external links to improve UX
* **Focus/Active Preview** - Toggle button states in editor to see how they look
* **RTL Support** - Full right-to-left language support
* **Reduced Motion** - Respects user's motion preferences
* **High Contrast Mode** - Supports accessibility contrast settings
* **Mobile Optimized** - Touch-friendly 44×44px minimum tap targets
* **No Database Tables** - Lightweight with no custom database requirements
* **Translation Ready** - Fully internationalized with .pot file included

= Perfect For =

* Call-to-action buttons
* Download buttons
* Social media links
* Navigation elements
* Contact buttons
* Icon-based menus
* Accessible web applications

= Why Choose Iconic Button? =

**Accessibility First**
Unlike many button plugins, Iconic Button is built from the ground up with accessibility in mind:
- Full keyboard navigation support
- Proper focus indicators (WCAG 2.1 compliant)
- Screen reader compatible with ARIA labels
- Semantic HTML structure
- Color contrast meeting AA standards
- Reduced motion support for users with vestibular disorders

**Performance Optimized**
- Lighthouse Performance Score: 99 mobile and desktop
- Lighthouse Accessibility Score: 96-100
- Lighthouse Best Practices Score: 100
- Minimal JavaScript (~1.7 KiB, loads only on pages with buttons)
- Minimal CSS footprint (~14-17 KiB total)
- No external API calls or dependencies

**Developer Friendly**
- Clean, well-documented code
- WordPress Coding Standards compliant
- Follows Gutenberg block best practices
- Extensible icon library
- CSS custom properties for easy customization
- Translation ready

= Technical Specifications =

* **WordPress Version:** 6.6 or higher (tested up to 6.8)
* **PHP Version:** 7.4 or higher (tested up to 8.3)
* **Browser Support:** Chrome, Firefox, Safari, Edge (latest 2 versions)
* **Mobile Support:** iOS Safari, Android Chrome
* **RTL Support:** Full right-to-left language support
* **Multisite Compatible:** Yes

= Available Icons =

31 carefully selected Font Awesome 7.0.1 icons:
- Add (default)/Remove
- User
- Heart
- Star
- Phone/Envelope
- Home
- Cart Shopping
- Bell/Circle Info
- Check Mark
- Information/Help Question Mark/Warning
- Download/Upload/Share Nodes/Link
- Arrow Right/Arrow Up/Arrow Down/Arrow Left
- Chevron Left/Chevron Right
- Magnifying Glass/Bars/X Mark
- Gear/Pen/Trash Can

*Developers can extend with any Font Awesome 7.0.1 free icon.*

= Documentation =

Complete documentation is included:
- Installation guide
- User guide with examples
- Performance documentation
- Lighthouse testing guide
- Developer documentation
- FAQ

= Support =

Support is provided through CodeCanyon item comments. Please include:
- WordPress version
- PHP version
- Active theme
- Description of the issue
- Screenshots (if applicable)

Expected response time: 24-48 hours during business days.

= Privacy =

This plugin does not:
- Collect any user data
- Make external API calls (Font Awesome is bundled)
- Use cookies or tracking
- Store personal information
- Create custom database tables

Your privacy is protected.

== Installation ==

= Automatic Installation =

1. Log in to your WordPress admin dashboard
2. Navigate to Plugins → Add New
3. Click "Upload Plugin" at the top
4. Choose the `iconic-button.zip` file
5. Click "Install Now"
6. After installation, click "Activate Plugin"

= Manual Installation =

1. Download the `iconic-button.zip` file
2. Extract the ZIP file
3. Upload the `iconic-button` folder to `/wp-content/plugins/` directory via FTP
4. Log in to your WordPress admin dashboard
5. Navigate to Plugins → Installed Plugins
6. Find "Iconic Button by DG DevStudio" and click "Activate"

= First Button Creation =

1. Create or edit a page/post
2. Click the "+" button to add a new block
3. Search for "Icon Button" or "Icon Buttons"
4. Insert the Icon Buttons wrapper (for grouping)
5. Insert Icon Button block inside
6. Customize your button:
   - Choose an icon from the sidebar
   - Select Fill or Outline style
   - Set button colors (uses theme colors)
   - Add text (optional)
   - Add link in the toolbar
7. Preview focus/active states using the sidebar toggle
8. Publish your page

== Frequently Asked Questions ==

= Does this plugin require jQuery or other JavaScript libraries? =

No external libraries required! Iconic Button uses:
- Lightweight vanilla JavaScript (~1.7 KiB minified)
- Loads only on pages with buttons (not sitewide)
- No jQuery dependency
- No external JavaScript libraries
- Features: Automatic dark mode detection, enhanced accessibility

This means:
- Fast page load times
- No JavaScript conflicts with other plugins
- Better performance scores
- More reliable functionality

= Is this plugin accessible? =

Yes! Iconic Button is fully WCAG 2.1 Level AA compliant:
- Full keyboard navigation
- Screen reader compatible
- Proper focus indicators
- High contrast mode support
- Reduced motion support
- Semantic HTML

Lighthouse accessibility scores: 96-100

= Can I use custom colors? =

The plugin uses your theme's color palette to ensure design consistency. If you need custom colors:
1. Add custom colors to your theme
2. Use WordPress Global Styles (Appearance → Editor → Styles → Colors)
3. Custom colors will appear in the button color picker

= Can I add more icons? =

Yes! The plugin includes 31 Font Awesome icons by default. Developers can extend the icon library by modifying the `initial-icons.js` file 
to add any Font Awesome 7.0.1 free icon. See Developer Documentation for instructions.

= Does it work with page builders? =

Iconic Button works with any WordPress setup that supports Gutenberg blocks:
- Native WordPress editor (Gutenberg) ✓
- Full Site Editing (FSE) ✓
- Page builders with block support ✓

= Is it compatible with caching plugins? =

Yes! The plugin works perfectly with all caching plugins:
- WP Super Cache ✓
- W3 Total Cache ✓
- WP Rocket ✓
- All other caching solutions ✓

JavaScript loads only on pages with buttons, making it cache-friendly.

= Can I use it on client websites? =

Yes! The Extended License allows use on client websites where you charge for your services. The Regular License covers single end products.

= What's the difference between Fill and Outline styles? =

**Fill Style:**
- Solid background color
- Contrasting text/icon color
- More prominent, perfect for CTAs

**Outline Style:**
- Transparent background
- Colored border
- Subtle, good for secondary actions

= How does dark mode detection work? =

The plugin's JavaScript automatically detects your theme's background color on page load:
- Analyzes background luminosity
- Adds `is-theme-dark` or `is-theme-light` class
- CSS adjusts colors of icon buttons with default settings using custom properties
- Updates when theme changes (via resize/mutation observer)

= Does it support RTL languages? =

Yes! Full right-to-left language support is included. The plugin automatically adapts to RTL languages like Arabic, Hebrew, Persian, 
and Urdu.

= Can I disable animations for accessibility? =

The plugin automatically respects the user's `prefers-reduced-motion` system setting. Users who have disabled animations in their operating 
system will see static buttons with no motion effects.

= What happens if I deactivate the plugin? =

Deactivating the plugin will:
- Hide all Iconic Button blocks on your site
- Keep your content safe in the database
- Not delete any data

To completely remove the plugin, use the "Delete" option after deactivation.

== Screenshots ==

1. Iconic Button block in the WordPress Block Editor with settings panel
2. Style variants: Fill and Outline with different theme colors
3. Extensive customization options in the sidebar panel
4. Beautiful frontend display with hover and focus states
5. Full accessibility support - WCAG 2.1 Level AA compliant
6. External link indicator for improved user experience
7. Tooltip system for icon-only buttons
8. Automatic dark theme detection and adaptation
9. RTL (Right-to-Left) language support
10. Lighthouse performance scores showing excellent results

== Changelog ==

= 1.0.0 - January 2025 =
* Initial release
* Two Gutenberg blocks: Icon Buttons (wrapper) and Icon Button
* 31 Font Awesome 7.0.1 icons included
* Fill and Outline style variants
* WCAG 2.1 Level AA compliance
* Full keyboard navigation support
* Screen reader compatibility
* Automatic dark mode detection via JavaScript (~1.7 KiB)
* Responsive design (mobile, tablet, desktop)
* RTL language support
* Reduced motion support
* High contrast mode support
* External link indicator
* Automatic tooltips for icon-only buttons
* Focus and active state preview in editor
* Minimal JavaScript (~1.7 KiB, loads only on pages with buttons)
* Performance optimized (~14-17 KiB CSS)
* Multisite compatible
* Translation ready with .pot file
* Tested with WordPress 6.6, 6.7, 6.8
* Tested with PHP 7.4, 8.0, 8.1, 8.2, 8.3
* Tested with Chrome, Firefox, Safari
* Tested with 9 popular WordPress themes

== Upgrade Notice ==

= 1.0.0 =
Initial release. Welcome to Iconic Button!

== Credits ==

**Author:** Dvora Gvili
**Company:** DG DevStudio
**Website:** https://dg-devstudio.com

**Third-Party Resources:**
- Font Awesome 7.0.1 (Free Icons) - https://fontawesome.com
  License: Font Awesome Free License (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)

== Support ==

For support, please use the CodeCanyon item comments section.

**Expected Response Time:** 24-48 hours (business days)

**Support Includes:**
- Bug fixes
- Installation help
- Configuration assistance
- Compatibility issues
- Feature clarification

**Support Does NOT Include:**
- Customization services
- Theme compatibility issues (caused by theme)
- Server configuration
- Third-party plugin conflicts
- Custom development

For custom development inquiries, please contact: contact@dg-devstudio.com

== License ==

This plugin is licensed under GPLv2 or later.
https://www.gnu.org/licenses/gpl-2.0.html

Font Awesome icons are used under the Font Awesome Free License:
- Icons: CC BY 4.0 License (https://creativecommons.org/licenses/by/4.0/)
- Fonts: SIL OFL 1.1 License (https://scripts.sil.org/OFL)
- Code: MIT License (https://opensource.org/licenses/MIT)