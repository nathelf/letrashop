import { NextFunction, Request, Response } from "express";
import storeService from "./customer.service";

class StoreController {
  async redact(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await storeService.data_request(req.body.store_id, req);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async data_request(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await storeService.data_request(req.body, req);

      if (data.status !== 200) {
        throw new Error("error: on delete the registers");
      }

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

export default new StoreController();
