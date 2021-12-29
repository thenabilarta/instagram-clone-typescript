"use strict";
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
var decorators_1 = require("./decorators");
var auth_1 = require("../middleware/auth");
var moment_1 = __importDefault(require("moment"));
var connection_1 = __importDefault(require("../config/connection"));
var CommentController = /** @class */ (function () {
    function CommentController() {
    }
    CommentController.prototype.getComments = function (req, res) {
        var sqlQuery = "SELECT feeds.id, email, user_id, username, image_url, profilePictureSRC, caption, created_at FROM feeds LEFT JOIN users ON feeds.user_id=users.id ORDER BY feeds.id DESC";
        connection_1.default.query(sqlQuery, function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                res.send(data);
            }
        });
    };
    CommentController.prototype.comments = function (req, res) {
        console.log(req.body);
        var id = req.decode.id;
        var username = req.decode.username;
        var post_id = req.body.post_id;
        var text = req.body.text;
        var date = (0, moment_1.default)().unix();
        var sqlQuery = "INSERT INTO comments (id, user_id, post_id, text, username, created_at) VALUES (null, '".concat(id, "', '").concat(post_id, "', '").concat(text, "', '").concat(username, "', '").concat(date, "')");
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
        (0, decorators_1.get)("/"),
        (0, decorators_1.use)(auth_1.auth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CommentController.prototype, "getComments", null);
    __decorate([
        (0, decorators_1.post)("/"),
        (0, decorators_1.use)(auth_1.auth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CommentController.prototype, "comments", null);
    CommentController = __decorate([
        (0, decorators_1.controller)("/api/comments")
    ], CommentController);
    return CommentController;
}());
