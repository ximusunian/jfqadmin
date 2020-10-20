import request from '@/utils/request'

export function login(data) { 
  return request({
    url: '/api/TokenAuth/Authenticate',
    method: 'post',
    data
  })
}
export function ddlogin(code) { 
  return request({
    url: '/api/TokenAuth/DDAuth',
    method: 'post',
    params:{code:code}
  })
}
export function getInfo() { 
  return request({
    url: '/api/User/GetUserNPermissions',
    method: 'get'
  })
}
export function getSelfInfo(){
  return request({
    url:'api/User/GetMySelfInfo',
    method:'get'
  });
}
export function getselecteduser() {
  return request({
    url: '/api/User/GetUserSelectDtoList',
    method: 'get'
  })
}
export function addUser(userInfo) {
  return request({
    url: '/api/User/AddUser',
    method: 'post',
    data: userInfo
  })
}
export function getuserlist(usersearchdto) {
  return request({
    url: '/api/User/GetUserList',
    method: 'get',
    params: usersearchdto
  })
}
export function getuserinfo(userid) {
  return request({
    url: '/api/User/GetUserInfo',
    method: 'get',
    params: userid
  })
}
export function GetAllUser(igoreAuth) {
  return request({
    url: '/api/User/GetAllUser',
    method: 'get',
    params:{igoreAuth:igoreAuth}
  })
}
export function upduser(userdata) {
  return request({
    url: '/api/User/UpdUser',
    method: 'put',
    data: userdata
  })
}
export function deleteuser(userids) {
  return request({
    url: '/api/User/DeleteUser',
    method: 'delete',
    data: [userids]
  })
}
export function modifyuserrole(userrole) {
  return request({
    url: '/api/User/ModifyUserRole',
    method: 'put',
    data: userrole 
  })
}
export function resetpwd(userdata) { 
  return request({
    url: '/api/User/ResetPassword',
    method: 'put',
    data: userdata
  })
} 
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
