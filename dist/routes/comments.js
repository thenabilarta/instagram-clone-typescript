"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const connection_1 = __importDefault(require("../config/connection"));
const moment_1 = __importDefault(require("moment"));
const auth_1 = require("../middleware/auth");
router.get("/", auth_1.auth, (req, res) => {
    const sqlQuery = `SELECT feeds.id, email, user_id, username, image_url, profilePictureSRC, caption, created_at FROM feeds LEFT JOIN users ON feeds.user_id=users.id ORDER BY feeds.id DESC`;
    connection_1.default.query(sqlQuery, (err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    });
});
router.post("/", auth_1.auth, (req, res) => {
    console.log(req.body);
    const id = req.decode.id;
    const username = req.decode.username;
    const post_id = req.body.post_id;
    const text = req.body.text;
    const date = (0, moment_1.default)().unix();
    const sqlQuery = `INSERT INTO comments (id, user_id, post_id, text, username, created_at) VALUES (null, '${id}', '${post_id}', '${text}', '${username}', '${date}')`;
    connection_1.default.query(sqlQuery, (err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    });
});
exports.default = router;
