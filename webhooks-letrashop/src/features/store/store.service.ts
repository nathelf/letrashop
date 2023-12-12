import { doc, getDoc, getFirestore } from "firebase/firestore";
import { verifyWebhook } from "../../utils/functions";
import { IStoreRequest } from "./interfaces";
import { Request } from "express";
import { firebase } from "../../config";
import { deleteObject, getStorage, ref } from "firebase/storage";

class StoreService {
  async redact(store_id: IStoreRequest, req: Request) {
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

    // deleta o documento do firestore

    const db = getFirestore(firebase);

    const firebaseStore = getStorage(firebase);

    const { docRef, filePath } = await getDoc(doc(db, `stores/${store_id}`))
      .then((document) => {
        return {
          docRef: document.ref,
          filePath: document.ref.path,
        };
      })
      .catch((error) => {
        throw new Error("error: the store: " + store_id + " does not exist");
      });

    const fileRef = ref(firebaseStore, filePath);

    await deleteObject(fileRef).catch((error) => {
      throw new Error("error: the store: " + store_id + " does not exist");
    });

    // Responde com um status 200 para indicar que a solicitação foi recebida com sucesso
    return {
      status: 200,
      message: "success: the store: " + store_id + " was deleted",
    };
  }
}

export default new StoreService();
