import _axios from "axios";
const BASE_URL = "https://acceeda9.ngrok.io/";

export const axios = _axios.create({ timeout: 5000, baseURL: BASE_URL });
