<?php
/**
 * Plugin Name: Callout Block
 * Description: Creates a Gutenberg Block to add a callout component to the page.
 * Author: zgordon, fabiankaegy
 * Author URI: https://javascriptforwp.com
 * Text Domain: wtp
 * Version: 1.0.0
 */

add_action('init', 'wtp_register_block_assets');

function wtp_register_block_assets() {

	$block_path = '/callout-block.js';
	wp_register_script(
		'wtp-callout-block',
		plugins_url( $block_path , __FILE__ ),
		[ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor' ],
		filemtime( plugin_dir_path( $block_path , __FILE__ ) )
	);

    register_block_type( 'wtp/callout-block', array(
		'editor_script' => 'wtp-callout-block',
		'render_callback' => 'wtp_render_callback',
	) );
    



}


function wtp_render_callback( $attributes ){
	$bg_color = $attributes['backgroundColor'] ?? false;
	$text_color = $attributes['textColor'] ?? false;
    $title = $attributes['title'] ?? false;
    $mediaID = $attributes['mediaID'] ?? false;
    $imageSrc = wp_get_attachment_image_src($mediaID)[0] ?? false;


    $image = '<img src="'.$imageSrc.'">';

    return '
    	<div style="color: '.$text_color.';background-color: '.$bg_color.'">
    		'.$title.'
            '.$image.'
		</div>
	';
}