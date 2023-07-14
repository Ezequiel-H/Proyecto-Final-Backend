import axios from "axios";
import querystring from "querystring";

export const get = (url, data) =>
  axios.get(process.env.SATELITE_URL + url, data);

export const post = (url, data) =>
  axios.post(process.env.SATELITE_URL + url, querystring.stringify(data));
