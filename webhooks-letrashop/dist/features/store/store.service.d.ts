import { IStoreRequest } from "./interfaces";
import { Request } from "express";
declare class StoreService {
    redact(store_id: IStoreRequest, req: Request): Promise<{
        status: number;
        message: string;
    }>;
    authorize(body: {
        client_id: string;
        client_secret: string;
        grant_type: string;
        code: string;
    }, res: Request): Promise<{
        status: number;
        data: any;
    }>;
    products(): Promise<any>;
}
declare const _default: StoreService;
export default _default;
