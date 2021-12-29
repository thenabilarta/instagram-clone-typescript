"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var react_router_1 = require("react-router");
var auth_1 = require("../store/actions/auth");
// eslint-disable-next-line func-names
function default_1(ComposedClass, loading, setLoading) {
    var history = (0, react_router_1.useNavigate)();
    function AuthenticationCheck() {
        var dispatch = (0, react_redux_1.useDispatch)();
        (0, react_1.useEffect)(function () {
            var isMounted = true;
            if (isMounted) {
                dispatch((0, auth_1.auth)()).then(function (res) {
                    if (!res.payload.isLoggedIn) {
                        history("/login");
                    }
                });
            }
            return function () {
                isMounted = false;
            };
        }, []);
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <ComposedClass loading={loading} setLoading={setLoading}/>;
    }
    return AuthenticationCheck();
}
exports.default = default_1;
