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
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../types");
var initialState = {
    isLoggedIn: false,
    role: "none",
};
var Reducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case types_1.AUTH_USER:
            return __assign(__assign({}, state), action.payload);
        case types_1.LOGIN_USER:
            return action.payload;
        case types_1.LOGOUT_USER:
            return initialState;
        default:
            return state;
    }
};
exports.default = Reducer;
