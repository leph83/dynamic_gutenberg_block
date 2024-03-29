<?php
/**
 * Plugin Name: WTP Blocks
 * Description: Creates a custom made Gutenberg Block with different styles
 * Author: Phuc Le
 * Author URI: https://whatthephuc.com
 * Text Domain: wtp
 * Version: 1.0.0
 */

add_action('init', 'wtp_register_block_assets');

function wtp_register_block_assets() {

	$block_path = '/block.js';
	wp_register_script(
		'wtp-default-block',
		plugins_url( $block_path , __FILE__ ),
		[ 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor' ],
		filemtime( plugin_dir_path( $block_path , __FILE__ ) )
	);

    register_block_type( 'wtp/default-block', array(
		'editor_script' => 'wtp-default-block',
		'render_callback' => 'wtp_render_callback',
	) );
}

function wtp_render_callback( $attributes, $innerblocks ){
    $style = $attributes['styles'] ?? false;

	$bg_color = $attributes['backgroundColor'] ?? false;
	$text_color = $attributes['textColor'] ?? false;
    $title = $attributes['title'] ?? false;
    $subtitle = $attributes['subtitle'] ?? false;
    $imgID = $attributes['imgID'] ?? false;
    $imageSrc = wp_get_attachment_image_src($imgID)[0] ?? false;
    $style = $attributes['style'] ?? false;
    $style = 'hero';

    $image = '<img src="'.$imageSrc.'">';


    $data_images = false;
    $id = false;
    $images = false;
    $heading = false;
    $description = false;
    $links = false;

    $args['title'] = $title;
    $args['subtitle'] = $subtitle;

    return $title . $innerblocks;
}