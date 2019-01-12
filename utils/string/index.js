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
    /**
     * 随机范围的数
     * @param min
     * @param max
     * @returns {number}
     */
    random: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    /**
     * 随机纯数字的字符串
     * @param len
     * @returns {string}
     */
    randomNumber: function (len) {
      if (typeof len !== 'number' || len === 0) return
      let arr = []
      for(let i = 0; i < len; i++) {
        arr.push(Math.floor(Math.random() * 10))
      }
      return arr.join('')
    },
    /**
     * 判断字符串长度 （可中文两个长度）
     * @param {string} val
     * @returns {number}
     */
    getByteLen: function (val) {
      var len = 0
      for (var i = 0; i < val.length; i++) {
        var a = val.charAt(i)
        /* eslint-disable-next-line */
        if (a.match(/[^\x00-\xff]/ig) !== null) {
          len += 2
        } else {
          len += 1
        }
      }
      return len
    }
  }

  return utils;
});
