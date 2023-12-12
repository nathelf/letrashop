export interface ICustomerRedactRequest {
    store_id: number;
    customer: {
        id: number;
        email: string;
        phone: string;
        identification: string;
    };
    orders_to_redact: number[];
}
export interface ICustomerDataRequest {
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
}
