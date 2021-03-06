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
    method: "POST",
    body: {}
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
    method: "POST",
    body: {}
  });
}

export const information = (payload) => {
  return request("/information", {
    method: "POST",
    body: payload
  });
}

export const analysis = (payload) => {
  return request("/analysis", {
    method: "POST",
    body: payload
  });
}

export const setMark = (payload) => {
  return request("/user/setmark", {
    method: "POST",
    body: payload
  });
}

export const getMark = () => {
  return request("/user/getmark", {
    method: "POST",
    body: {}
  });
}

export const emotion = (payload) => {
  return request("/emotion", {
    method: "POST",
    body: payload
  });
}