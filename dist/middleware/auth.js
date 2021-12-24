"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    const _token = req.get("authorization");
    const token = _token.split(" ")[1];
    jsonwebtoken_1.default.verify(token, "shhhhh", function (err, decode) {
        if (!decode) {
            return res.send({
                isLoggedIn: false,
                role: "none",
            });
        }
        req.token = token;
        req.decode = decode;
        next();
    });
};
exports.auth = auth;
