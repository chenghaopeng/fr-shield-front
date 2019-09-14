import request from "../utils/request";

export const login = (payload) => {
  return request("/session/login", {
    method: "POST",
    body: payload
  });
}

export const register = (payload) => {
  return request("/session/register", {
    method: "POST",
    body: payload
  });
}

export const logout = () => {
  return request("/session/logout", {
    method: "GET"
  });
}

export const password = (payload) => {
  return request("/user/password", {
    method: "POST",
    body: payload
  });
}

export const footprint = () => {
  return request("/user/footprint", {
    method: "GET"
  });
}

export const information = () => {
  return request("/information", {
    method: "GET"
  });
}

export const analysis = (stock) => {
  return request(`/analysis/${stock}`, {
    method: "GET"
  });
}

export const uploadMark = (payload) => {
  return request("/user/mark", {
    method: "POST",
    body: payload
  });
}

export const getMark = () => {
  return request("/user/mark", {
    method: "GET"
  });
}