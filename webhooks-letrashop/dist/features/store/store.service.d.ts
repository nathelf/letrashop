import { IStoreRequest } from "./interfaces";
import { Request } from "express";
declare class StoreService {
    redact(store_id: IStoreRequest, req: Request): Promise<{
        status: number;
        message: string;
    }>;
}
declare const _default: StoreService;
export default _default;
