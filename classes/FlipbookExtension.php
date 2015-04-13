<?php
class Flipbook_Lightbox_FooGallery_Extension {
		/**
		 * Wire up everything we need to run the extension
		 */
		private $includedFiles = false;

		function __construct() {
			add_filter( 'foogallery_gallery_template_field_lightboxes', array($this, 'add_lightbox') );
			add_action( 'foogallery_template_lightbox-flipbook', array($this, 'add_required_files') );
			add_filter( 'foogallery_attachment_html_link_attributes', array($this, 'add_html_attributes') );
			add_filter( 'foogallery_album_stack_link_class_name', array($this, 'album_stack_link_class_name'));

		}

		function album_stack_link_class_name($name) {
			return $name;
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
			wp_enqueue_script( 'flipbook-extras', FLIPBOOK_LIGHTBOX_FOOGALLERY_EXTENSION_URL . 'extras/modernizr.2.5.3.min.js', array(), FLIPBOOK_LIGHTBOX_FOOGALLERY_EXTENSION_VERSION );
			wp_enqueue_script( 'flipbook', FLIPBOOK_LIGHTBOX_FOOGALLERY_EXTENSION_URL . 'lib/lightbox-flipbook.js', array(), FLIPBOOK_LIGHTBOX_FOOGALLERY_EXTENSION_VERSION );
			//optionl : enqueu the init code to hook up your lightbox
			//wp_enqueue_script( 'flipbook_init', FLIPBOOK_LIGHTBOX_FOOGALLERY_EXTENSION_URL . 'js/lightbox-flipbook-init.js', array('flipbook'), FLIPBOOK_LIGHTBOX_FOOGALLERY_EXTENSION_VERSION );
			//enqueue the lightbox stylesheets
			wp_enqueue_style( 'flipbook', FLIPBOOK_LIGHTBOX_FOOGALLERY_EXTENSION_URL . 'css/lightbox-flipbook.css', array(), FLIPBOOK_LIGHTBOX_FOOGALLERY_EXTENSION_VERSION );
		}

		/**
		 * Optional. Alter the anchor attributes so that the lightbox extension can work
		 */
		function add_html_attributes($attr) {
			if(!$this->includedFiles) {
				$this->includedFiles = true;
				$this->add_required_files();
			}
			return $attr;
		}
}
