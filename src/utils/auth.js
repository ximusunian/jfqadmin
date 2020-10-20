import Cookies from 'js-cookie'

const TokenKey = 'zkpub_token'

export function getDDCorpId() {
  return "ding2af04eb0f4aa69e435c2f4657eb6378f";//测试
  // return "dingc9e4a9102495680e35c2f4657eb6378f";//正式
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}


// 登录用户ID：Start
const UserIdKey = 'zkpub_userid'

export function getUserId() {
  return Cookies.get(UserIdKey)
}

export function setUserId(val) {
  return Cookies.set(UserIdKey, val)
}

export function removeUserId() {
  return Cookies.remove(UserIdKey)
}
// 登录用户ID：End


// 登录用户员工ID：Start
const EmployeeIdKey = 'zkpub_employeeId'

export function getEmployeeId() {
  return Cookies.get(EmployeeIdKey)
}

export function setEmployeeId(val) {
  return Cookies.set(EmployeeIdKey, val)
}

export function removeEmployeeId() {
  return Cookies.remove(EmployeeIdKey)
}
// 登录用户员工ID：End


// 登录用户钉钉ID：Start
const DingDingIdKey = 'zkpub_dingdingid'

export function getDingDingId() {
  return Cookies.get(DingDingIdKey)
}

export function setDingDingId(val) {
  return Cookies.set(DingDingIdKey, val)
}

export function removeDingDingId() {
  return Cookies.remove(DingDingIdKey)
}
// 登录用户钉钉ID：End
