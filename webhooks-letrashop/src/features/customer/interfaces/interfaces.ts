export interface ICustomerRequest {
  store_id: number;
  customer: {
    id: number;
    email: string;
    phone: string;
    identification: string;
  };
  orders_to_redact: number[];
}
