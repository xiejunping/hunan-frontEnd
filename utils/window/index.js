define(function(require) {
  'use strict';

  let utils = {
    /**
     * 取得URL里的参数
     * @param {String} name 查找key
     * @returns {String} 对应的值
     */
    getQueryString: function(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
      var str = window.location.search.substr(1).match(reg);
      if (str !== null) {
          return decodeURI(str[2]);
      }
      return null;
    },
  };

  return utils;
})
