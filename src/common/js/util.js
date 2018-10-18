/* global location, HUYASdk, $, openApp */

import '../scss/toast.scss'

const invokeLoginFromApp = () => {
  location.href = 'http://www.huya.com?hyaction=forenotice&login=0'
}


const getPlatform = () => {
  let browser = {
    versions: (function () {
      let u = navigator.userAgent
      return {// 移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1, // IE内核
        presto: u.indexOf('Presto') > -1, // opera内核
        webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
        mobile: !!u.match(/AppleWebKit.+Mobile.*/) || !!u.match(/AppleWebKit/), // 是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
        iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, // 是否为iPhone或者QQ HD浏览器
        iPad: u.indexOf('iPad') > -1, // 是否iPad
        webApp: u.indexOf('Safari') === -1 // 是否web应该程序，没有头部与底部
      }
    }())
  }

  return browser.versions.android ? 'android' : 'ios'
}

const getCookie = name => {
  let value = '; ' + document.cookie
  let parts = value.split('; ' + name + '=')
  if (parts.length === 2) return parts.pop().split(';').shift()
}

const getURLParam = name => {
  let value = location.search.match(new RegExp(`[?&]${name}=([^&]*)(&?)`, 'i'))
  return value ? decodeURIComponent(value[1]) : value
}

let writeCookieCount = parseInt(getURLParam('count')) || 0

const checkLogin = () => {
  HUYASdk && HUYASdk.getCurrentUserInfo({
    complete: function (res) {
      let token = res.udbToken
      if (!token) {
        invokeLoginFromApp()
      } else {
        if (!getCookie('yyuid') && writeCookieCount < 4) {
          let currentCount = ++writeCookieCount
          let url = location.href
          let tempUrl = url + (url.indexOf('?') > 0 ? '&' : '?') + 'count=' + currentCount
          let ticket = encodeURIComponent(getURLParam('ticket'))
          let appid = getURLParam('appid')
          let uid = getURLParam('uid')
          let busiId = getURLParam('busiId')
          let ticketType = getURLParam('ticketType')

          if (String(getURLParam('bypass')) === '3') {
            location.href = (location.protocol === 'http:' ? 'http://udblgn-test' : 'https://udblgn') + '.huya.com/login/ticket?uid=' + uid + '&appid=' + appid + '&ticket=' + ticket + '&ticketType=' + ticketType + '&busiId=' + busiId + '&cks=true&busiUrl=' + encodeURIComponent(tempUrl) + '&reqDomainList=huya.com&passport=&bypass=3'
          } else {
            location.href = 'https://lgn.huya.com/lgn/jump/authentication.do?ticket=' + token + '&appid=5060&busiId=&busiUrl=' + encodeURIComponent(tempUrl) + '&yyuid=&reqDomainList=huya.com&action=authenticate&isJump=1'
          }
        }
      }
    }
  })
}

const jumproom = (uid, tid, sid, type) => {
  if (typeof window.KiwiJSBridge === 'undefined') {
    openApp({ uid })
  } else {
    let url = 'https://m.huya.com/?hyaction=live&channelid=' + tid + '&subid=' + sid + '&liveuid=' + uid + '&gameid=' + type + '&type=' + ((Number(type) === 2168) ? 3 : 1)
    HUYASdk.openUrl({
      url: url
    })
  }
}

const showToast = msg => {
  let $toast = $('.toast')
  if (!$toast.length) {
    $toast = $('<p class="toast"></p>')
    $toast.appendTo('body')
  }
  $toast.html(msg)
  $toast.show()
  setTimeout(() => {
    $toast.hide()
  }, 3000)
}

const dy = uid => {
  if (typeof window.KiwiJSBridge === 'undefined') {
    openApp({ uid })
  } else {
    if (!getCookie('yyuid')) {
      HUYASdk.showLogin()
    } else {
      $.ajax({
        url: 'https://www.huya.com/member/index.php?m=Activity&do=jsonpSubU&from=act&type=Subscribe&uid=' + uid,
        dataType: 'jsonp',
        type: 'POST',
        success: function (data) {
          if (data.status === 1) {
            showToast('订阅成功！')
          } else {
            showToast(data.message)
          }
        }
      })
    }
  }
}

const trimHttpURL = url => $.trim(url).replace(/^http:/, '')

export default {
  invokeLoginFromApp,
  getPlatform,
  getCookie,
  getURLParam,
  checkLogin,
  jumproom,
  dy,
  showToast,
  trimHttpURL
}
