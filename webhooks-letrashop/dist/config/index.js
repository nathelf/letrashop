"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebase = exports.AppRoutes = void 0;
var routes_1 = require("./routes");
Object.defineProperty(exports, "AppRoutes", { enumerable: true, get: function () { return __importDefault(routes_1).default; } });
var firebase_1 = require("./firebase");
Object.defineProperty(exports, "firebase", { enumerable: true, get: function () { return __importDefault(firebase_1).default; } });
