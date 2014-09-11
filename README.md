#jQuery cuboid (beta)

This project is for displaying images on awesome 3d cuboids that can easily be turned by mouse movements. See the demo for action and what can be done. jQuery cuboid uses css3 for displaying and some jQuery for rotating the objects.

##beta-version
just a simple cuboid with 2 sides is working by now as needed for a project, soon it will be expanded (hopefully).

jQuery-cuboid is built on [jQuery Boilerplate](https://github.com/jquery-boilerplate/jquery-boilerplate) [![Build Status](https://secure.travis-ci.org/jquery-boilerplate/jquery-boilerplate.svg?branch=master)](https://travis-ci.org/jquery-boilerplate/jquery-boilerplate)

### A jump-start for jQuery plugins development

So, you've tried your hand at writing jQuery plugins and you're comfortable putting together something that probably works. Awesome! Thing is, you think there might be better ways you could be writing them - you've seen them done a number of different ways in the wild, but aren't really sure what the differences between these patterns are or how to get started with them.

This project won't seek to provide a perfect solution to every possible pattern, but will attempt to cover a simple template for beginners and above. By using a basic defaults object, simple constructor for assigning the element to work with and extending options with defaults and a lightweight wrapper around the constructor to avoid issues with multiple instantiations.

## Usage

1. Include jQuery:

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	```

2. Include plugin's code:

	```html
	<script src="dist/jquery.cuboid.min.js"></script>
	```

3. Call the plugin:

	```javascript
	$("#element").cuboid({
		//configuration options
	});
	```

## Structure

The basic structure of the project is given in the following way:

```
├── demo/
│   └── index.html
├── dist/
│   ├── jquery.cuboid.js
│   └── jquery.cuboid.min.js
├── src/
│   └── jquery.cuboid.js
├── .editorconfig
├── .gitignore
├── .jshintrc
├── .travis.yml
├── Gruntfile.js
└── package.json
```

#### [demo/](https://github.com/niklasp/jquery-cuboid/tree/master/demo)

Contains a simple HTML file to demonstrate your plugin.

#### [dist/](https://github.com/niklasp/jquery-cuboid/tree/master/dist)

This is where the generated files are stored once Grunt runs.

#### [src/](https://github.com/niklasp/jquery-cuboid/tree/master/src)

Contains the files responsible for your plugin, you can choose between JavaScript or CoffeeScript.

#### [.editorconfig](https://github.com/niklasp/jquery-cuboid/tree/master/.editorconfig)

This file is for unifying the coding style for different editors and IDEs.

> Check [editorconfig.org](http://editorconfig.org) if you haven't heard about this project yet.

#### [.gitignore](https://github.com/niklasp/jquery-cuboid/tree/master/.gitignore)

List of files that we don't want Git to track.

> Check this [Git Ignoring Files Guide](https://help.github.com/articles/ignoring-files) for more details.

#### [.jshintrc](https://github.com/niklasp/jquery-cuboid/tree/master/.jshintrc)

List of rules used by JSHint to detect errors and potential problems in JavaScript.

> Check [jshint.com](http://jshint.com/about/) if you haven't heard about this project yet.

#### [.travis.yml](https://github.com/niklasp/jquery-cuboid/tree/master/.travis.yml)

Definitions for continous integration using Travis.

> Check [travis-ci.org](http://about.travis-ci.org/) if you haven't heard about this project yet.

#### [boilerplate.jquery.json](https://github.com/jquery-boilerplate/boilerplate/tree/master/boilerplate.jquery.json)

Package manifest file used to publish plugins in jQuery Plugin Registry.

> Check this [Package Manifest Guide](http://plugins.jquery.com/docs/package-manifest/) for more details.

#### [Gruntfile.js](https://github.com/niklasp/jquery-cuboid/tree/master/Gruntfile.js)

Contains all automated tasks using Grunt.

> Check [gruntjs.com](http://gruntjs.com) if you haven't heard about this project yet.

#### [package.json](https://github.com/niklasp/jquery-cuboid/tree/master/package.json)

Specify all dependencies loaded via Node.JS.

> Check [NPM](https://npmjs.org/doc/json.html) for more details.


## License

MIT License
