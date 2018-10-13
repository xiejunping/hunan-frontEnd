define(function (require) {
  'use strict';

  let utils = {
    /**
     * 是否是数组
     * @param arr
     * @returns {boolean}
     */
    isArray: function (arr) {
      if (!Array.isArray) {
        Array.isArray = arg => {
          return Object.prototype.toString.call(arr) === "[object Array]"
        }
      }
      return Array.isArray(arr)
    },
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
      if (!Array.isArray(arr)) return null;
      arr.sort(function() {
        return (0.5 - Math.random());
      });
      return arr;
    },
    /**
     * 数组随机抽多个 - 非重复
     * @param arr
     * @param len
     * @returns {*}
     */
    randomLen: function (arr, len) {
      if (!Array.isArray(arr)) return null;
      if (arr.length < len) return null;
      const arrTmp = [];
      for (let i = 0; i < len; i++) {
        arr.push(utils.randomArr(arr).pop())
      }
      return arrTmp;
    }
  };

  return utils;
});
