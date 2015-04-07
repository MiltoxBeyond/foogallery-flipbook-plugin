<?php
/**
 * FooGallery Flipbook Extension
 *
 * Flipbook effect for foogallery
 *
 * @package   Flipbook_Lightbox_FooGallery_Extension
 * @author     Milton Zurita
 * @license   GPL-2.0+
 * @link      http://www.miltonzurita.com
 * @copyright 2014  Milton Zurita
 *
 * @wordpress-plugin
 * Plugin Name: FooGallery - Flipbook
 * Description: Flipbook effect for foogallery
 * Version:     1.0.0
 * Author:       Milton Zurita
 * Author URI:  http://www.miltonzurita.com
 * License:     GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 */

if ( !class_exists( 'Flipbook_Lightbox_FooGallery_Extension' ) ) {

	define('FLIPBOOK_LIGHTBOX_FOOGALLERY_EXTENSION_URL', plugin_dir_url( __FILE__ ));
	define('FLIPBOOK_LIGHTBOX_FOOGALLERY_EXTENSION_VERSION', '1.0.0');

	require_once( 'foogallery-flipbook-init.php' );

	class Flipbook_Lightbox_FooGallery_Extension {

		/**
		 * Wire up everything we need to run the extension
		 */
		function __construct() {
			add_filter( 'foogallery_gallery_template_field_lightboxes', array($this, 'add_lightbox') );
			add_action( 'foogallery_template_lightbox-flipbook', array($this, 'add_required_files') );
			add_filter( 'foogallery_attachment_html_link_attributes', array($this, 'add_html_attributes') );
		}

		/**
		 * Add our lightbox to the lightbox dropdown on the gallery edit page
		 */
		function add_lightbox($lightboxes) {
			$lightboxes['flipbook'] = __( 'Flipbook', 'foogallery-flipbook' );
			return $lightboxes;
		}

		/**
		 * Add any JS or CSS required by the extension
		 */
		function add_required_files() {
			//enqueue the lightbox script
			wp_enqueue_script( 'flipbook', FLIPBOOK_LIGHTBOX_FOOGALLERY_EXTENSION_URL . 'js/lightbox-flipbook.js', array('jquery'), FLIPBOOK_LIGHTBOX_FOOGALLERY_EXTENSION_VERSION );
			//optionl : enqueu the init code to hook up your lightbox
			//wp_enqueue_script( 'flipbook_init', FLIPBOOK_LIGHTBOX_FOOGALLERY_EXTENSION_URL . 'js/lightbox-flipbook-init.js', array('flipbook'), FLIPBOOK_LIGHTBOX_FOOGALLERY_EXTENSION_VERSION );
			//enqueue the lightbox stylesheets
			wp_enqueue_style( 'flipbook', FLIPBOOK_LIGHTBOX_FOOGALLERY_EXTENSION_URL . 'css/lightbox-flipbook.css', array(), FLIPBOOK_LIGHTBOX_FOOGALLERY_EXTENSION_VERSION );
		}

		/**
		 * Optional. Alter the anchor attributes so that the lightbox extension can work
		 */
		function add_html_attributes($attr) {
			global $current_foogallery;

			$lightbox = foogallery_gallery_template_setting( 'lightbox' );

			//if the gallery is using our lightbox, then alter the HTML so the lightbox script can find it
			if ( 'flipbook' == $lightbox ) {
				//add custom attributes to the anchor
				//$attr['rel'] = "flipbook[foogallery-{$current_foogallery->ID}]";
			}

			return $attr;
		}
	}
}