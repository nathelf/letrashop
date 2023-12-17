import { NextFunction, Request, Response } from "express";
declare class StoreController {
    redact(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    authorize(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    products(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
}
declare const _default: StoreController;
export default _default;
