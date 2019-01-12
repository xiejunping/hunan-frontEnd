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
    //处理字符判断
    judgeCharacterLength(str, length){
      let i = this.validTrim(str),j = 0;
      i ? j = i.replace(/[^\x00-\xff]/g, "**").length : '';
      return j >= length;
    },
    isArray: function (arr) {
      let outPutArr = [];
      if (Object.prototype.toString.call(arr) === "[object Array]") outPutArr = arr;
      return outPutArr;
    },
    isObject: function (obj) {
      let outPutObj = {};
      if (Object.prototype.toString.call(obj) === "[object Object]") outPutObj = obj;
      return outPutObj;
    },
    isString: function (str) {
      let outPutStr = '';
      if (Object.prototype.toString.call(str) === "[object String]") outPutStr = str;
      return outPutStr;
    },
    getStorage: function (key, type) {
      let storage_tips = window.localStorage.getItem(key);

      if (type === 'object') {
        if (storage_tips) storage_tips = JSON.parse(storage_tips);
        return this.isObject(storage_tips);
      } else if (type === 'string') {
        return this.isString(storage_tips);
      } else if (type === 'array') {
        if (storage_tips) storage_tips = JSON.parse(storage_tips);
        return this.isArray(storage_tips);
      } else {
        return storage_tips;
      }
    },
    setStorage: function (key, item) {
      let meta = null;
      let type = typeof(item);

      if (type === 'object' || type === 'array') {
        meta = JSON.stringify(item);
      } else {
        meta = item;
      }

      window.localStorage.setItem(key, meta);
    },
    removeStorage: function (key) {
      window.localStorage.removeItem(key);
    },
    creatAsciiAZ() {
      let arr = [];
      for (let i = 0; i < 26; i++) {
        arr.push(String.fromCharCode(65 + i))
      }
      return arr;
    },
    validTrim (val) {
      //去除首尾空格
      val = typeof val === 'string' ? val : val + '';
      val = val.replace(/(^\s*)|(\s*$)/g, '');

      return val;
    },
    validPhone (val) {
      let reg = new RegExp(/^1[0-9]\d{9}$/);
      let res = {
        state: false,
        msg: '没有通过验证'
      };
      //去掉首尾空格
      val = this.validTrim(val);

      if (reg.test(val)) {
        res.state = true;
        res.msg = '';
      } else if (val.length === 0) {
        res.msg = '手机号不能为空';
      } else {
        res.msg = '手机号格式错误';
      }
      return res;
    },
    validCode (val) {
      let reg = new RegExp(/^[0-9\s]{6}$/);
      let res = {
        state: false,
        msg: '没有通过验证'
      };
      val = this.validTrim(val);
      if (reg.test(val)) {
        res.state = true;
        res.msg = '';
      } else if (val.length === 0) {
        res.msg = '密码不能为空';
      } else {
        res.msg = '密码格式错误';
      }
      return res;
    },
    validEmpty (val, type) {
      let reg = new RegExp(/^[\s]{0,}$/);
      let reg2 = new RegExp(/^([\u4e00-\u9fa5a-zA-Z0-9\s]{1,10}|[a-zA-Z0-9\s]{1,10})$/);
      let message = type ? '电话' : '姓名';
      let res = {
        state: false,
        msg: '没有通过验证'
      };

      val = val.replace(/(^\s*)|(\s*$)/g, '');
      if (reg.test(val)) {
        res.msg = message + '不能为空';
      } else if (!type && !reg2.test(val)) {
        res.msg = message + '不能超过10个字';
      } else {
        res.state = true;
        res.msg = '';
      }

      return res;
    },
    fnUrlReplace (eleLink) {
      if (!eleLink) return;
      if (history.replaceState) {
        history.replaceState(null, document.title, eleLink.split('#')[0] + '#');
        window.location.replace('');
      } else {
        window.location.replace(eleLink);
      }
    },
    //姓名验证
    validName(value){
      let reg = new RegExp(/^[\u4e00-\u9fa5a-zA-Z0-9_-·]+$/);
      if (!value) {
        return {
          msg: '姓名不能为空！',
          state: false
        }
      }
      if (!reg.test(value)) {
        return {
          msg: '姓名格式错误！',
          state: false
        }
      } else {
        return {
          msg: '',
          state: true
        };
      }
    },
    //验证企业名称
    validCompanyName(value){
      let reg = new RegExp(/^[\u4e00-\u9fa5a-zA-Z0-9_-·]+$/);
      if (!value) {
        return {
          msg: '企业名称不能为空',
          state: false
        }
      }
      if (!reg.test(value)) {
        return {
          msg: '企业名称格式错误！',
          state: false
        }
      } else {
        return {
          msg: '',
          state: true
        };
      }
    },
    //营业执照号验证
    validBusinessLicense(value){
      let reg = new RegExp(/^[a-zA-Z0-9]+$/);
      if (!value) {
        return {
          msg: '营业执照号不能为空',
          state: false
        }
      }
      if (value.length < 5) {
        return {
          msg: '营业执照号长度错误',
          state: false
        }
      }
      if (!reg.test(value)) {
        return {
          msg: '营业执照号格式错误',
          state: false
        }
      } else {
        return {
          state: true
        };
      }
    },
    //身份证验证
    validateIdCard(idCard){
      let err = {
        msg: '',
        state: true
      };
      if (!idCard) {
        err.msg = '身份证号码不能为空！';
        err.state = false;
        return err;
      }
      //15位和18位身份证号码的正则表达式
      // var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
      var regIdCard = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
      //如果通过该验证，说明身份证格式正确，但准确性还需计算
      if (regIdCard.test(idCard)) {
        if (idCard.length == 18) {
          var idCardWi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; //将前17位加权因子保存在数组里
          var idCardY = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; //这是除以11后，可能产生的11位余数、验证码，也保存成数组
          var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
          for (var i = 0; i < 17; i++) {
            idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
          }

          var idCardMod = idCardWiSum % 11;//计算出校验码所在数组的位置
          var idCardLast = idCard.substring(17);//得到最后一位身份证号码

          //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
          if (idCardMod == 2) {
            if (idCardLast == "X" || idCardLast == "x") {
              return err;
            } else {
              err.msg = '身份证号码无效！';
              err.state = false;
              return err;
            }
          } else {
            //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
            if (idCardLast == idCardY[idCardMod]) {
              return err;
            } else {
              err.msg = '身份证号码无效！';
              err.state = false;
              return err;
            }
          }
        }
      } else {
        err.msg = '身份证号码格式不正确！';
        err.state = false;
        return err;
      }
    },
    verifyStoreInfo(store){
      let reg = new RegExp(/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/);
      if (!store.name) {
        return {
          errmsg: '门店名称不能为空',
          state: false
        }
      }
      if (!store.address) {
        return {
          errmsg: '门店位置不能为空',
          state: false
        }
      }
      if (!reg.test(store.storeName)) {
        return {
          errmsg: '门店名称只能为中文、字母、数字的组合',
          state: false
        }
      } else {
        return {
          errmsg: '',
          state: true
        };
      }
    },
    getProince (area) {
      let proince = [];
      area.forEach(function (item, idx) {
        proince.push(item.Id);
      });
      return proince;
    },
    getCity (area, proineId) {
      let city = [];
      let proince = this.getProince(area);
      let i = proince.indexOf(proineId);

      if (i > -1) {
        city = area[i].Citys;
      }
      return city;
    },

    //日期格式化
    formatDate (date, fmt) {
      var o = {
        "M+": date.getMonth() + 1,                 //月份
        "d+": date.getDate(),                    //日
        "h+": date.getHours(),                   //小时
        "m+": date.getMinutes(),                 //分
        "s+": date.getSeconds(),                 //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds()             //毫秒
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
      }
      return fmt;
    },
    //增加day天
    addDay(date, day){
      return utils.formatDate(new Date(date.getTime() + 1000 * 60 * 60 * 24 * day), 'yyyy-MM-dd hh:mm:ss');
    },
    //减少day天
    minusDay(date, day){
      return utils.formatDate(new Date(date.getTime() - 1000 * 60 * 60 * 24 * day), 'yyyy-MM-dd hh:mm:ss');
    },
    //分钟格式化  _天_小时_分钟
    formatMin (int) {
      if (typeof int != 'number') {
        int = parseInt(int, 10);
      }
      var d, h, m, fmn;
      if (int >= 24 * 60) {
        // 天+小时+分钟
        d = parseInt(int / (24 * 60), 10);
        if (int % (24 * 60) > 60) {
          h = parseInt(((int % (24 * 60)) / 60), 10);
          m = (int % (24 * 60)) % 60;
        }
        else {
          h = 0;
          m = int % (24 * 60);
        }
        fmn = d + '天' + h + '小时' + m + '分钟';
      }
      else if (int >= 60) {
        // 小时+分钟
        h = parseInt(int / 60, 10);
        m = int % 60;
        fmn = h + '小时' + m + '分钟';
      }
      else {
        fmn = int + '分钟';
      }
      return fmn;
    },

    // 判断日期是否是今天
    isToday (date) {
      if (!date) return date;
      date = typeof date == 'string' ? new Date(date.replace(/-/g, '/')) : date;

      var day,
        dateformat,
        year = this.formatDate(date, "yyyy"),
        today = this.formatDate(new Date(), "yyyy/MM/dd 00:00:00"),
        idate = this.formatDate(date, "yyyy/MM/dd 00:00:00"),
        offset = new Date(idate).getTime() - new Date(today).getTime();

      offset = offset ? offset / (1000 * 60 * 60 * 24) : 0;
      switch (offset) {
        case -1:
          day = '昨天';
          break;
        case 0:
          day = '今天';
          break;
        case 1:
          day = '明天';
          break;
        default:
          day = false;
          break;
      }
      // day =  false;
      year = year == this.formatDate(new Date(), "yyyy") ? '' : year + '-';
      dateformat = day ? this.formatDate(date, day + " hh:mm") : this.formatDate(date, "MM-dd hh:mm");

      return year + dateformat;
    },

    // 显示今日，昨日显示昨天日，跨月显示月，跨年显示年
    changeDay (date) {
      date = this.formatDate(new Date(date.replace(/-/g, '/')), 'yyyy-MM-dd');
      date = date.split('-');
      let dYears = date[0];
      let dMonth = date[1];
      let dDay = date[2];
      let years = this.formatDate(new Date(), 'yyyy');
      let month = this.formatDate(new Date(), 'MM');
      let day = this.formatDate(new Date(), 'dd');

      if(dDay == day && dMonth == month && dYears == years){
        day = '今日';
        return day;
      }

      if ( dDay != day && dMonth == month && dYears == years ) {
        day = dDay + ' 日 ';
        return day;
      }
      if (dMonth != month && dYears == years ) {
        day = dMonth + ' 月 ' + dDay + ' 日 ';
        return day;
      }
      if ( dYears != years ) {
        day = dYears + ' 年 ' + dMonth + ' 月 ' + dDay + ' 日 ';
        return day;
      }
      return day;
    },
    // 显示本月，跨月显示月，跨年显示年
    changeMonth (date) {
      date = this.formatDate(new Date(date.replace(/-/g, '/')), 'yyyy-MM-dd');
      date = date.split('-');
      let dYears = date[0];
      let dMonth = date[1];
      let dDay = date[2];
      let years = this.formatDate(new Date(), 'yyyy');
      let month = this.formatDate(new Date(), 'MM');
      let day = this.formatDate(new Date(), 'dd');

      if(dMonth == month && dYears == years){
        day = '本月';
        return day;
      }

      if (dMonth != month && dYears == years ) {
        day = dMonth + ' 月 ';
        return day;
      }

      if ( dYears != years ) {
        day = dYears + ' 年 ' + dMonth + ' 月 ';
        return day;
      }
      return day;
    },

    //获取照片
    getPicture: function (paremt, callback) {
      if (window.api) {

        let option = {
          encodingType: 'jpg',
          mediaValue: 'pic',
          destinationType: 'base64',
          allowEdit: 80,
          targetWidth: 200,
          targetHeight: 200,
          saveToPhotoAlbum: false,
          sourceType: paremt.sourceType
        };
        api.getPicture(option, function (ret, err) {
          callback(ret, err);
        });
      }
    },
    // 图片上传
    uploadImage: function (option, callback) {
      if (window.api) {
        var imgHost = Config.imgHost,
          imgPostAPI = Config.imgPostAPI;

        api.ajax({
          url: imgHost + imgPostAPI,
          method: 'post',
          tag: option.tag || 'uploadimg',
          data: {
            values: {img: option.img}
          }
        }, function (ret, err) {
          if (ret) {
            callback(ret);
          } else {
            api.alert({msg: JSON.stringify(err)});
          }
        });
      }
    },
    getNetworkUrl: function (url) {
      var networkUrl,
        imgGetAPI = Config.imgGetAPI,
        imgHost = Config.imgHost;

      if (url) {
        networkUrl = imgHost + imgGetAPI + url;
      } else {
        alert({msg: '图片服务器显示 url 不能为空！'});
      }
      return networkUrl;
    },
    toastShow: function (CTIME, toastVm, option) {
      toastVm.show = true;
      toastVm.position = option.position;
      toastVm.text = option.text;
      toastVm.icon = option.icon;
    },
    toastClose: function (CTIME, toastVm) {
      toastVm.show = false;
    },
    toastAutoClose: function (CTIME, toastVm, option) {
      toastVm.show = true;
      toastVm.text = option.text;
      toastVm.icon = option.icon;
      toastVm.position = option.position;
      toastVm.note = option.note;
      if (option.autoClose) {
        if (CTIME) clearTimeout(CTIME);
        CTIME = setTimeout(() => {
          toastVm.show = false;
        }, 1000 * option.sec);
      }
    },
    //记录集中查找位置
    findIndex: function (id, feild, arr) {
      let index = -1,
        tem = [];
      if (id && feild && arr && arr.length) {
        arr.forEach((t, i) => {
          tem.push(t[feild]);
        });
        index = tem.indexOf(id);
      }
      return index;
    },
    //千分位处理
    thousands: function (num) {
      if (typeof num !== 'number') return 0;
      return (num.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
    },
    //生成过去的 num 个月份
    createMenuData: function (year, month, num) {
      let data = [];

      for (var i = 0; i < num; i++) {
        data.push({
          text: this.formatDate(new Date(year + '/' + month + '/1'), 'yyyy-MM'),
          checked: !i,
          day: this.formatDate(new Date(year + '/' + month + '/1'), 'yyyy-MM')
        });

        if (month > 1)	{
          month -= 1;
        } else {
          year -= 1;
          month = num;
        }
      }

      return data;
    },
    //去掉特殊字符
    replaceChar: function (val) {
      if (val)  val = val.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, '');
      return val;
    },

    //引导指引
    getUserTips: function (key) {
      let tips = this.getStorage('tips', 'object');
      let userData = this.getStorage('userData', 'object');
      let userId = userData.userId;
      //用户id没有，异常监控
      if (!userId) {
        return;
      }

      return tips && tips[userId] && tips[userId][key];
    },
    setUserTips: function (meta) {
      let tips = this.getStorage('tips', 'object');
      let userData = this.getStorage('userData', 'object');
      let userId = userData.userId;
      let userTip;

      //用户id没有，异常监控，有则取原来的tip
      if (!userId) return;
      else userTip = tips[userId];

      //用户tip已有，追加，没有则定义
      if (userTip) 	userTip = Assign({}, userTip, meta);
      else 			userTip = meta;

      tips = Assign({}, tips, {[userId]: userTip});
      this.setStorage('tips', tips);
    },

    //分页加载初始化成功回调
    initCallBack: function (data, _this) {
      if (data && data.length) {
        _this.noData = false;
        _this.pageIndex++;
        _this.data = data;
        _this.$nextTick(function () {
          if (_this.$refs.my_scroller) {
            _this.$refs.my_scroller.resize();
          }
        });
      } else {
        //无数据处理
        utils.noData(_this);
      }
    },
    //分页加载初始化失败回调
    initEcallback(data, _this){
      setTimeout(() => {
        utils.toastAutoClose(null, _this.toastVm, {
          text: data.msg,
          icon: false,
          position: 'bottom',
          autoClose: true,
          sec: 2
        });
      }, 10);
      utils.noData(_this);
    },
    //刷新成功回调
    refreshCallBack: function (data, _this) {
      if (data && data.length) {
        _this.noData = false;
        _this.pageIndex++;
        _this.data = data;
        _this.$nextTick(function () {
          if (_this.$refs.my_scroller) {
            _this.$refs.my_scroller.resize();
            _this.$refs.my_scroller.finishPullToRefresh();
          }
        });
      } else {
        utils.noData(_this);
        if (_this.$refs.my_scroller)
          _this.$refs.my_scroller.finishPullToRefresh();
      }
    },
    //刷新错误回调
    refreshEcallBack(data, _this){
      setTimeout(() => {
        utils.toastAutoClose(null, _this.toastVm, {
          text: data.msg,
          icon: false,
          position: 'bottom',
          autoClose: true,
          sec: 2
        });
      }, 10);
      utils.noData(_this);
      if (_this.$refs.my_scroller)
        _this.$refs.my_scroller.finishPullToRefresh();
    },
    //下拉加载更多成功
    infiniteCallBack(data, _this){
      if (data && data.length) {
        _this.pageIndex++;
        _this.data = _this.data.concat(data);
        _this.$nextTick(function () {
          if (data.length < _this.pageSize)
            utils.finishInfinite(_this, true);
          else
            utils.finishInfinite(_this);

        });
      } else {
        utils.finishInfinite(_this, true);
      }
    },
    //下拉加载更多失败
    infiniteEcallBack(data, _this){
      /*setTimeout(() => {
           Utils.toastAutoClose(null, toastVm, {
           text: data.msg,
           icon: false,
           position: 'bottom',
           autoClose: true,
           sec: 2
           });
           }, 10);*/
      if (!this.data || !this.data.length) utils.noData(_this);
      else utils.finishInfinite(_this, true);
    },
    finishInfinite(_this, isEnd){
      if (_this.$refs.my_scroller) _this.$refs.my_scroller.finishInfinite(isEnd);
    },
    noData(_this){
      _this.noData = true;
      _this.data = [];
    },
    // 百分比保留一位小数，不四舍五入
    especialFormat (val) {
      if(val == 0) return 0;
      if(val === '') return '-';
      val = (val*100).toFixed(2) + '';
      return val.substring(0, val.length - 1);
    },
    // 数字，保留两位小数，不四舍五入
    numberEspecialFormat (val) {
      if(val == 0) return 0;
      if(val === '') return '-';
      val = (+val).toFixed(3) + '';
      return val.substring(0, val.length - 1);
    },
    /**
     * 获取位置
     * @param {dom} el
     * @returns {{top: number, left: number, width: number, height: number}}
     */
    getRect: function (el) {
      if (el instanceof window.SVGElement) {
        let rect = el.getBoundingClientRect()
        return {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height
        }
      } else {
        return {
          top: el.offsetTop,
          left: el.offsetLeft,
          width: el.offsetWidth,
          height: el.offsetHeight
        }
      }
    },
    /**
     * 对象转formdata数据
     * @param {object} obj
     * @returns {formdata} form
     */
    objToFormData: function (obj) {
      let form = new FormData()
      for (const key in obj) {
        if ({}.hasOwnProperty.call(obj, key)) {
          // 数组处理
          if (Object.prototype.toString.call(obj[key]) === '[object Array]') {
            obj[key].forEach(ret => {
              form.append(key, ret)
            })
          } else form.append(key, obj[key])
        }
      }
      return form
    }
  };

  return utils;
})
