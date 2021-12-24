"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const connection_1 = __importDefault(require("../config/connection"));
const moment_1 = __importDefault(require("moment"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post("/", auth_1.auth, (req, res) => {
    console.log(req.body);
    const feed_id = req.body.feed_id;
    const user_id = req.body.user_id;
    const owner = req.body.owner;
    const date = (0, moment_1.default)().unix();
    const checkIfExistQuery = `SELECT * FROM likes WHERE post_id = ${feed_id} AND liked_by_user_id = ${user_id}`;
    connection_1.default.query(checkIfExistQuery, (err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            if (data.length === 1) {
                res.send({
                    status: "error",
                    message: "Double like",
                });
            }
            else {
                const sqlQuery = `INSERT INTO likes (id, post_id, user_id, liked_by_user_id, date) VALUES (null, '${feed_id}', '${owner}', '${user_id}', '${date}')`;
                connection_1.default.query(sqlQuery, (err, data) => {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.send(data);
                    }
                });
            }
        }
    });
});
router.post("/unlike", auth_1.auth, (req, res) => {
    console.log(req.body);
    const feed_id = req.body.feed_id;
    const user_id = req.body.user_id;
    const checkIfExistQuery = `DELETE FROM likes WHERE post_id = ${feed_id} AND liked_by_user_id = ${user_id}`;
    connection_1.default.query(checkIfExistQuery, (err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    });
});
exports.default = router;
