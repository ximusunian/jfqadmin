import request from '@/utils/request'

export function getdatarolebyuser(userid) {  
  return request({
    url: '/api/DataRole/GetRoleByUser',
    method: 'get',
    params:{userid}
  })
}

export function getalldataroles() { 
  return request({
    url: '/api/DataRole/GetAllDataRoles',
    method: 'get' 
  })
}

export function getrolelist(inputdata) {
  return request({
    url: '/api/DataRole/GetRoleList',
    method: 'get',
    params: inputdata
  })
}

export function getrolemodulepermission(roleId,sysModuleId){
  return request({
    url:'/api/DataRole/GetPermissions',
    method:'get',
    params:{roleId:roleId,sysModuleId:sysModuleId}
  })
}

export function updateuserdatarole(userid,items){
  return request({
    url:'/api/DataRole/UpdateUserDataRole',
    method:'post',
    params:userid,
    data:items
  });
}

export function addrole(inputdata) {
  return request({
    url: '/api/DataRole/AddRole',
    method: 'post',
    data: inputdata
  })
}

export function modifyrole(input) {

  return request({
    url: '/api/DataRole/ModifyRole',
    method: 'post',
    data: input
  })
}

export function deleterole(roleids) {
  return request({
    url: '/api/DataRole/DeleteRole',
    method: 'post',
    data: roleids
  })
}

// export function getpermissions(inputdata)
// {
//   return request({
//     url:'api/Permission/GetList',
//     method:'get',
//     params:inputdata
//   });
// }
export function savepermission(roleid,inputdata) {
  return request({
    url: '/api/DataRole/SavePermissions',
    method: 'put',
    params:roleid,
    data: inputdata
  })
}
