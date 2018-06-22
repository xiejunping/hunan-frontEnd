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
    /**
     * 日期格式化
     * @param date
     * @param fmt
     * @returns {*}
     */
    formatDate: function(date, fmt) {
      var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        "S": date.getMilliseconds()
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length))); }
      }
      return fmt;
    },
  }

  return utils;
});
