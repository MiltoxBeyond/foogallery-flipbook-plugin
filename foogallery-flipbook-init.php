<?php
//This init class is used to add the extension to the extensions list while you are developing them.
//When the extension is added to the supported list of extensions, this file is no longer needed.

if ( !class_exists( 'Flipbook_Lightbox_FooGallery_Extension_Init' ) ) {
	class Flipbook_Lightbox_FooGallery_Extension_Init {

		function __construct() {
			add_filter( 'foogallery_available_extensions', array( $this, 'add_to_extensions_list' ) );
		}

		function add_to_extensions_list( $extensions ) {
			$extensions[] = array(
				'slug'=> 'flipbook',
				'class'=> 'Flipbook_Lightbox_FooGallery_Extension',
				'title'=> __('Flipbook', 'foogallery-flipbook'),
				'file'=> 'foogallery-flipbook-extension.php',
				'description'=> __('Flipbook effect for foogallery', 'foogallery-flipbook'),
				'author'=> ' Milton Zurita',
				'author_url'=> 'http://www.miltonzurita.com',
				'thumbnail'=> FLIPBOOK_LIGHTBOX_FOOGALLERY_EXTENSION_URL . '/img/extension_bg.png',
				'tags'=> array( __('lightbox', 'foogallery') ),	//use foogallery translations
				'categories'=> array( __('Build Your Own', 'foogallery') ), //use foogallery translations
				'source'=> 'generated'
			);

			return $extensions;
		}
	}

	new Flipbook_Lightbox_FooGallery_Extension_Init();
}