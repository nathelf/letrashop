import { ICustomerDataRequest, ICustomerRedactRequest } from "./interfaces";
import { Request } from "express";
declare class CustomerServices {
    redact(customerRequest: ICustomerRedactRequest, req: Request): Promise<{
        status: number;
        message: string;
    }>;
    data_request(payload: ICustomerDataRequest, req: Request): Promise<{
        store_id: number;
        customer: {
            id: number;
            email: string;
            phone: string;
            identification: string;
        };
        orders_requested: number[];
        checkouts_requested: number[];
        drafts_orders_requested: number[];
        data_request: {
            id: number;
        };
        status: number;
    }>;
}
declare const _default: CustomerServices;
export default _default;
