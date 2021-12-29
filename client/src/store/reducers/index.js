"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var auth_1 = __importDefault(require("./auth"));
var RootReducer = (0, redux_1.combineReducers)({
    auth: auth_1.default,
});
exports.default = RootReducer;
