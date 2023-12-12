import { NextFunction, Request, Response } from "express";
import storeService from "./store.service";

class StoreController {
  async redact(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await storeService.redact(req.body.store_id, req);

      if (data.status !== 200) {
        throw new Error(data.message);
      }
    } catch (error) {
      next(error);
    }
  }
}

export default new StoreController();
