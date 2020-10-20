import request from "@/utils/request";

export function getAnnoList(params) {
  return request({
    url: "/api/message/getAnnoList",
    method: "get",
    params: params
  });
}

export function getMessageList(params) {
  return request({
    url: "/api/message/getMessageList",
    method: "get",
    params: params
  });
}

export function getCnt() {
  return request({
    url: "/api/message/getCnt",
    method: "get"
  });
}

export function readAnno(data) {
  return request({
    url: "/api/message/readAnno",
    method: "post",
    data: data
  });
}

export function readMessage(data) {
  return request({
    url: "/api/message/readMessage",
    method: "post",
    data: data
  });
}
