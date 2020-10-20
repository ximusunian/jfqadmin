import request from "@/utils/request";

export function getCompany(params) {
  return request({
    url: "/api/company/get",
    method: "get",
    params: params
  });
}

export function getCompanyHisLog(params) {
  return request({
    url: "/api/company/getHisLog",
    method: "get",
    params: params
  });
}

export function createCompany(data) {
  return request({
    url: "/api/company/create",
    method: "post",
    data: data
  });
}

export function updateCompany(data) {
  return request({
    url: "/api/company/update",
    method: "put",
    data: data
  });
}

export function getOrgImg() {
  return request({
    url: "/api/department/getOrgImg",
    method: "get"
  });
}

export function getListLegal(params) {
  return request({
    url: "/api/legal/getList",
    method: "get",
    params: params
  });
}

export function getLegal(params) {
  return request({
    url: "/api/legal/get",
    method: "get",
    params: params
  });
}

export function createLegal(data) {
  return request({
    url: "/api/legal/create",
    method: "post",
    data: data
  });
}

export function updateLegal(data) {
  return request({
    url: "/api/legal/update",
    method: "put",
    data: data
  });
}

export function deleteLegal(params) {
  return request({
    url: "/api/legal/delete",
    method: "delete",
    params: params
  });
}

export function getTreeData(params) {
  return request({
    url: "/api/department/getTreeData",
    method: "get",
    params: params
  });
}

export function getDepartment(params) {
  return request({
    url: "/api/department/get",
    method: "get",
    params: params
  });
}

export function createDepartment(data) {
  return request({
    url: "/api/department/create",
    method: "post",
    data: data
  });
}

export function updateDepartment(data) {
  return request({
    url: "/api/department/update",
    method: "put",
    data: data
  });
}

export function deleteDepartment(params) {
  return request({
    url: "/api/department/delete",
    method: "delete",
    params: params
  });
}

export function getListPosition(params) {
  return request({
    url: "/api/position/getList",
    method: "get",
    params: params
  });
}

export function getPosition(params) {
  return request({
    url: "/api/position/get",
    method: "get",
    params: params
  });
}

export function createPosition(data) {
  return request({
    url: "/api/position/create",
    method: "post",
    data: data
  });
}

export function updatePosition(data) {
  return request({
    url: "/api/position/update",
    method: "put",
    data: data
  });
}

export function deletePosition(params) {
  return request({
    url: "/api/position/delete",
    method: "delete",
    params: params
  });
}

export function getListPositionType() {
  return request({
    url: "/api/positionType/getList",
    method: "get"
  });
}

export function getPositionType(params) {
  return request({
    url: "/api/positionType/get",
    method: "get",
    params: params
  });
}

export function createPositionType(data) {
  return request({
    url: "/api/positionType/create",
    method: "post",
    data: data
  });
}

export function updatePositionType(data) {
  return request({
    url: "/api/positionType/update",
    method: "put",
    data: data
  });
}

export function deletePositionType(params) {
  return request({
    url: "/api/positionType/delete",
    method: "delete",
    params: params
  });
}

export function getListPositionLevel(params) {
  return request({
    url: "/api/positionLevel/getList",
    method: "get",
    params: params
  });
}

export function getPositionLevel(params) {
  return request({
    url: "/api/positionLevel/get",
    method: "get",
    params: params
  });
}

export function createPositionLevel(data) {
  return request({
    url: "/api/positionLevel/create",
    method: "post",
    data: data
  });
}

export function updatePositionLevel(data) {
  return request({
    url: "/api/positionLevel/update",
    method: "put",
    data: data
  });
}

export function deletePositionLevel(params) {
  return request({
    url: "/api/positionLevel/delete",
    method: "delete",
    params: params
  });
}
