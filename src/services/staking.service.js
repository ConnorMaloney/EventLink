import { axios } from "./axios.service";
export { stakeToHyperstakeContract } from "./web3.service";

export function getChallenge(username) {
  return axios
    .post("/getChallenge", { username })
    .then(r => r.data.challengeMessage);
}

export function verifyReceiver(username, message) {
  return axios.post("/verifyReceiver", { username, message });
}

export function initStaking(username) {
  return axios.post("/initStaking", { username }).then(r => r.data.contracts);
}
