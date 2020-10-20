import request from '@/utils/request'

//获取列表
export function agGetList() {
    return request({
        url: '/api/AdminGroup/GetList',
        method: 'get'
    })
}

//新增
export function agAdd(input) {
    return request({
        url: '/api/AdminGroup/Add',
        method: 'post',
        data:input
    })
}

//编辑
export function agEdit(input) { 
    return request({
        url: '/api/AdminGroup/Edit',
        method: 'put',
        data:input
    })
}

//删除
export function agDel(input) {
    return request({
        url: '/api/AdminGroup/Del',
        method: 'delete',
        data:input
    })
}