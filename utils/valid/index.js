define(function(require) {
  'use strict';

  let utils = {
    /**
     * 是否为请求地址 http:// https://
     * @param {String} str URL地址
     * @returns {Boolean}
     */
    isHttp: function(str) {
      var reg = new RegExp(/^((https|http)?:\/\/)[^\s]+/);
      return reg.test(str);
    }
  }
});
