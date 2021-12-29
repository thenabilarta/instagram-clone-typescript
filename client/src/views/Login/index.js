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
var antd_1 = require("antd");
var react_redux_1 = require("react-redux");
var instagramloginbanner_png_1 = __importDefault(require("../../assets/instagramloginbanner.png"));
var loginlogo_png_1 = __importDefault(require("../../assets/loginlogo.png"));
var login_module_css_1 = __importDefault(require("./login.module.css"));
var auth_1 = require("../../store/actions/auth");
var Login = function () {
    var _a = (0, react_1.useState)(false), isError = _a[0], setIsError = _a[1];
    var _b = (0, react_1.useState)(0), imageListCounter = _b[0], setImageListCounter = _b[1];
    var _c = (0, react_1.useState)(false), mobileMode = _c[0], setMobileMode = _c[1];
    var auth = (0, react_redux_1.useSelector)(function (state) { return state.auth; });
    var history = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(function () {
        if (auth.isLoggedIn) {
            history("/");
        }
    }, [auth.isLoggedIn, history]);
    console.log(auth);
    var dispatch = (0, react_redux_1.useDispatch)();
    var onSubmit = function (values) {
        console.log(values);
        var dataToSubmit = {
            username: values.username,
            password: values.password,
        };
        dispatch((0, auth_1.loginUser)(dataToSubmit)).then(function (res) {
            console.log(res);
            if (!res.payload.isLoggedIn) {
                setIsError(true);
            }
            else {
                // document.cookie = `token=${res.payload.token};`;
                // window.location.href = "/";
                history("/");
            }
        });
        // setIsError(false);
        // dispatch(login(dataToSubmit)).then((res) => {
        //   if (!res.payload.loggedIn) {
        //     setIsError(true);
        //   } else {
        //     document.cookie = `token=${res.payload.token};`;
        //     window.location.href = "/";
        //   }
        // });
    };
    var imageList = [
        "https://www.instagram.com/static/images/homepage/screenshot1.jpg/d6bf0c928b5a.jpg",
        "https://www.instagram.com/static/images/homepage/screenshot5.jpg/0a2d3016f375.jpg",
        "https://www.instagram.com/static/images/homepage/screenshot4.jpg/842fe5699220.jpg",
        "https://www.instagram.com/static/images/homepage/screenshot3.jpg/f0c687aa6ec2.jpg",
        "https://www.instagram.com/static/images/homepage/screenshot2.jpg/6f03eb85463c.jpg",
    ];
    setTimeout(function () {
        if (imageListCounter === imageList.length - 1) {
            setImageListCounter(0);
        }
        else {
            setImageListCounter(imageListCounter + 1);
        }
    }, 5000);
    var onFinishFailed = function (errorInfo) {
        console.log("Failed:", errorInfo);
    };
    var handleForgotPassword = function () {
        history("/forgot-password");
    };
    function useWindowSize() {
        var _a = (0, react_1.useState)([0]), size = _a[0], setSize = _a[1];
        (0, react_1.useLayoutEffect)(function () {
            function updateSize() {
                setSize([window.innerWidth, window.innerHeight]);
            }
            window.addEventListener("resize", updateSize);
            updateSize();
            return function () { return window.removeEventListener("resize", updateSize); };
        }, []);
        return size;
    }
    var width = useWindowSize()[0];
    (0, react_1.useEffect)(function () {
        if (width < 990) {
            setMobileMode(true);
        }
        else {
            setMobileMode(false);
        }
    }, [width]);
    return (<div className={login_module_css_1.default.loginWrapper}>
      {!mobileMode && (<div className={login_module_css_1.default.bannerWrapper}>
          <img className={login_module_css_1.default.outerBanner} src={instagramloginbanner_png_1.default} alt=""/>
          <div className={login_module_css_1.default.innerBanner}>
            <img src={imageList[imageListCounter]} alt=""/>
          </div>
        </div>)}
      <div className={login_module_css_1.default.loginBoxWrapper}>
        <div className={login_module_css_1.default.loginBox}>
          <div className={login_module_css_1.default.loginBoxHeader}>
            <img src={loginlogo_png_1.default} alt=""/>
          </div>
          <div>
            <div style={{ padding: "1rem 1.5rem 0.1rem 1.5rem" }}>
              {isError && (<antd_1.Alert style={{ margin: "0.5rem 0" }} message="Username or Password not found." type="error"/>)}
              <antd_1.Form layout="vertical" initialValues={{ remember: true }} onFinish={onSubmit} onFinishFailed={onFinishFailed}>
                <antd_1.Form.Item name="username" rules={[
            {
                required: true,
                message: "Please input your username!",
            },
        ]}>
                  <antd_1.Input size="large" placeholder="Username" style={{ height: 36 }} data-test="input-username"/>
                </antd_1.Form.Item>
                <antd_1.Form.Item name="password" rules={[
            { required: true, message: "Please input your password!" },
        ]}>
                  <antd_1.Input.Password size="large" placeholder="Password" style={{ height: 36 }} data-test="input-password"/>
                </antd_1.Form.Item>
                <antd_1.Form.Item>
                  <antd_1.Row>
                    <antd_1.Button type="primary" htmlType="submit" style={{ width: "100%" }} data-test="button-login-submit">
                      Submit
                    </antd_1.Button>
                  </antd_1.Row>
                </antd_1.Form.Item>
              </antd_1.Form>
              <antd_1.Row>
                <antd_1.Button style={{ padding: 0, fontSize: 12, margin: "auto" }} type="link" onClick={handleForgotPassword}>
                  Forgot your password?
                </antd_1.Button>
              </antd_1.Row>
            </div>
          </div>
        </div>
        <div className={login_module_css_1.default.registerBox}>
          Don't have an account?{" "}
          <strong style={{
            cursor: "pointer",
        }} onClick={function () {
            history("/register");
        }}>
            Sign up
          </strong>
        </div>
      </div>
    </div>);
};
exports.default = Login;
