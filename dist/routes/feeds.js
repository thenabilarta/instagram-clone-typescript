"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = require("express");
const connection_1 = __importDefault(require("../config/connection"));
const moment_1 = __importDefault(require("moment"));
const multer_1 = __importDefault(require("multer"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "_" + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
router.get("/", auth_1.auth, (req, res) => {
    console.log("FFEEED");
    console.log(process.env.IMAGE_URL);
    const sqlQuery = `SELECT feeds.id, email, user_id, username, image_url, profilePictureSRC, caption, created_at FROM feeds LEFT JOIN users ON feeds.user_id=users.id GROUP BY feeds.id ORDER BY feeds.id DESC`;
    connection_1.default.query(sqlQuery, (err, data) => {
        const sqlQuery2 = `SELECT * FROM comments`;
        const sqlQuery3 = `SELECT * FROM likes`;
        connection_1.default.query(sqlQuery2, (err, data2) => {
            connection_1.default.query(sqlQuery3, (err, data3) => {
                const result = [];
                data.map((d) => {
                    const comments = [];
                    let likes = [];
                    data2.map((d2) => {
                        if (d.id === d2.post_id) {
                            comments.push(d2);
                        }
                    });
                    data3.map((d2) => {
                        if (d2.post_id === d.id) {
                            likes.push(d2.liked_by_user_id);
                        }
                    });
                    result.push(Object.assign(Object.assign({}, d), { comments, likes }));
                });
                if (err) {
                    res.send(err);
                }
                else {
                    res.send(result);
                }
            });
        });
    });
});
router.get("/:id", auth_1.auth, (req, res) => {
    const sqlQuery = `SELECT * FROM feeds WHERE user_id = ${req.params.id} ORDER BY feeds.id DESC`;
    connection_1.default.query(sqlQuery, (err, data) => {
        res.send(data);
    });
});
router.post("/", auth_1.auth, upload.single("files"), (req, res) => {
    const id = req.decode.id;
    const date = (0, moment_1.default)().unix();
    const caption = req.body.caption;
    const imageURL = `${process.env.IMAGE_URL}/uploads/` + req.file.filename;
    const sqlQuery = `INSERT INTO feeds (id, user_id, image_url, stored_as, caption, liked, comment_id, location, tags_id, created_at) VALUES (null, '${id}', '${imageURL}', '', '${caption}', 0, 0, '', 0, '${date}')`;
    connection_1.default.query(sqlQuery, (err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    });
});
router.get("/images", (req, res) => {
    const sqlQuery = `SELECT * FROM feeds`;
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
