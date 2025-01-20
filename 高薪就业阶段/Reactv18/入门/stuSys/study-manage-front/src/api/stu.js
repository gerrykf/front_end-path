import request from "./request";

export function getStuList() {
  return request({
    url: "students",
    method: "GET",
  });
}

export function getDetail(id) {
  return request({
    url: `students/${id}`,
    method: "GET",
  });
}
