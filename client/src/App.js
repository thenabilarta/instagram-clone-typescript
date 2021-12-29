"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable react-hooks/exhaustive-deps */
var react_router_dom_1 = require("react-router-dom");
var Dashboard_1 = __importDefault(require("./views/Dashboard"));
var Message_1 = __importDefault(require("./views/Message"));
var Create_1 = __importDefault(require("./views/Create"));
var Profile_1 = __importDefault(require("./views/Profile"));
var OtherProfile_1 = __importDefault(require("./views/OtherProfile"));
var Login_1 = __importDefault(require("./views/Login"));
var Register_1 = __importDefault(require("./views/Register"));
var auth_1 = __importDefault(require("./hoc/auth"));
require("./app.css");
function App() {
    return (<div className="App">
      <react_router_dom_1.Routes>
        <react_router_dom_1.Route path="/message" element={(0, auth_1.default)(Message_1.default, null, false)}/>
        <react_router_dom_1.Route path="/create" element={(0, auth_1.default)(Create_1.default, null, false)}/>
        <react_router_dom_1.Route path="/profile/:id" element={(0, auth_1.default)(OtherProfile_1.default, null, false)}/>
        <react_router_dom_1.Route path="/profile" element={(0, auth_1.default)(Profile_1.default, null, false)}/>
        <react_router_dom_1.Route path="/" element={(0, auth_1.default)(Dashboard_1.default, null, false)}/>
        <react_router_dom_1.Route path="/login" element={(0, auth_1.default)(Login_1.default, null, false)}/>
        <react_router_dom_1.Route path="/register" element={(0, Register_1.default)()}/>
      </react_router_dom_1.Routes>
    </div>);
}
exports.default = App;
