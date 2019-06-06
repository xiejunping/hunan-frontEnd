define(function (require) {
  'use strict';

  Array.prototype.unique = function () {
    let json = {}, newArr = [], len = this.length;
    for (let i = 0; i < len; i ++) {
      const item = this[i]
      const tem = Object.prototype.toString.call(item)
      if (typeof json[item === 'undefined']) {
        json[item] = {};
        json[item][tem] = 1;
        newArr.push(item);
      } else if (typeof json[item][tem] === 'undefined') {
        json[item][tem] = 1;
        newArr.push(item);
      } else {
        json[item][tem]++;
      }
    }
    console.log(json);
    return newArr;
  }
});
