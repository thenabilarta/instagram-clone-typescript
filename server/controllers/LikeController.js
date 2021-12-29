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
    CommentController.prototype.like = function (req, res) {
        console.log(req.body);
        var feed_id = req.body.feed_id;
        var user_id = req.body.user_id;
        var owner = req.body.owner;
        var date = (0, moment_1.default)().unix();
        var checkIfExistQuery = "SELECT * FROM likes WHERE post_id = ".concat(feed_id, " AND liked_by_user_id = ").concat(user_id);
        connection_1.default.query(checkIfExistQuery, function (err, data) {
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
                    var sqlQuery = "INSERT INTO likes (id, post_id, user_id, liked_by_user_id, date) VALUES (null, '".concat(feed_id, "', '").concat(owner, "', '").concat(user_id, "', '").concat(date, "')");
                    connection_1.default.query(sqlQuery, function (err, data) {
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
    };
    CommentController.prototype.unlike = function (req, res) {
        console.log(req.body);
        var feed_id = req.body.feed_id;
        var user_id = req.body.user_id;
        var checkIfExistQuery = "DELETE FROM likes WHERE post_id = ".concat(feed_id, " AND liked_by_user_id = ").concat(user_id);
        connection_1.default.query(checkIfExistQuery, function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                res.send(data);
            }
        });
    };
    __decorate([
        (0, decorators_1.post)("/"),
        (0, decorators_1.use)(auth_1.auth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CommentController.prototype, "like", null);
    __decorate([
        (0, decorators_1.post)("/"),
        (0, decorators_1.use)(auth_1.auth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], CommentController.prototype, "unlike", null);
    CommentController = __decorate([
        (0, decorators_1.controller)("/api/likes")
    ], CommentController);
    return CommentController;
}());
