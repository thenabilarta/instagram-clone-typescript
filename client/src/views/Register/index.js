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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var axios_1 = __importDefault(require("axios"));
var antd_1 = require("antd");
var loginlogo_png_1 = __importDefault(require("../../assets/loginlogo.png"));
var register_module_css_1 = __importDefault(require("./register.module.css"));
var env_1 = require("../../config/env");
var Login = function () {
    var _a = (0, react_1.useState)(false), isError = _a[0], setIsError = _a[1];
    var history = (0, react_router_dom_1.useNavigate)();
    var openNotificationWithIcon = function (type, msg, desc) {
        antd_1.notification[type]({
            message: msg,
            description: desc,
        });
    };
    var onSubmit = function (values) {
        var dataToSubmit = {
            username: values.username,
            email: values.email,
            password: values.password,
        };
        axios_1.default
            .post("".concat(env_1.REACTURL, "/api/users/register"), dataToSubmit)
            .then(function (res) {
            console.log(res.data);
            openNotificationWithIcon("success", "Success", "User has been created");
            history("/login");
        })
            .catch(function (err) {
            console.log(err);
            setIsError(true);
        });
    };
    var onFinishFailed = function (errorInfo) {
        console.log("Failed:", errorInfo);
    };
    return (<div className={register_module_css_1.default.loginWrapper}>
      <div className={register_module_css_1.default.loginBoxWrapper}>
        <div className={register_module_css_1.default.loginBox}>
          <div className={register_module_css_1.default.loginBoxHeader}>
            <img src={loginlogo_png_1.default} alt=""/>
          </div>
          <div>
            <div style={{ padding: "1rem 1.5rem 0.1rem 1.5rem" }}>
              {isError && (<antd_1.Alert style={{ marginBottom: "1.5rem" }} message="Username or Email already taken" type="error"/>)}
              <antd_1.Form layout="vertical" initialValues={{ remember: true }} onFinish={onSubmit} onFinishFailed={onFinishFailed}>
                <antd_1.Form.Item name="username" rules={[
            {
                required: true,
                message: "Please input your username!",
            },
        ]}>
                  <antd_1.Input size="large" placeholder="Username" style={{ height: 36 }}/>
                </antd_1.Form.Item>
                <antd_1.Form.Item name="email" rules={[
            {
                type: "email",
                message: "Please input a valid E-mail!",
            },
            {
                required: true,
                message: "Please input your email!",
            },
        ]}>
                  <antd_1.Input size="large" placeholder="Email" style={{ height: 36 }}/>
                </antd_1.Form.Item>
                <antd_1.Form.Item name="password" rules={[
            { required: true, message: "Please input your password!" },
        ]}>
                  <antd_1.Input.Password size="large" placeholder="Password" style={{ height: 36 }}/>
                </antd_1.Form.Item>
                <antd_1.Form.Item>
                  <antd_1.Row>
                    <antd_1.Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                      Submit
                    </antd_1.Button>
                  </antd_1.Row>
                </antd_1.Form.Item>
              </antd_1.Form>
            </div>
          </div>
        </div>
        <div className={register_module_css_1.default.registerBox}>
          Already have an account?{" "}
          <strong style={{
            cursor: "pointer",
        }} onClick={function () {
            history("/login");
        }}>
            Login
          </strong>
        </div>
      </div>
    </div>);
};
exports.default = Login;
