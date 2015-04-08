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

define('FLIPBOOK_LIGHTBOX_FOOGALLERY_EXTENSION_URL', plugin_dir_url( __FILE__ ));
define('FLIPBOOK_LIGHTBOX_FOOGALLERY_EXTENSION_VERSION', '1.0.0');

require_once( 'foogallery-flipbook-init.php' );
require_once( __DIR__.'/classes/FlipbookExtension.php' );
	