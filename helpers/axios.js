import axios from "axios";

export const get = (url, data) =>
  axios({
    method: "get",
    url: process.env.SATELITE_URL + url,
    data,
  });

export const post = (url, data) =>
  axios({
    method: "post",
    url: process.env.SATELITE_URL + url,
    data,
  });
