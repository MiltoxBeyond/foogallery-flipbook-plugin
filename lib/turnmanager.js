/*
	TurnManager
 */
function Flipbook(item) {
	this.item = $(item);
	this.initialize();
}

Flipbook.wrapper = null;
Flipbook.current = null;
Flipbook.getWrapper = function() {
	if(Flipbook.wrapper == null) {
		Flipbook.wrapper = $('<div class="flipbook-wrapper"></div>');
		FLipbook.anim = TweenMax.from(Flipbook.wrapper, 1, {opacity:0,paused:true});
		Flipbook.anim.eventCallback('onStart',function(el){
			el.css('display','block');
		}, [Flipbook.wrapper])
		.eventCallback('onReverseComplete',function(el){
			el.css('display','none');
		},[Flipbook.wrapper])
		.eventCallback('onComplete',function(){
			Flipbook.shown();
		});
		$('body').append(Flipbook.wrapper);

	}
	return Flipbook.wrapper;
}
Flipbook.append = function(flipbook) {
	Flipbook.getWrapper().append(flipbook.el);
}

Flipbook.open = function(flipbook) {
	Flipbook.current = flipbook;
	Flipbook.anim.play();
}

Flipbook.childShown = function() {}

Flipbook.shown = function() {
	Flipbook.current.show();
}

Flipbook.close = function(flipbook) {
	Flipbook.current.hide();
}

Flipbook.hidden = function() {
	Flipbook.anim.reverse();
}

Flipbook.prototype = {
	item: null,
	count: 0,
	pages: [],
	el: '<div class="flipbook-container"></div>',
	initialize: function() {
		this.build();
		this.buildEvents();
		this.buildAnimations();
		this.item.data('flipbook', this);
		Flipbook.append(this);
	},
	build: function() {
		this.el = $(this.el);
		var self = this;
		var items = this.item.find('.flipbook');
		items.each(function(i,el){
			self.buildItem(el);
		});
	},
	buildItem: function(el) {
		el = $(el);
		var img = el.attr('href');
		var data = el.data();
		var page = $('<div class="page"></div>');
		var image = $('<img></img>');
		image.load(function(){ $(this).addClass('ready'); });
		page.append(image);
		for(var x in data) {
			page.append($('<div class="'+x+'">'+data[x]+'</div>'));
		}
		image.attr('src',img);
		this.el.append(page);
		this.pages.push(page)
	},
	buildEvents: function() {

	},
	buildAnimations: function() {
		this.el.css('display','none');
		this.anim = TweenMax.from(this.el, 1.2, {opacity:0});
		this.anim.eventCallback('onStart',function(el){
			el.css('display','block');
		}, [this.el])
		.eventCallback('onReverseComplete',function(el){
			el.css('display','none');
		},[this.el])
		.eventCallback('onComplete',function(){
			Flipbook.childShown();
		});
	},
	show: function() {
		this.anim.play();
	},
	hide: function() {
		this.anim.reverse();
	}
}

var TurnManager = {
	Ready: function(list){
		this.raw = list;
		this.Prepare();
	},
	Prepare: function() {
		this.list = [];
		var len = this.raw.length;
		for(var x = 0; x < len; x++) {
			this.Build(this.raw[x]);
		}

		this.raw.on('click','a.flipbook', function(event){
			event.preventDefault();
			event.stopPropagation();
			$(this).trigger('flipbook:trigger');
		});
		this.raw.on('flipbook:trigger', function(event) {
			console.log('Triggered');
		});
	},
	Build: function(item) {
		this.list.push(new Flipbook(item));
	}
}