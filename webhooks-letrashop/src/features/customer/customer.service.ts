import { verifyWebhook } from "../../utils/functions";
import { ICustomerRequest } from "./interfaces";
import { Request } from "express";

class CustomerServices {
  redact(store_id: ICustomerRequest, req: Request) {
    // Lida com a solicitação de redação aqui
    // Faz algo com os dados recebidos

    const hmacHeader = req.get("x-linkedstore-hmac-sha256");

    if (!hmacHeader) {
      throw new Error("HMAC header is missing");
    }

    const data = req.body;

    // verifica se o header é válido
    const hmacVerified = verifyWebhook(data, hmacHeader);

    if (!hmacVerified) {
      throw new Error("HMAC verification failed");
    }

    // Lida com a solicitação de redação aqui
    // Faz algo com os dados recebidos

    // Responde com um status 200 para indicar que a solicitação foi recebida com sucesso
    return {
      status: 200,
      message: "store/redact request received",
    };
  }

  data_request(store_id: ICustomerRequest, req: Request) {
    // Lida com a solicitação de redação aqui
    // Faz algo com os dados recebidos

    const hmacHeader = req.get("x-linkedstore-hmac-sha256");

    if (!hmacHeader) {
      throw new Error("HMAC header is missing");
    }

    const data = req.body;

    // verifica se o header é válido
    const hmacVerified = verifyWebhook(data, hmacHeader);

    if (!hmacVerified) {
      throw new Error("HMAC verification failed");
    }

    // Lida com a solicitação de redação aqui
    // Faz algo com os dados recebidos

    // Responde com um status 200 para indicar que a solicitação foi recebida com sucesso
    return {
      status: 200,
      message: "store/redact request received",
    };
  }
}

export default new CustomerServices();
