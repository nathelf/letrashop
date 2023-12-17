import { Router } from "express";
import { storeController } from "../features/store";
import { customerController } from "../features/customer";

const routes = Router();

routes.get("/store/redact", storeController.redact);
routes.get("/customers/redact", customerController.redact);
routes.get("/customers/data_request", customerController.data_request);

routes.post("/app/authorize", storeController.authorize);

routes.get("/products", storeController.products);

export default routes;
