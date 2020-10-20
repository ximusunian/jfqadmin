import request from '@/utils/request'

export function getrolebyuser(userid) {
  return request({
    url: '/api/Role/GetRoleByUser',
    method: 'get',
    params: userid
  })
}

export function getrolelist(inputdata) {
  return request({
    url: '/api/Role/GetRoleList',
    method: 'get',
    params: inputdata
  })
}

export function addrole(inputdata) {
  return request({
    url: '/api/Role/AddRole',
    method: 'post',
    data: inputdata
  })
}

export function modifyrole(input) {

  return request({
    url: '/api/Role/ModifyRole',
    method: 'put',
    data: input
  })
}

export function deleterole(roleids) {
  return request({
    url: '/api/Role/DeleteRole',
    method: 'delete',
    data: roleids
  })
}

export function getpermissions(inputdata)
{
  return request({
    url:'api/Permission/GetList',
    method:'get',
    params:inputdata
  });
}
export function savepermission(queryparam,inputdata) {
  return request({
    url: '/api/Permission/PutPermission',
    method: 'put', 
    params:queryparam,
    data: inputdata
  })
}
