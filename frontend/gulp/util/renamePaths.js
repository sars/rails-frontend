'use strict';

module.exports = plugin;

var path = require('path');
var through = require('through2');

function plugin() {
  return through.obj(function (file, enc, cb) {
    var contents = file.contents.toString();

    if (path.extname(file.path) === '.css') {
      contents = contents.replace(/(url\(['"]?)([^'")]+)/gi, function (all, before, url) {
        if (isUrlAbsolute(url) || isPathAbsolute(url)) {
          return all;
        }

        var absolutePath = path.resolve(path.dirname(file.path), url);
        return before + '/' + path.relative(process.cwd(), absolutePath);
      });
      file.contents = new Buffer(contents);
    }

    this.push(file);

    cb();
  });
}

function isUrlAbsolute(url) {
  return /^(?:[a-z]+:)?\/\//.test(url) || /^data:[a-z]+\/[a-z+]+;/.test(url);
}

function isPathAbsolute(url) {
  return /^\//.test(url);
}
