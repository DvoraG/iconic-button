<?php
// This file is generated. Do not modify it manually.
return array(
	'icon-button' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'dgdev/icon-button',
		'version' => '1.0.0',
		'title' => 'Icon Button',
		'category' => 'design',
		'description' => 'A customizable button block with icons and text for WordPress, perfect for adding styled call-to-action buttons.',
		'keywords' => array(
			'button',
			'icon',
			'font awesome',
			'svg'
		),
		'example' => array(
			
		),
		'parent' => array(
			'dgdev/icon-buttons'
		),
		'attributes' => array(
			'buttonText' => array(
				'type' => 'string',
				'default' => 'Add'
			),
			'showText' => array(
				'type' => 'boolean',
				'default' => false
			),
			'url' => array(
				'type' => 'string',
				'default' => '#'
			),
			'rel' => array(
				'type' => 'string'
			),
			'target' => array(
				'type' => 'string'
			),
			'isExternalLink' => array(
				'type' => 'boolean',
				'default' => false
			),
			'iconLabel' => array(
				'type' => 'string',
				'default' => ''
			),
			'iconType' => array(
				'type' => 'string',
				'default' => 'font-awesome'
			),
			'fontAwesomeIcon' => array(
				'type' => 'string',
				'default' => 'fas fa-add'
			),
			'iconPosition' => array(
				'type' => 'string',
				'default' => 'before'
			),
			'iconAnimation' => array(
				'type' => 'string',
				'default' => ''
			),
			'iconSize' => array(
				'type' => 'string',
				'default' => 'medium'
			),
			'borderRadius' => array(
				'type' => 'number',
				'default' => 0
			),
			'backgroundColor' => array(
				'type' => 'string',
				'default' => ''
			),
			'textColor' => array(
				'type' => 'string',
				'default' => ''
			),
			'gradient' => array(
				'type' => 'string',
				'default' => ''
			),
			'styleVariant' => array(
				'type' => 'string',
				'default' => 'fill'
			),
			'hasDefaultColors' => array(
				'type' => 'boolean',
				'default' => true
			),
			'themeContext' => array(
				'type' => 'string',
				'default' => 'light'
			),
			'tooltip' => array(
				'type' => 'string',
				'default' => 'Add'
			),
			'ariaLabel' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'selectors' => array(
			'root' => '.wp-block-dgdev-icon-button'
		),
		'supports' => array(
			'html' => false,
			'customClassName' => true,
			'classnames' => false,
			'align' => false,
			'alignWide' => false,
			'anchor' => true,
			'reusable' => false
		),
		'styles' => array(
			array(
				'name' => 'fill',
				'label' => 'Fill',
				'isDefault' => true
			),
			array(
				'name' => 'outline',
				'label' => 'Outline'
			)
		),
		'textdomain' => 'iconic-button',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'script' => 'file:./script.js'
	),
	'icon-buttons' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'dgdev/icon-buttons',
		'title' => 'Icon Buttons',
		'category' => 'design',
		'description' => 'A customizable button block with icons and text for WordPress, perfect for adding styled call-to-action buttons.',
		'keywords' => array(
			'button',
			'icon'
		),
		'allowedBlocks' => array(
			'dgdev/icon-button'
		),
		'version' => '1.0.0',
		'textdomain' => 'iconic-button',
		'attributes' => array(
			
		),
		'selectors' => array(
			'root' => '.wp-block-dgdev-icon-buttons'
		),
		'supports' => array(
			'html' => false,
			'align' => array(
				'wide',
				'full'
			),
			'layout' => array(
				'allowSwitching' => false,
				'allowInheriting' => false,
				'default' => array(
					'type' => 'flex'
				)
			)
		),
		'example' => array(
			
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	)
);
