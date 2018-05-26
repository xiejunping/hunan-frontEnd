define(function (require) {
  'use strict';
  function _checkType (v) {
    return Object.prototype.toString.call(v).slice(8, -1)
  }
  let utils = {
    /**
     * 记录集中查找位置
     * @param {String} id 查找值
     * @param {String} feild 查找属性
     * @param {Array} arr 查找源
     * @returns {number} 位置
     */
    findIndex: function (id, feild, arr) {
      let index = -1;
      let tem = [];
      if (id && feild && arr && arr.length) {
        arr.forEach(function (t, i) {
          tem.push(t[feild]);
        });
        index = tem.indexOf(id);
      }
      return index;
    },
    /**
     * 数组随机乱序
     * @param {Array} arr 要乱序的数组
     * @returns {Array} arr 乱序的数组
     */
    randomArr: function(arr) {
      if (_checkType(arr) !== 'Array') return null;
      return arr.sort(function() {
          return (0.5 - Math.random());
      });
    }
  };

  return utils;
});
