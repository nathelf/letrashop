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
const customer_service_1 = __importDefault(require("./customer.service"));
class StoreController {
    redact(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield customer_service_1.default.data_request(req.body.store_id, req);
                if (data.status !== 200) {
                    throw new Error("error: on delete the registers");
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    data_request(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield customer_service_1.default.data_request(req.body, req);
                if (data.status !== 200) {
                    throw new Error("error: on delete the registers");
                }
                return res.status(200).json(data);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new StoreController();
