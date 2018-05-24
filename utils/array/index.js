define(function (require) {
  'use strict';

  let utils = {
    /**
     * 记录集中查找位置
     * @param {String} id 查找值
     * @param {String} feild 查找属性
     * @param {Array} arr 查找源
     * @returns {number} 位置
     */
    findIndex: function (id, feild, arr) {
      let index = -1,
        tem = [];
      if (id && feild && arr && arr.length) {
        arr.forEach(function (t, i) {
          tem.push(t[feild]);
        });
        index = tem.indexOf(id);
      }
      return index;
    },
    
  };

  return utils;
});
