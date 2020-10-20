import request from '@/utils/request'
 
export function list(data) {
  return request({
    url: '/sysmodule/list',
    method: 'get',
    params:data
  })
}
export function alldata() {
  return request({
    url: '/sysmodule/alldata',
    method: 'get' 
  })
}
export function add(data) {
    return request({
      url: '/sysmodule/add',
      method: 'post',
      data:data
    })
  }

  export function update(data) {
    return request({
      url: '/sysmodule/update',
      method: 'post',
      data:data
    })
  }

  