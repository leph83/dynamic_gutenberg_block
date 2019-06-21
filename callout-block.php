<?php
/**
 * Plugin Name: Callout Block
 * Description: Creates a Gutenberg Block to add a callout component to the page.
 * Author: zgordon, fabiankaegy
 * Author URI: https://javascriptforwp.com
 * Text Domain: jsforwp
 * Version: 1.0.0
 */

add_action('init', 'jsforwp_register_block_assets');

function jsforwp_register_block_assets() {

	$block_path = '/callout-block.js';
	wp_register_script(
		'jsforwp-callout-block',
		plugins_url( $block_path , __FILE__ ),
		[ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor' ],
		filemtime( plugin_dir_path( $block_path , __FILE__ ) )
	);

    register_block_type( 'jsforwp/callout-block', array(
		'editor_script' => 'jsforwp-callout-block',
		'render_callback' => 'hi_roy_render_callback',
	) );
    



}


function hi_roy_render_callback( $attributes ){
		$bg_color = $attributes['backgroundColor'] ?? false;
		$text_color = $attributes['textColor'] ?? false;
        return '
        	<div style="color: '.$text_color.';background-color: '.$bg_color.'">
        		test
    		</div>
    	';
    }