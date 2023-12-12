import { NextFunction, Request, Response } from "express";
declare class StoreController {
    redact(req: Request, res: Response, next: NextFunction): Promise<void>;
    data_request(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
}
declare const _default: StoreController;
export default _default;
