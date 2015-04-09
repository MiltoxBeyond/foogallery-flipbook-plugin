/*

Add any javascript that is specific to your Flipbook extension

 */

var TurnManager = {
	Ready: function(){
		var list = $('.flipbook').parents('.foogallery-container');
		console.log(list);
	}
}

$(document).ready(function(){
	var fbDir = $('link#flipbook-css').attr('href');
	fbDir = fbDir.split('/css/').shift();
	fbDir += '/';
	yepnope({
		test: Modernizr.csstransforms,
		yep: [fbDir+'lib/turn.min.js', fbDir+'css/jquery.ui.css'],
		nope: [fbDir+'lib/turn.html4.min.js', fbDir+'css/jquery.ui.html4.css'],
		complete: function() { TurnManager.Ready(); }
	});
});