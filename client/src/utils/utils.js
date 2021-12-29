"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eraseCookie = exports.readCookie = void 0;
var readCookie = function (name) {
    var nameEQ = "".concat(name, "=");
    var ca = document.cookie.split(";");
    // eslint-disable-next-line no-plusplus
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === " ")
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
};
exports.readCookie = readCookie;
var eraseCookie = function (name) {
    document.cookie = "".concat(name, "=; Max-Age=-99999999;");
};
exports.eraseCookie = eraseCookie;
