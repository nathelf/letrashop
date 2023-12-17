"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firestore_1 = require("firebase/firestore");
const functions_1 = require("../../utils/functions");
const config_1 = require("../../config");
const storage_1 = require("firebase/storage");
const axios_1 = __importDefault(require("axios"));
class StoreService {
    redact(store_id, req) {
        return __awaiter(this, void 0, void 0, function* () {
            // Lida com a solicitação de redação aqui
            // Faz algo com os dados recebidos
            const hmacHeader = req.get("x-linkedstore-hmac-sha256");
            if (!hmacHeader) {
                throw new Error("HMAC header is missing");
            }
            const data = req.body;
            // verifica se o header é válido
            const hmacVerified = (0, functions_1.verifyWebhook)(data, hmacHeader);
            if (!hmacVerified) {
                throw new Error("HMAC verification failed");
            }
            // Lida com a solicitação de redação aqui
            // Faz algo com os dados recebidos
            // deleta o documento do firestore
            const db = (0, firestore_1.getFirestore)(config_1.firebase);
            const firebaseStore = (0, storage_1.getStorage)(config_1.firebase);
            const { docRef, filePath } = yield (0, firestore_1.getDoc)((0, firestore_1.doc)(db, `stores/${store_id}`))
                .then((document) => {
                return {
                    docRef: document.ref,
                    filePath: document.ref.path,
                };
            })
                .catch((error) => {
                throw new Error("error: the store: " + store_id + " does not exist");
            });
            const fileRef = (0, storage_1.ref)(firebaseStore, filePath);
            yield (0, storage_1.deleteObject)(fileRef).catch((error) => {
                throw new Error("error: the store: " + store_id + " does not exist");
            });
            // Responde com um status 200 para indicar que a solicitação foi recebida com sucesso
            return {
                status: 200,
                message: "success: the store: " + store_id + " was deleted",
            };
        });
    }
    authorize(body, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield axios_1.default
                    .post("https://www.nuvemshop.com.br/apps/authorize/token", Object.assign({}, body))
                    .then((response) => {
                    return response.data;
                })
                    .catch((error) => {
                    throw new Error(error.message);
                });
                return {
                    status: 200,
                    data,
                };
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    products() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield axios_1.default
                .get("https://api.nuvemshop.com.br/v1/3855430/products?per_page=200", {
                headers: {
                    Authentication: "bearer 1486b05f1169add8ab918d20d5da590c2f182c58",
                },
            })
                .catch((error) => {
                console.log(error);
                throw new Error(error.message);
            });
            return data;
        });
    }
}
exports.default = new StoreService();
