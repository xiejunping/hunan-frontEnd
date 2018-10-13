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
    },
    isEmpty: function(str) {
      const reg = new RegExp(/^[\s]{0,}$/)
      str = utils.trim(str)
      return reg.test(str)
    },
    isString: function(val) {
      return typeof val === 'string'
    },
    isNumber: function(val) {
      return !isNaN(Number(val))
    },
    isArray: function(val) {
      return Array.isArray(val)
    },
    isDate: function(val) {
      return !isNaN(Number(val))
    },
    isEmail: function(val) {
      return typeof val === 'string' && /^[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)+$/i.test(val)
    },
    isTel: function(val) {
      return typeof val === 'string' && /^(11|13|14|15|16|17|18|19)[0-9]{9}$/.test(val)
    },
    isUrl: function(val) {
      return typeof val === 'string' && /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/.test(val)
    },
    isPrototype: function (data) {
      return Object.prototype.toString.call(data).toLowerCase();
    },
    isJSON: function(data) {
      return utils.isPrototype(data) === '[object object]';
    },
    isFunction: function(data) {
      return utils.isPrototype(data) === '[object function]';
    }
  }
});
