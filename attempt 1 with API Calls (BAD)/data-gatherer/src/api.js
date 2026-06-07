import axios from "axios";
import { getAccessToken } from "./auth.js";
import { CONFIG } from "./config.js";

const BASE = "https://us.api.blizzard.com";

export async function apiGet(path) {
  const token = await getAccessToken();

  const res = await axios.get(`${BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      namespace: CONFIG.namespace,
      locale: CONFIG.locale
    }
  });

  return res.data;
}