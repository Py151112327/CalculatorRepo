accord
======

A unified interface for compiled languages and templates in JavaScript.

[![npm](http://img.shields.io/npm/v/accord.svg?style=flat)](http://badge.fury.io/js/accord)
[![tests](http://img.shields.io/travis/jenius/accord/master.svg?style=flat)](https://travis-ci.org/jenius/accord)
[![coverage](http://img.shields.io/coveralls/jenius/accord/master.svg?style=flat)](https://coveralls.io/r/jenius/accord?branch=master)
[![dependencies](http://img.shields.io/gemnasium/jenius/accord.svg?style=flat)](https://david-dm.org/jenius/accord)

### Why should you care?

There are two other libraries that already attempt to provide a common compiler interface: [consolidate.js](https://github.com/visionmedia/consolidate.js) and [transformers](https://github.com/ForbesLindesay/transformers). After reviewing & using both of them, we designed accord to provide a more maintainable code base and way of writing adapters.

Accord adapters are different because they use standard JavaScript inheritance (aka: classes in CoffeeScript), and they avoid the issues with the mixture of sync and async compilers by using promises for everything.

### Installation

`npm install accord`

### Usage

Accord itself exposes only a JavaScript API. If you are interested in using this library from the command line, check out the [accord-cli](https://github.com/carrot/accord-cli) project.

Since some templating engines are async and others are not, accord keeps things consistent by returning a promise for any task (using [when.js](https://github.com/cujojs/when)). Here's an example in CoffeeScript:

```coffee
fs = require 'fs'
accord = require 'accord'
jade = accord.load('jade')

# render a string
jade.render('body\n  .test')
  .catch(console.error.bind(console))
  .done(console.log.bind(console))

# or a file
jade.renderFile('./example.jade')
  .catch(console.error.bind(console))
  .done(console.log.bind(console))

# or compile a string to a function
# (only some to-html compilers support this, see below)
jade.compile('body\n  .test')
  .catch(console.error.bind(console))
  .done (res) -> console.log(res.toString())

# or a file
jade.compileFile('./example.jade')
  .catch(console.error.bind(console))
  .done (res) -> console.log(res.toString())

# compile a client-side js template
jade.compileClient('body\n  .test')
  .catch(console.error.bind(console))
  .done (res) -> console.log(res.toString())

# or a file
jade.compileFileClient('./example.jade')
  .catch(console.error.bind(console))
  .done (res) -> console.log(res.toString())

```

Docs below should explain the methods executed in the example above.

### Accord Methods

- `accord.load(string, object)` - loads the compiler named in the first param, npm package with the name must be installed locally, or the optional second param must be the compiler you are after. The second param allows you to load the compiler from elsewhere or load an alternate version if you want, but be careful.

- `accord.supports(string)` - quick test to see if accord supports a certain compiler. accepts a string, which is the name of language (like markdown) or a compiler (like marked), returns a boolean.

### Accord Adapter Methods

- `adapter.name`
- `adapter.render(string, options)` - render a string to a compiled string
- `adapter.renderFile(path, options)` - render a file to a compiled string
- `adapter.compile(string, options)` - compile a string to a function
- `adapter.compileFile(path, options)` - compile a file to a function
- `adapter.compileClient(string, options)` - compile a string to a client-side-ready function
- `adapter.compileFileClient(string, options)` - compile a file to a client-side-ready function
- `adapter.clientHelpers()` - some adapters that compile for client also need helpers, this method returns a string of minfied JavaScript with all of them
- `adapter.extensions` - array of all file extensions the compiler should match
- `adapter.output` - string, expected output extension
- `adapter.engine` - the actual compiler, no adapter wrapper, if you need it

### Supported Languages

#### HTML

- [jade](http://jade-lang.com/)
- [ejs](https://github.com/visionmedia/ejs)
- [markdown](https://github.com/chjj/marked)
- [mustache/hogan](https://github.com/twitter/hogan.js)
- [handlebars](https://github.com/wycats/handlebars.js)
- [haml](https://github.com/visionmedia/haml.js)
- [swig](http://paularmstrong.github.io/swig)
- [marc](https://github.com/bredele/marc)
- nunjucks _(pending)_
- haml-coffee _(pending)_
- dust _(pending)_
- underscore _(pending)_
- toffee _(pending)_

#### CSS

- [stylus](http://learnboost.github.io/stylus/)
- [scss](https://github.com/andrew/node-sass)
- [less](https://github.com/less/less.js/)
- [myth](https://github.com/segmentio/myth)

#### JavaScript

- [coffeescript](http://coffeescript.org/)
- [dogescript](https://github.com/remixz/dogescript)
- [coco](https://github.com/satyr/coco)
- [livescript](https://github.com/gkz/LiveScript)

#### Minifiers

- [minify-js](https://github.com/mishoo/UglifyJS2)
- [minify-css](https://github.com/GoalSmashers/clean-css)
- [minify-html](https://github.com/kangax/html-minifier)
- [csso](https://github.com/css/csso)

### Languages Supporting Compilation

Accord can also compile templates into JavaScript functions, for some languages. This is really useful for client-side rendering. Languages with compile support are listed below. If you try to compile a language without support for it, you will get an error.

- jade
- ejs
- handlebars
- mustache

We are always looking to add compile support for more languages, but it can be difficult, as client-side template support isn't always the first thing on language authors' minds. Any contributions that help to expand this list are greatly appreciated!

When using a language supporting client-side templates, make sure to check the [docs](docs) for that language for more details. In general, you'll get back a stringified function from the `compileClient` or `compileFileClient` methods, and a string of client helpers from the `clientHelpers` methods. You can take these, organize them, and write them to files however you wish. Usually the best way is to write the helpers to a file first, then iterate through each of the client-compiled functions, assigning them a name so they can be accessed later on.

### Adding Languages

Want to add more languages? We have put extra effort into making the adapter pattern structure understandable and easy to add to and test. Rather than requesting that a language be added, please add a pull request and add it yourself! We are quite responsive and will quickly accept if the implementation is well-tested.

Details on running tests and contributing [can be found here](contributing.md)

### License

Licensed under [MIT](license.md)
