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
		var pluginName = "gallery3dobject",
				defaults = {
				//the number of sides of the object (2 to n), cube = 6
				sides: "auto",
				dimension: 200,
				width: 240,
				height: 300,
				//defines the spacing (in px) between sides when there are 2 sides only,
				//otherwise 3 sides span the dimensions of the cube
				depth: 20,
				sideclass: "carawall"
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

						var $wrapper = $(this.element);
						var sideclass = this.settings['sideclass'];
						var $images = $wrapper.children("img");

						$wrapper.addClass('content3d');
						$wrapper.append('<ul class="cube"></ul>');
						$images.each(function() {
							var side = $(this);
							$('.cube').append($(side));
						});
						$images.wrap('<li class="' + sideclass + '"></li>');

						var amount = $('.' + sideclass).length;
						console.log(amount);

						//if there is less than 6 sides, we unfortunately need to add some more
						//with the default .fill background color
						for (var i = amount; i < 6; i++) {
							console.log("ay");
							$('.cube').append('<li class="' + sideclass + ' fill"></li>');
						}

						this.cubeControls();
						this.cubeCss();

				},
				cubeControls: function () {
					var cube = $('.cube'),
					offset = $(this.element).offset(),
					offsetleft = (offset.left + this.settings['width'] / 2.0),
					offsettop = (offset.top + this.settings['height'] / 2.0);

					cube.on({
						mousemove: function(e) {
							$(this).css('transform','rotateX(' + (e.pageY - offsettop) + 'deg) rotateY(' + (e.pageX - offsetleft) + 'deg)');
							$(this).css('-webkit-transform','rotateX(' + (e.pageY - offsettop) + 'deg) rotateY(' + (e.pageX - offsetleft) + 'deg)');
							$(this).addClass('noanimar').removeClass('animar');
						},
						mouseout: function() {
							$(this).css('transform','rotateX(0deg) rotateY(0deg)');
							$(this).css('-webkit-transform','rotateX(0deg) rotateY(0deg)');
							$(this).addClass('animar').removeClass('noanimar');
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

					$('.' + sideclass + ':nth-child(1)')
					.css('transform','rotateY(90deg) translateX(-' + _width/2 + 'px) translateZ(' + _depth/2 + 'px)')
					.css('-webkit-transform','rotateY(90deg) translateX(-' + _width/2 + 'px) translateZ(' + _depth/2 + 'px)');
					$('.' + sideclass + ':nth-child(2)')
					.css('transform','rotateY(-90deg) translateX(' + _width/2 + 'px) translateZ(' + _depth/2 + 'px)');
					$('.' + sideclass + ':nth-child(3)')
					.css('transform','rotate(0deg) translateX(' + (_width/2 - _depth/2) + 'px) translateZ(' + _width + 'px)');
					$('.' + sideclass + ':nth-child(4)')
					.css('transform','rotateZ(180deg) translateX(-' + (_width/2 - _depth/2) + 'px)');
					$('.' + sideclass + ':nth-child(5)')
					.css('transform','translateX(' + (_width/2 - _depth/2) + 'px) translateY(' + (_height-_width/2) + 'px) translateZ(' + _width/2 + 'px) rotateX(90deg) ');
					$('.' + sideclass + ':nth-child(6)')
					.css('transform','translateX(' + (_width/2 - _depth/2) + 'px) translateY(-' + _width/2 + 'px) translateZ(' + _width/2 + 'px) rotateX(-90deg)');															

					//0   -- -120
					//100 -- -20
					//200 -- 80
					//300 -- 180
					//400 -- 280
					//450 -- 330
					//500 -- 380
					//600 -- 480
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
