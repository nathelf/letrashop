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
exports.handleOAuth = exports.verifyWebhook = void 0;
const axios_1 = __importDefault(require("axios"));
const crypto_1 = __importDefault(require("crypto"));
/**
 * Verifica se o webhook é válido
 * @param data O corpo da solicitação
 * @param hmacHeader O cabeçalho HMAC
 * @returns {boolean} Se o webhook é válido
 **/
function verifyWebhook(data, hmacHeader) {
    console.log(hmacHeader);
    console.log(crypto_1.default
        .createHmac("sha256", process.env.REACT_APP_CLIENT_SECRET)
        .update(JSON.stringify(data))
        .digest("hex"));
    return (hmacHeader ===
        crypto_1.default
            .createHmac("sha256", process.env.REACT_APP_CLIENT_SECRET)
            .update(JSON.stringify(data))
            .digest("hex"));
}
exports.verifyWebhook = verifyWebhook;
function handleOAuth(authorizationCode) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield axios_1.default.post(process.env.REACT_APP_TOKEN_ENDPOINT, {
                client_id: process.env.REACT_APP_CLIENT_ID,
                client_secret: process.env.REACT_APP_CLIENT_SECRET,
                garant_type: "authorization_code",
                code: authorizationCode,
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return res.data;
        }
        catch (error) {
            throw new Error("Failed to exchange authorization code for access token: " + error.message);
        }
    });
}
exports.handleOAuth = handleOAuth;
