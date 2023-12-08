import { NextFunction, Request, Response } from "express";
import storeService from "./customer.service";

class StoreController {
  async redact(req: Request, res: Response, next: NextFunction) {
    try {
      const data = storeService.data_request(req.body.store_id, req);

      if (data.status !== 200) {
        throw new Error(data.message);
      }
    } catch (error) {
      next(error);
    }
  }

  async data_request(req: Request, res: Response, next: NextFunction) {
    try {
      const data = storeService.data_request(req.body.store_id, req);

      if (data.status !== 200) {
        throw new Error(data.message);
      }
    } catch (error) {
      next(error);
    }
  }
}

export default new StoreController();
