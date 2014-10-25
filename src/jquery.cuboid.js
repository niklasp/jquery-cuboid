// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variable rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "cuboid",
				defaults = {
					//the number of sides of the object (2 to n) or 'auto', cube = 6
					sides: "auto",
					dimension: 200,
					width: 240,
					height: 300,
					//defines the spacing (in px) between sides when there are 2 sides only,
					//otherwise 3 sides span the dimensions of the cube
					depth: 20,
					//the class of the cube sides also offers different style options
					sideclass: "carawall",
					//TODO
					perspective: 0,
					//the rotation of the cuboid in the beginning
					rotateX: -15,
					rotateY: -45,
					//TODO
					side_hierarchy: "left,right,front,back,top,bottom"
				};

		// The actual plugin constructor
		function Plugin ( element, options ) {
				this.element = element;
				// jQuery has an extend method which merges the contents of two or
				// more objects, storing the result in the first object. The first object
				// is generally empty as we don't want to alter the default options for
				// future instances of the plugin
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend(Plugin.prototype, {
				init: function () {
						// Place initialization logic here
						// You already have access to the DOM element and
						// the options via the instance, e.g. this.element
						// and this.settings
						// you can add more functions like the one below and
						// call them like so: this.yourOtherFunction(this.element, this.settings).

						var $wrapper = $(this.element),
						sideclass = this.settings.sideclass,
						$images = $wrapper.children("li"),

						side_hierarchy = this.settings.side_hierarchy;

						$wrapper.addClass("content3d");
						var $ul = "<ul class='cube'></ul>";
						$wrapper.append($ul);
						$images.each(function(idx) {
							var side = $(this);
							$('.cube').append($(side));
							$(this).wrap('<li class="' + sideclass + '"></li>');
						});

						this.side_amount = $wrapper.find('.' + sideclass).length;

						//if there is less than 6 sides, we unfortunately need to add some more
						//with the default .fill background color
						var hierarchy_parts = side_hierarchy.split(',');

						for (var i = this.side_amount; i < 6; i++) {
							$('.cube').append('<li class="' + hierarchy_parts[i] + ' ' + sideclass + ' fill"></li>');
						}

						this.cubeControls();
						this.cubeCss();

				},
				cubeControls: function () {
					var content3d = $('.content3d');
					var cube = $('.cube'),
					offset = $(this.element).offset(),
					offsetleft = (offset.left + this.settings['width'] / 2.0),
					offsettop = (offset.top + this.settings['height'] / 2.0),
					enterX = 0,
					enterY = 0,
					settings = this.settings,
					_width = settings['width'];


					content3d.on({
						mouseenter: function(e) {
							enterX = e.pageX - offset.left;
							enterY = e.pageY - offset.top;
						},						
						mousemove: function(e) {
							//rotation on mousemove
							var rotX = (enterY + (offset.top - e.pageY) )/ 4 + settings['rotateX'],
								rotY = Math.floor(((e.pageX - offset.left) - enterX) / _width * 120) + settings['rotateY'];
							
							cube.css('transform','rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)');
							cube.css('-webkit-transform','rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)');
							cube.addClass('notanimated').removeClass('animated');
						},
						mouseout: function() {
							cube.css('transform','rotateX(' + settings['rotateX'] + 'deg) rotateY(' + settings['rotateY'] + 'deg)');
							cube.css('-webkit-transform','rotateX(' + settings['rotateX'] + 'deg) rotateY(' + settings['rotateY'] + 'deg)');
							cube.addClass('animated').removeClass('notanimated');
						}
					});

				},

				cubeCss: function() {
					var sideclass = this.settings['sideclass'];
			
					$('.cube').css({'transform': 'rotateX(' + this.settings['rotateX'] + 'deg) rotateY(' + this.settings['rotateY'] + 'deg)'});
					
					//make sure we get the correct image dimensions
					var imgLoad = imagesLoaded( '.content3d' );
					imgLoad.on( 'done', function( instance ) {
						var img1 = new Image(), img2 = new Image(), img3 = new Image();
						img1.src = $('.' + sideclass + ':nth-child(4) > li > img').attr('src');
						img2.src = $('.' + sideclass + ':nth-child(5) > li > img').attr('src');
						_width = img1.width;
						_height = img1.height;
						_depth = img2.height;
						
						$('#cuboid').css({
							"width"			: _width + 'px',
							"height"		: _height + 'px',
						});

						var left = $('.' + sideclass + ':nth-child(1)'),
							right = $('.' + sideclass + ':nth-child(2)'),
							bottom = $('.' + sideclass + ':nth-child(3)'),
							front = $('.' + sideclass + ':nth-child(4)'),
							top = $('.' + sideclass + ':nth-child(5)'),
							back = $('.' + sideclass + ':nth-child(6)');
							$('.' + sideclass).css('transform-origin', '0 0');
						
							front.css('transform','translateZ(' + _depth/2.0 + 'px)');
							back.css('transform', 'rotateY(180deg) translateZ(' + _depth/2.0 + 'px) translateX(-' + _width + 'px)');
							left.css({'width': _depth, 'transform':'rotateY(-90deg) translateX(-' + _depth/2 + 'px)'});
							right.css({'width': _depth, 'transform':'rotateY(90deg) translateX(-' + _depth/2 + 'px) translateZ(' + _width + 'px)' });
							top.css({'height': _depth, 'transform':'rotateX(90deg) translateY(-' + _depth/2 + 'px)'});
							bottom.css({'height': _depth, 'transform':'rotateX(-90deg) translateY(-' + _depth/2 + 'px) translateZ(' + _height + 'px)'});
					});
				}
		});

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
				this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						}
				});

				// chain jQuery functions
				return this;
		};

})( jQuery, window, document );
