/*
 * grunt-requirejspaths
 * https://github.com/rockallite/grunt-requirejspaths
 *
 * Copyright (c) 2014 Rockallite Wulf
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('requirejspaths', 'Find RequireJS modules and make a file which contains corresponding paths config.', function() {
    // Need `grunt-filerev` plugin
    if (!grunt.filerev) {
      grunt.fail.warn('Could not find grunt.filerev. Task "filerev" must be run first.');
    }
    if (!grunt.filerev.summary) {
      grunt.log.warn('No mappings in grunt.filerev.summary. Abort file creation.');
      return;
    }

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      baseRoot: '',
      baseUrl: '',
      scriptTag: true,
      useStrict: true
    });
    if (!options.outputFile) {
      grunt.fail.warn('Option `outputFile` not specified.');
    }
    if (!options.modules) {
      grunt.log.warn('Option `modules` not specified. Abort file creation.');
      return;
    }

    var templateString;
    if (options.templateFile) {
      // Read template from a file
      if (grunt.file.exists(options.templateFile)) {
        templateString = grunt.file.read(options.templateFile);
      }
      else {
        grunt.fail.warn('Template file "' + options.templateFile + '" not found.');
      }
    }
    else {
      /*jshint multistr:true */
      templateString = options.template || (
        (options.scriptTag ? '<script>\n' : '') +
        (options.useStrict ? '\'use strict\';\n' : '') +
'require.config({\n\
<% if (baseUrl) { %>  baseUrl: "<%= baseUrl %>",\n<% } %>\
  paths: <%= JSON.stringify(moduleMappings, null, 2) %>\n\
});\n' +
        (options.scriptTag ? '</script>\n': ''));
    }

    var assets = grunt.filerev.summary;
    var path = require('path');
    var mappings = {};
    options.modules.forEach(function (module) {
      var longPath = assets[path.join(options.baseRoot, module) + '.js'];
      var shortPath = path.relative(options.baseRoot, longPath);
      mappings[module] = shortPath.substr(0, shortPath.length - path.extname(shortPath).length);
    });
    var data = {
      baseUrl: options.baseUrl,
      moduleMappings: mappings
    };
    var content = grunt.template.process(templateString, {data: data});
    grunt.file.write(options.outputFile, content);
    grunt.log.writeln('File "' + options.outputFile + '" created.');
  });

};
