"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const connection_1 = __importDefault(require("../config/connection"));
const moment_1 = __importDefault(require("moment"));
const auth_1 = require("../middleware/auth");
const saltRounds = 10;
const router = (0, express_1.Router)();
router.post("/register", (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    let password = req.body.password;
    bcrypt_1.default.genSalt(saltRounds, function (err, salt) {
        if (err)
            return next(err);
        bcrypt_1.default.hash(password, salt, function (err, hash) {
            if (err)
                return next(err);
            const sqlQuery = `INSERT INTO users (id, username, profilePictureSRC, email, password) VALUES (null, '${username}', 'https://www.gravatar.com/avatar/${(0, moment_1.default)().unix()}?d=identicon','${email}', '${hash}')`;
            connection_1.default.query(sqlQuery, (err, data) => {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(data);
                }
            });
        });
    });
});
router.post("/login", (req, res) => {
    const username = req.body.username;
    let password = req.body.password;
    const sqlQuery = `SELECT * FROM users WHERE username = '${username}'`;
    connection_1.default.query(sqlQuery, (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            if (result.length > 0) {
                bcrypt_1.default.compare(password, result[0].password, function (err, isMatch) {
                    if (err)
                        console.log(err);
                    if (isMatch) {
                        const token = jsonwebtoken_1.default.sign({
                            id: result[0].id,
                            email: result[0].email,
                            username: result[0].username,
                            profilePic: result[0].profilePictureSRC,
                            status: "ok",
                            isLoggedIn: true,
                        }, "shhhhh");
                        res.cookie("token", token);
                        console.log(result);
                        res.send({
                            email: result[0].email,
                            username: result[0].username,
                            profilePic: result[0].profilePictureSRC,
                            status: "ok",
                            isLoggedIn: true,
                            token,
                        });
                    }
                    else {
                        res.status(403).send({
                            status: "Error",
                            message: "Username or password not found",
                        });
                    }
                });
            }
            else {
                res.status(403).send({
                    status: "Error",
                    message: "Username or password not found",
                });
            }
        }
    });
});
router.get("/auth", (req, res) => {
    const _token = req.get("authorization");
    const token = _token === null || _token === void 0 ? void 0 : _token.split(" ")[1];
    jsonwebtoken_1.default.verify(token, "shhhhh", function (err, decode) {
        if (!decode) {
            return res.json({
                isLoggedIn: false,
                role: "none",
            });
        }
        else {
            res.send(decode);
        }
    });
});
router.get("/", auth_1.auth, (req, res) => {
    const sqlQuery = `SELECT id, username, profilePictureSRC FROM users ORDER BY id DESC`;
    connection_1.default.query(sqlQuery, (err, data) => {
        if (err)
            console.log(err);
        res.send(data);
    });
});
router.get("/:id", auth_1.auth, (req, res) => {
    const params = req.params.id;
    const sqlQuery = `SELECT id, username, profilePictureSRC FROM users WHERE id = ${params}`;
    connection_1.default.query(sqlQuery, (err, data) => {
        if (err)
            console.log(err);
        res.send(data);
    });
});
exports.default = router;
