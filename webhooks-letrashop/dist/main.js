"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = require("./config");
const body_parser_1 = __importDefault(require("body-parser"));
const port = process.env.PORT || 7200;
const app = (0, express_1.default)();
app.use((0, morgan_1.default)(":method :url :status :res[content-length] - :response-time ms"));
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.use(body_parser_1.default.json());
app.use(config_1.AppRoutes);
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
