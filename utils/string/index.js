define(function(require) {
  'use strict';

  let utils = {
    trim: function(str) {
      if (String.prototype.trim) {
          return str === null ? '' : String.prototype.trim.call(str);
      } else {
          return str.replace(/(^\s*)|(\s*$)/g, '');
      }
    },
    trimAll: function(str) {
      return str.replace(/\s*/g, '')
    },
  }

  return utils;
});
