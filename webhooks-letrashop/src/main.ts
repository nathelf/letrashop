import express from "express";

import dotenv from "dotenv";

import path from "path";
import morgan from "morgan";
import { AppRoutes } from "./config";
import bodyParser from "body-parser";

const port = process.env.PORT || 7200;
const app = express();

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(AppRoutes);
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
