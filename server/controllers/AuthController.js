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
var bcrypt_1 = __importDefault(require("bcrypt"));
var moment_1 = __importDefault(require("moment"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var decorators_1 = require("./decorators");
var auth_1 = require("../middleware/auth");
var connection_1 = __importDefault(require("../config/connection"));
var saltRounds = 10;
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.prototype.register = function (req, res, next) {
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
        bcrypt_1.default.genSalt(saltRounds, function (err, salt) {
            if (err)
                return next(err);
            bcrypt_1.default.hash(password, salt, function (err, hash) {
                if (err)
                    return next(err);
                var sqlQuery = "INSERT INTO users (id, username, profilePictureSRC, email, password) VALUES (null, '".concat(username, "', 'https://www.gravatar.com/avatar/").concat((0, moment_1.default)().unix(), "?d=identicon','").concat(email, "', '").concat(hash, "')");
                connection_1.default.query(sqlQuery, function (err, data) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.send(data);
                    }
                });
            });
        });
    };
    AuthController.prototype.getLogin = function (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var sqlQuery = "SELECT * FROM users WHERE username = '".concat(username, "'");
        connection_1.default.query(sqlQuery, function (err, result) {
            if (err) {
                res.send(err);
            }
            else {
                if (result.length > 0) {
                    bcrypt_1.default.compare(password, result[0].password, function (err, isMatch) {
                        if (err)
                            console.log(err);
                        if (isMatch) {
                            var token = jsonwebtoken_1.default.sign({
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
                                token: token,
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
    };
    AuthController.prototype.getAuth = function (req, res) {
        var _token = req.get("authorization");
        var token = _token === null || _token === void 0 ? void 0 : _token.split(" ")[1];
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
    };
    AuthController.prototype.getUsers = function (req, res) {
        var sqlQuery = "SELECT id, username, profilePictureSRC FROM users ORDER BY id DESC";
        connection_1.default.query(sqlQuery, function (err, data) {
            if (err)
                console.log(err);
            res.send(data);
        });
    };
    AuthController.prototype.getUser = function (req, res) {
        var params = req.params.id;
        var sqlQuery = "SELECT id, username, profilePictureSRC FROM users WHERE id = ".concat(params);
        connection_1.default.query(sqlQuery, function (err, data) {
            if (err)
                console.log(err);
            res.send(data);
        });
    };
    __decorate([
        (0, decorators_1.post)("/register"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", void 0)
    ], AuthController.prototype, "register", null);
    __decorate([
        (0, decorators_1.post)("/login"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], AuthController.prototype, "getLogin", null);
    __decorate([
        (0, decorators_1.get)("/auth"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], AuthController.prototype, "getAuth", null);
    __decorate([
        (0, decorators_1.get)("/"),
        (0, decorators_1.use)(auth_1.auth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], AuthController.prototype, "getUsers", null);
    __decorate([
        (0, decorators_1.get)("/:id"),
        (0, decorators_1.use)(auth_1.auth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], AuthController.prototype, "getUser", null);
    AuthController = __decorate([
        (0, decorators_1.controller)("/api/users")
    ], AuthController);
    return AuthController;
}());
