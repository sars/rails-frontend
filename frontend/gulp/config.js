'use strict';

module.exports = {

  'serverport': 3001,
  'browserPort': 3002,

  'fonts': {
    'src': [
      'src/**/fonts/*.*'
    ],
    'dest': 'build/src'
  },

  'images': {
    'src' : [
      'src/**/img/*.*'
    ],
    'dest': 'build/src'
  },

  'locales': {
    'src' : [
      'locales/**/*.*'
    ],
    'dest': 'build/locales'
  },

  'styles': {
    'src' : [
      'src/**/*.less'
    ],
    'dest': 'build'
  },

  'scripts': {
    'src' : 'src/**/*.js',
    'dest': 'build'
  },

  'views': {
    'src': [
      'src/**/*.jade'
    ],
    'dest': 'build/views'
  },

  'pages': {
    'src': [
      'pages/**/*.jade'
    ],
    'dest': 'build'
  },

  'dist': {
    'root'  : 'build'
  }

};
