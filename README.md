# Iconic Button

A powerful, customizable button block for the WordPress Gutenberg editor, designed to make your buttons stand out with vibrant colors, FontAwesome icons, and flexible styling options.

## Description

Iconic Button is a lightweight WordPress plugin that adds a custom button block to the Gutenberg editor. It allows users to create visually appealing buttons with advanced color controls, icon support, and responsive design. Perfect for developers and site owners who want to enhance their WordPress sites with professional, user-friendly buttons.

### Features

-   **Customizable Colors**: Use the advanced color control panel to set background, text, and hover colors.
-   **FontAwesome Integration**: Add icons from FontAwesome to make your buttons pop.
-   **Responsive Design**: Buttons adapt seamlessly to all screen sizes.
-   **WPCS-Compliant**: Built with WordPress Coding Standards for reliability and compatibility.
-   **Developer-Friendly**: Modular JavaScript with React, ESLint, Prettier, and Husky for clean code.

## Installation

1. Clone or download this repository to your local machine.
2. Navigate to the plugin folder: `wp-content/plugins/iconic-button`.
3. Run `npm install` to install dependencies.
4. Run `npm run build` to compile the block (outputs to `build/`).
5. Upload the `iconic-button` folder to your WordPress site's `wp-content/plugins/` directory.
6. Activate the plugin via the WordPress admin dashboard.
7. Add the Iconic Button block in the Gutenberg editor and customize away!

## Development

### Prerequisites

-   Node.js and npm
-   WordPress 6.6+
-   Gutenberg editor

### Setup

1. Clone the repo: `git clone https://github.com/your-username/iconic-button.git`.
2. Install dependencies: `npm install`.
3. Run development server: `npm start`.
4. Build for production: `npm run build`.

### Linting and Formatting

-   **ESLint**: `npx wp-scripts lint-js src/**/*.{js,jsx}` for WPCS-compliant JavaScript.
-   **Prettier**: `npx wp-scripts format src/**/*.{js,jsx}` for consistent formatting.
-   **Husky**: Pre-commit hooks ensure code quality with `lint-staged`.

## License

GPLv2 or later. See `LICENSE` for details.

## Contributing

Contributions are welcome! Please open an issue or pull request on GitHub.

## Support

For questions or issues, open a GitHub issue or contact the developer at @example.com.
