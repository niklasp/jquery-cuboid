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
				//defines the spacing (in px) between sides when there are 2 sides only,
				//otherwise 3 sides span the dimensions of the cube
				depth: 20,
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
						console.log("xD");

						var $wrapper = $(this.element);
						var $images = $wrapper.children("img");

						$wrapper.addClass('content3d');
						$wrapper.append('<ul class="cube"></ul>');
						$images.each(function() {
							var side = $(this);
							$('.cube').append($(side));
						});
						$images.wrap('<li class="cara2"></li>');

						var amount = $('.cara2').length;

						for (var i = amount; i < 6; i++) {
							console.log("ay");
							$('.cube').append('<li class="cara2 fill"></li>');
						}

						this.cubeControls();
						this.cubeCss();

				},
				cubeControls: function () {
					var cube = $('.cube'),
					offset = $(this.element).offset(),
					offsetleft = (offset.left + this.settings['dimension'] / 2.0),
					offsettop = (offset.top + this.settings['dimension'] / 2.0);

					cube.on({
						mousemove: function(e) {
							$(this).css('transform','rotateX(' + (e.pageY - offsettop) + 'deg) rotateY(' + (e.pageX - offsetleft) + 'deg)');
							$(this).addClass('noanimar').removeClass('animar');
						},
						mouseout: function() {
							$(this).css('transform','rotateX(0deg) rotateY(0deg)');
							$(this).addClass('animar').removeClass('noanimar');
						}
					});

				}

				cubeCss: function() {

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
