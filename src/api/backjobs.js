import request from '@/utils/request'

export function getjoblist() {
    return request({
        url: '/QuaztTasks/GetList',
        method: 'get'
    })
}
export function gotCount() {
    return request({
        url: '/QuaztTasks/GotCount',
        method: 'get'
    })
}
export function editjob(inputdto){
    return request({
        url: '/QuaztTasks/EditJob',
        method: 'post' ,
        params:inputdto
    })
}

export function updjob(taskdto) {
    return request({
        url: '/QuaztTasks/EditJob',
        method: 'post',
        data: taskdto
    })
}

export function startjob(taskdto) {
    return request({
        url: '/QuaztTasks/StartNow',
        method: 'post',
        data: taskdto
    })
}

export function restartall() {
    return request({
        url: '/QuaztTasks/ReStart',
        method: 'post' 
    })
}


//启动手动抓取数据
export function startIme(inputBody) {
    return request({
        url: '/QuaztTasks/StartIme',
        method: 'post', 
        data: inputBody
    })
} 

export function wechatDataCrawler(sdate,edate,inputBody,isUpdate) { 
    return request({
        url: '/QuaztTasks/WechatDataCrawler',
        method: 'post', 
        data: inputBody,
        params:{sdate:sdate,edate:edate,isUpdate:isUpdate}
    })
} 
