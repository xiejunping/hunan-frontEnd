const test = {
  baseurl: 'http://localhost',
  resPath: ''
}

const prod = {
  baseurl: 'https://www.jsvue.cn',
  ossPath: '',
  resPath: ''
}

const config = process.env.VUE_APP_BUILD === 'prod' ? Object.assign({}, prod) : Object.assign({}, test)

export const HOST_API = config.baseurl
export const RES_CODE = 200
export const STATE_CODE = 200
export const MAX_CONTENT_LENGTH = 100000000
export const XSRF_COOKIE = 'XSRF-TOKEN'
export const XSRF_HEADER = 'sessionid'
export const SECRET_KEY = 'WAPMAN'
export const COOKIE_EXPIRES = 1
