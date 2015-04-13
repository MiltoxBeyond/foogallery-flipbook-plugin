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
		Flipbook.wrapper = $('<div class="flipbook-wrapper"><div class="flipbook-overlay"></div></div>');
		Flipbook.anim = TweenMax.from(Flipbook.wrapper, 1, {opacity:0,paused:true});
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
		Flipbook.wrapper.on('click','.flipbook-overlay',function(){
			Flipbook.close();
		});
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
	ratio: 1.38,
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
		var items = this.item.find('a');
		items.each(function(i,el){
			self.buildItem(el);
		});

		var size = this.resize();
		this.turn = $(this.el).turn({
                gradients: true,
                acceleration: true,
                autoCenter: false,
                width:Math.round(size.width),
                height:size.height
            });
	},
	resize: function(){
		// reset the width and height to the css defaults
            this.el.css({
            	width:'',
            	height:''
            });

             var width = $('body').width(),
                height = Math.round(width / this.ratio),
                padded = Math.round($(window).height() * 0.9);

            // if the height is too big for the window, constrain it
            if (height > padded) {
                height = padded;
                width = Math.round(height * this.ratio);
            }

            // set the width and height matching the aspect ratio
            this.el.css({
            	width:width,
            	height:height
            });

            return {
                width: width,
                height: height
            };
	},
	buildItem: function(el) {
		el = $(el);
		var wrap = $('<div class="page-inner"></div>');
		var img = el.attr('href');
		var data = el.data();
		var page = $('<div class="page"></div>');
		var image = $('<img></img>');
		image.load(function(){ $(this).addClass('ready'); });
		wrap.append(image);
		var text = $('<div class="page-text"></div>');
		for(var x in data) {
			if(x == 'attachmentId') continue;
			text.append($('<div class="text-'+x+'">'+data[x]+'</div>'));
		}
		wrap.append(text);
		page.append(wrap);
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
			Flipbook.hidden();
		},[this.el])
		.eventCallback('onComplete',function(){
			Flipbook.childShown();
		});
	},
	show: function(item) {
		this.anim.play();
	},
	hide: function() {
		this.anim.reverse();
	}
}

var TurnManager = {
	parentSelector: '.foogallery-container:has(.flipbook), .foogallery-lightbox-flipbook',
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

		var childselector = 
			this.raw.hasClass('foogallery-lightbox-flipbook') ? 
				'> a' :
				'a.flipbook';		
		this.raw.on('click',childselector, function(event){
			event.preventDefault();
			event.stopPropagation();
			var target = $(this);
			var parent = target.parents(TurnManager.parentSelector);
			target.trigger('flipbook:trigger',[target, parent]);
		});
		this.raw.on('flipbook:trigger', function(event, target, parent) {
			var fbook = parent.data('flipbook');
			if(fbook) 
				Flipbook.open(fbook);
		});
	},
	Build: function(item) {
		this.list.push(new Flipbook(item));
	}
}