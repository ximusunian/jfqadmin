import request from "@/utils/request";

export function getAdminSelectList() {
  return request({
    url: "/api/combobox/GetAdminSelectList",
    method: "get"
  });
}

export function getDepartmentSelectList() {
  return request({
    url: "/api/combobox/GetDepartmentSelectList",
    method: "get"
  });
}

export function getLegalSelect(params) {
  return request({
    url: "/api/combobox/getLegals",
    method: "get",
    params: params
  });
}

export function getPositionSelect(params) {
  return request({
    url: "/api/combobox/getPositions",
    method: "get",
    params: params
  });
}

export function getPositionTypeSelect(params) {
  return request({
    url: "/api/combobox/getPositionTypes",
    method: "get",
    params: params
  });
}

export function getPositionLevelSelect(params) {
  return request({
    url: "/api/combobox/getPositionLevels",
    method: "get",
    params: params
  });
}

export function getCompanyHisLogSelect() {
  return request({
    url: "/api/combobox/getCompanyHisLog",
    method: "get"
  });
}

// 微信账号 Start

// 获取账号下拉列表
export function getWxAccountSelectList(input) {
  return request({
      url: '/api/combobox/SelectPub',
      method: 'get',
      params: input
  })
}

// 获取账号分组下拉列表
export function getWxAccountGroupList(input) {
  return request({
      url: '/api/combobox/SelectPubGroup',
      method: 'get',
      params: input
  })
}

// 标签下拉
export function getSelectTags() {
  return request({
    url: "/api/combobox/SelectTags",
    method: "get"
  });
}

// 微信账号 End