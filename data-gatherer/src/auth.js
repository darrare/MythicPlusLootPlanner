import axios from "axios";

let cachedToken = null;
let expiresAt = 0;

export async function getAccessToken() {
  const now = Date.now();
  if (cachedToken && now < expiresAt) return cachedToken;

  try {
    const res = await axios.post(
      "https://oauth.battle.net/token",
      new URLSearchParams({ grant_type: "client_credentials" }),
      {
        auth: {
          username: process.env.BNET_CLIENT_ID,
          password: process.env.BNET_CLIENT_SECRET
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );

    cachedToken = res.data.access_token;
    expiresAt = now + (res.data.expires_in - 30) * 1000;

    return cachedToken;
  }
  catch (err) {
    console.error("AUTH ERROR:");
    console.error("Status:", err.response?.status);
    console.error("Data:", err.response?.data);
    console.error("Message:", err.message);
    throw err;
  }
}