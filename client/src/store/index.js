"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
var redux_1 = require("redux");
var reducers_1 = __importDefault(require("./reducers"));
var redux_thunk_1 = __importDefault(require("redux-thunk"));
var redux_promise_1 = __importDefault(require("redux-promise"));
var composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux_1.compose;
exports.store = (0, redux_1.createStore)(reducers_1.default, composeEnhancer((0, redux_1.applyMiddleware)(redux_promise_1.default, redux_thunk_1.default)));
