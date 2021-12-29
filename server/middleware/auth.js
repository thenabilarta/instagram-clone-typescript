"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var auth = function (req, res, next) {
    var _token = req.get("authorization");
    var token;
    try {
        token = _token.split(" ")[1];
    }
    catch (error) {
        res.send("Token error");
        return;
    }
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
