import axios from "axios";
import crypto from "crypto";

/**
 * Verifica se o webhook é válido
 * @param data O corpo da solicitação
 * @param hmacHeader O cabeçalho HMAC
 * @returns {boolean} Se o webhook é válido
 **/
export function verifyWebhook(data: any, hmacHeader: any): boolean {
  console.log(hmacHeader);

  console.log(
    crypto
      .createHmac("sha256", process.env.REACT_APP_CLIENT_SECRET as string)
      .update(JSON.stringify(data))
      .digest("hex")
  );

  return (
    hmacHeader ===
    crypto
      .createHmac("sha256", process.env.REACT_APP_CLIENT_SECRET as string)
      .update(JSON.stringify(data))
      .digest("hex")
  );
}

export async function handleOAuth(authorizationCode: string) {
  try {
    const res = await axios.post(
      process.env.REACT_APP_TOKEN_ENDPOINT as string,
      {
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
        garant_type: "authorization_code",
        code: authorizationCode,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  } catch (error: any) {
    throw new Error(
      "Failed to exchange authorization code for access token: " + error.message
    );
  }
}
