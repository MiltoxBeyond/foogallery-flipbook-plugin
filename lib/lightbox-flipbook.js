$(document).ready(function(){
	var lightbox = $('.foogallery-container:has(.flipbook), .foogallery-lightbox-flipbook');
	if(lightbox.length) {
		var fbDir = $('link#flipbook-css').attr('href');
		fbDir = fbDir.split('/css/').shift();
		fbDir += '/';


		yepnope({
			test: Modernizr.csstransforms,
			yep: [fbDir+'lib/turn.min.js', fbDir+'css/jquery.ui.css', fbDir+'lib/turnmanager.js'],
			nope: [fbDir+'lib/turn.html4.min.js', fbDir+'css/jquery.ui.html4.css'],
			complete: function() { if(typeof(TurnManager) != "undefined") TurnManager.Ready(lightbox); }
		});	
	}
	
});