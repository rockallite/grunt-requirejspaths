# grunt-requirejspaths

> Find RequireJS modules and make a file which contains corresponding paths config.

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-requirejspaths --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-requirejspaths');
```

## The "requirejspaths" task

### Overview
In your project's Gruntfile, add a section named `requirejspaths` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  requirejspaths: {
    options: {
      // Task-specific options go here.
    }
  },
});
```

This task depends on `grunt.filerev.summary` object. So `filerev` task of [grunt-filerev](https://github.com/yeoman/grunt-filerev) plugin must be run first.

### Options

#### options.baseRoot
Type: `String`
Default value: `''`

Base path of RequireJS module script files.

#### options.baseUrl
Type: `String`
Default value: `''`

Use as the value of `baseUrl` property of configuration object for `require.config()`.

#### options.modules
Type: `Array`
Default value: `undefined`

The names of RequireJS modules.

#### options.outFile
Type: `String`
Default value: `undefined`

Path of the output file, e.g. `".tmp/requirejspaths.html"`.

#### options.template
Type: `String`
Default value:
```html
<script>
"use strict";
require.config({
<% if (baseUrl) { %>  baseUrl: "<%= baseUrl %>",
<% } %>
  paths: <%= JSON.stringify(moduleMappings, null, 2) %>
});
</script>
```

A template string for rendering the output file. If `options.templateFile` is specified, this option is ignored.

#### options.templateFile
Type: `String`
Default value: `undefined`

A template file whose content is used for rending the output file. This option overrides `options.template`.

#### options.scriptTag
Type: `Boolean`
Default value: true

If you want to output a pure JavaScript file, set this to `false`.

#### options.useStrict
Type: `Boolean`
Default value: true

Output the `'use strict'` detective before the JavaScript code. 

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
v0.1.1 Add `scriptTag` and `useStrict` options.
v0.1.0 Initial release.
