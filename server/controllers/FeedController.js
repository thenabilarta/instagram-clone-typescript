"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var decorators_1 = require("./decorators");
var auth_1 = require("../middleware/auth");
var moment_1 = __importDefault(require("moment"));
var connection_1 = __importDefault(require("../config/connection"));
var multer_1 = __importDefault(require("multer"));
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        var uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "_" + file.originalname);
    },
});
var upload = (0, multer_1.default)({ storage: storage });
var FeedController = /** @class */ (function () {
    function FeedController() {
    }
    FeedController.prototype.getImages = function (req, res) {
        var sqlQuery = "SELECT * FROM feeds";
        connection_1.default.query(sqlQuery, function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                res.send(data);
            }
        });
    };
    FeedController.prototype.getFeeds = function (req, res) {
        console.log("FFEEED");
        console.log(process.env.IMAGE_URL);
        var sqlQuery = "SELECT feeds.id, email, user_id, username, image_url, profilePictureSRC, caption, created_at FROM feeds LEFT JOIN users ON feeds.user_id=users.id GROUP BY feeds.id ORDER BY feeds.id DESC";
        connection_1.default.query(sqlQuery, function (err, data) {
            var sqlQuery2 = "SELECT * FROM comments";
            var sqlQuery3 = "SELECT * FROM likes";
            connection_1.default.query(sqlQuery2, function (err, data2) {
                connection_1.default.query(sqlQuery3, function (err, data3) {
                    var result = [];
                    data.map(function (d) {
                        var comments = [];
                        var likes = [];
                        data2.map(function (d2) {
                            if (d.id === d2.post_id) {
                                comments.push(d2);
                            }
                        });
                        data3.map(function (d2) {
                            if (d2.post_id === d.id) {
                                likes.push(d2.liked_by_user_id);
                            }
                        });
                        result.push(__assign(__assign({}, d), { comments: comments, likes: likes }));
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
    };
    FeedController.prototype.getFeed = function (req, res) {
        var sqlQuery = "SELECT * FROM feeds WHERE user_id = ".concat(req.params.id, " ORDER BY feeds.id DESC");
        connection_1.default.query(sqlQuery, function (err, data) {
            res.send(data);
        });
    };
    FeedController.prototype.feed = function (req, res) {
        var id = req.decode.id;
        var date = (0, moment_1.default)().unix();
        var caption = req.body.caption;
        var imageURL = "".concat(process.env.IMAGE_URL, "/uploads/") + req.file.filename;
        var sqlQuery = "INSERT INTO feeds (id, user_id, image_url, stored_as, caption, liked, comment_id, location, tags_id, created_at) VALUES (null, '".concat(id, "', '").concat(imageURL, "', '', '").concat(caption, "', 0, 0, '', 0, '").concat(date, "')");
        connection_1.default.query(sqlQuery, function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                res.send(data);
            }
        });
    };
    __decorate([
        (0, decorators_1.get)("/images"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], FeedController.prototype, "getImages", null);
    __decorate([
        (0, decorators_1.get)("/"),
        (0, decorators_1.use)(auth_1.auth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], FeedController.prototype, "getFeeds", null);
    __decorate([
        (0, decorators_1.get)("/:id"),
        (0, decorators_1.use)(auth_1.auth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], FeedController.prototype, "getFeed", null);
    __decorate([
        (0, decorators_1.post)("/"),
        (0, decorators_1.use)(auth_1.auth),
        (0, decorators_1.use)(upload.single("files")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], FeedController.prototype, "feed", null);
    FeedController = __decorate([
        (0, decorators_1.controller)("/api/feeds")
    ], FeedController);
    return FeedController;
}());
