import request from '@/utils/request'
 
export function list(data) {
  return request({
    url: '/setting/list',
    method: 'get',
    params:data
  })
}

export function add(data) {
    return request({
      url: '/setting/add',
      method: 'post',
      data:data
    })
  }

  export function update(data) {
    return request({
      url: '/setting/update',
      method: 'post',
      data:data
    })
  }