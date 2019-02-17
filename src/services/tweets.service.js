import { axios } from "./axios.service";
export function getTweets() {
  return axios.get("/tweets").then(res => res.data.result);
}
