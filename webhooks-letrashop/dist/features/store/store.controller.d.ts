import { NextFunction, Request, Response } from "express";
declare class StoreController {
    redact(req: Request, res: Response, next: NextFunction): Promise<void>;
}
declare const _default: StoreController;
export default _default;
