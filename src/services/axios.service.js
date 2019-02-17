import _axios from "axios";
const BASE_URL = "https://db2898aa.ngrok.io/";

export const axios = _axios.create({ timeout: 500000, baseURL: BASE_URL });
