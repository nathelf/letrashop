import { NextFunction, Request, Response } from "express";
import storeService from "./store.service";

import axios from "axios";

class StoreController {
  async redact(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await storeService.redact(req.body.store_id, req);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async authorize(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await storeService.authorize(req.body, req);

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async products(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await storeService.products();

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

export default new StoreController();
