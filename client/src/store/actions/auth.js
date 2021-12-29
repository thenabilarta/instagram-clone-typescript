"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.logoutUser = exports.loginUser = void 0;
var axios_1 = __importDefault(require("axios"));
var types_1 = require("../types");
var utils_1 = require("../../utils/utils");
var env_1 = require("../../config/env");
var loginUser = function (dataToSubmit) {
    var request = axios_1.default
        .post("".concat(env_1.REACTURL, "/api/users/login"), dataToSubmit, {
        withCredentials: true,
    })
        .then(function (res) { return res.data; });
    return {
        type: types_1.LOGIN_USER,
        payload: request,
    };
};
exports.loginUser = loginUser;
var logoutUser = function () {
    (0, utils_1.eraseCookie)("token");
    return {
        type: types_1.LOGOUT_USER,
    };
};
exports.logoutUser = logoutUser;
var auth = function () {
    var request = axios_1.default
        .get("".concat(env_1.REACTURL, "/api/users/auth"), {
        headers: {
            Authorization: "Bearer ".concat((0, utils_1.readCookie)("token")),
        },
    })
        .then(function (response) { return response.data; })
        .catch(function (error) {
        console.log(error.response);
    });
    return {
        type: types_1.AUTH_USER,
        payload: request,
    };
};
exports.auth = auth;
