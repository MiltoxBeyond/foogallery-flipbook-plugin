/*

Add any javascript that is specific to your Flipbook extension

 */

var TurnManager = {
	Ready: function(){
		var list = $('.flipbook').parents('ul');
		console.log(list);
	}
}

$(document).ready(function(){
	yepnope({
		test: Modernizr.csstransforms,
		yep: ['../../lib/turn.min.js', 'css/jquery.ui.css'],
		nope: ['../../lib/turn.html4.min.js', 'css/jquery.ui.html4.css'],
		both: ['css/docs.css', 'js/docs.js'],
		complete: function() { TurnManager.Ready(); }
	});
});