import { useContext } from "react";
import axios from "../lib/axios";

export default async function TokenVerification(req) {
  const checkTokenURL = "/api/verifyToken";
  const cookies = req.cookies.refresh_jwt;
  try {
    const result = await axios.get(checkTokenURL, {
      withCredentials: true,
      headers: {
        cookies: cookies,
      },
    });

    return result;
  } catch (err) {
    console.log(`Token Error: ${err.response.data}`);
    return 401;
  }
}
