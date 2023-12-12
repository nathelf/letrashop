import { verifyWebhook } from "../../utils";
import { ICustomerDataRequest, ICustomerRedactRequest } from "./interfaces";
import { Request } from "express";
import { firebase } from "../../config";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
} from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";

class CustomerServices {
  async redact(customerRequest: ICustomerRedactRequest, req: Request) {
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

    const db = getFirestore(firebase);

    const firebaseStore = getStorage(firebase);

    const { docRef, filePath } = await getDoc(
      doc(
        db,
        `stores/${customerRequest.store_id}/customers/${customerRequest.customer.id}`
      )
    )
      .then((document) => {
        return {
          docRef: document.ref,
          filePath: document.ref.path,
        };
      })
      .catch((error) => {
        throw new Error(
          "error: the customer: " +
            customerRequest.customer.id +
            " does not exist"
        );
      });

    const fileRef = ref(firebaseStore, filePath);

    await deleteObject(fileRef)
      .then(async () => {
        await deleteDoc(docRef);
      })
      .catch((error) => {
        throw new Error("error: on delete the registers");
      });

    // Responde com um status 200 para indicar que a solicitação foi recebida com sucesso
    return {
      status: 200,
      message: "store data was deleted",
    };
  }

  async data_request(payload: ICustomerDataRequest, req: Request) {
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

    // Obtem o documento do cliente
    const db = await getFirestore(firebase);

    console.log(db.app.options);

    const customer: ICustomerDataRequest = await getDoc(
      doc(db, `stores/${payload.store_id}/customers/${payload.customer.id}`)
    )
      .then(async (document) => {
        return document.data() as ICustomerDataRequest;
      })
      .catch((error) => {
        console.log("here: ", error);

        throw new Error(
          "error: the customer: " +
            payload.customer.id +
            " does not exist in store: " +
            payload.store_id
        );
      });

    // Responde com um status 200 para indicar que a solicitação foi recebida com sucesso
    return {
      status: 200,
      ...customer,
    };
  }
}

export default new CustomerServices();
