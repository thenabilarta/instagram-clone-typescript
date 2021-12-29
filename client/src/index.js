"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var react_router_dom_1 = require("react-router-dom");
var App_1 = __importDefault(require("./App"));
require("antd/dist/antd.css");
var react_redux_1 = require("react-redux");
var store_1 = require("./store");
react_dom_1.default.render(<react_redux_1.Provider store={store_1.store}>
    <react_router_dom_1.BrowserRouter>
      <App_1.default />
    </react_router_dom_1.BrowserRouter>
  </react_redux_1.Provider>, document.getElementById("root"));
