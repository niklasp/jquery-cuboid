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
				//the number of sides of the object (2 to n), cube = 6
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
						sideclass = this.settings['sideclass'],
						$images = $wrapper.children("img"),

						side_hierarchy = this.settings['side_hierarchy'];

						$wrapper.addClass('content3d');
						$wrapper.append('<ul class="cube"></ul>');
						$images.each(function(idx) {
							console.log( idx + ": " + $( this ) );
							var side = $(this);
							$('.cube').append($(side));
							$(this).wrap('<li class="' + sideclass + '"></li>');
						});
						//$images.wrap('<li class="' + sideclass + '"></li>');

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
					_width = this.settings['width'];

					content3d.on({
						mouseenter: function(e) {
							enterX = e.pageX - offset.left;
							enterY = e.pageY - offset.top;
						},						
						mousemove: function(e) {
							//rotation on mousemove
							var rotX = (enterY + (offset.top - e.pageY) )/ 4,
								rotY = Math.floor(((e.pageX - offset.left) - enterX) / _width * 120);
							
							cube.css('transform','rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)');
							cube.css('-webkit-transform','rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)');
							cube.addClass('noanimar').removeClass('animar');
						},
						mouseout: function() {
							cube.css('transform','rotateX(0deg) rotateY(0deg)');
							cube.css('-webkit-transform','rotateX(0deg) rotateY(0deg)');
							cube.addClass('animar').removeClass('noanimar');
						}
					});

				},

				cubeCss: function() {
					var sideclass = this.settings['sideclass'];
					var _width  = this.settings['width'],
						_height = this.settings['height'],
						_depth  = this.settings['depth'];

					$('.content3d').css({
						"width"			: _width + 'px',
						"height"		: _height + 'px',
						"margin-left"	: -(_width / 2) + 'px',
						"margin-top"	: -(_height/ 2) + 'px',
					});
					
					//todo >= 3
					if (this.side_amount < 3) {
						$('.' + 
							sideclass + ':nth-child(3), .' + 
							sideclass + ':nth-child(4), .' + 
							sideclass + ':nth-child(5), .' + 
							sideclass + ':nth-child(6)')
						.css('width',_depth);
						$('.' + 
							sideclass + ':nth-child(5), .' + 
							sideclass + ':nth-child(6)')
						.css('height',_width);
					}

					var left = $('.' + sideclass + ':nth-child(1)'),
						right = $('.' + sideclass + ':nth-child(2)'),
						top = $('.' + sideclass + ':nth-child(3)'),
						bottom = $('.' + sideclass + ':nth-child(4)'),
						front = $('.' + sideclass + ':nth-child(5)'),
						back = $('.' + sideclass + ':nth-child(6)');
					left.css('transform','rotateY(90deg) translateX(-' + _width/2 + 'px) translateZ(' + _depth/2 + 'px)')
					right.css('transform','rotateY(-90deg) translateX(' + _width/2 + 'px) translateZ(' + _depth/2 + 'px)');
					top.css('transform','rotate(0deg) translateX(' + (_width/2 - _depth/2) + 'px) translateZ(' + _width + 'px)');
					bottom.css('transform','rotateZ(180deg) translateX(-' + (_width/2 - _depth/2) + 'px)');
					front.css('transform','translateX(' + (_width/2 - _depth/2) + 'px) translateY(' + (_height-_width/2) + 'px) translateZ(' + _width/2 + 'px) rotateX(90deg) ');
					back.css('transform','translateX(' + (_width/2 - _depth/2) + 'px) translateY(-' + _width/2 + 'px) translateZ(' + _width/2 + 'px) rotateX(-90deg)');															
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
