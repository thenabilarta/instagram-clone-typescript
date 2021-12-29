"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable react-hooks/exhaustive-deps */
var react_1 = require("react");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var react_router_dom_1 = require("react-router-dom");
var axios_1 = __importDefault(require("axios"));
var react_redux_1 = require("react-redux");
var Navbar_1 = __importDefault(require("../../components/Navbar"));
var NavbarMobile_1 = __importDefault(require("../../components/NavbarMobile"));
var create_module_css_1 = __importDefault(require("./create.module.css"));
var utils_1 = require("../../utils/utils");
var env_1 = require("../../config/env");
function Create(_a) {
    var location = _a.location;
    console.log(location.state.media);
    var _b = (0, react_1.useState)({}), imageAttr = _b[0], setImageAttr = _b[1];
    var _c = (0, react_1.useState)({}), imageSRC = _c[0], setImageSRC = _c[1];
    var _d = (0, react_1.useState)(""), caption = _d[0], setCaption = _d[1];
    var _e = (0, react_1.useState)(false), mobileMode = _e[0], setMobileMode = _e[1];
    var history = (0, react_router_dom_1.useNavigate)();
    var auth = (0, react_redux_1.useSelector)(function (state) { return state.auth; });
    var file = location.state.media[0];
    var TextArea = antd_1.Input.TextArea;
    (0, react_1.useEffect)(function () {
        setImageSRC(URL.createObjectURL(file));
        setImageAttr(file);
    }, []);
    var openNotificationWithIcon = function (type, msg, desc) {
        antd_1.notification[type]({
            message: msg,
            description: desc,
        });
    };
    var post = function () {
        var config = {
            headers: {
                Authorization: "Bearer ".concat((0, utils_1.readCookie)("token")),
                "Content-Type": "multipart/form-data",
            },
        };
        var formData = new FormData();
        formData.append("files", imageAttr);
        formData.append("caption", caption);
        axios_1.default
            .post("".concat(env_1.REACTURL, "/api/feeds"), formData, config)
            .then(function (res) {
            console.log(res.data);
            openNotificationWithIcon("success", "Success", "Post has been created");
            history("/");
        })
            .catch(function (err) {
            openNotificationWithIcon("error", "Error", "Unexpected error");
        });
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
        if (width < 639) {
            setMobileMode(true);
        }
        else {
            setMobileMode(false);
        }
    }, [width]);
    return (<>
      <Navbar_1.default />
      {mobileMode && <NavbarMobile_1.default />}
      <div className="mainWrapper">
        <div className={create_module_css_1.default.createWrapper} style={{ margin: mobileMode ? "0 1rem" : "auto" }}>
          <div className={create_module_css_1.default.createHeader}>
            <icons_1.CloseOutlined className={create_module_css_1.default.menuIcon} onClick={function () {
            history("/");
        }}/>
            <p style={{ marginBottom: 0 }}>New Post</p>
            <strong onClick={function () { return post(); }} style={{ color: "#0095f6", cursor: "pointer" }} data-test="input-feed-submit">
              Share
            </strong>
          </div>
          <div className={create_module_css_1.default.createBody}>
            <div className={create_module_css_1.default.profilePicture}>
              <img src={auth.profilePic} alt=""/>
            </div>
            <div className={create_module_css_1.default.inputWrapper}>
              <TextArea autoSize={{ minRows: 3, maxRows: 5 }} placeholder="Write a caption..." bordered={false} onChange={function (e) { return setCaption(e.target.value); }} data-test="input-feed-caption"/>
            </div>
            <div className={create_module_css_1.default.postImage}>
              <img src={imageSRC} alt=""/>
            </div>
          </div>
          <div className={create_module_css_1.default.createFooter}>
            <antd_1.Row className={create_module_css_1.default.footerItem}>
              <p style={{ marginBottom: 0 }}>Add Location</p>
              <icons_1.RightOutlined className={create_module_css_1.default.menuIcon}/>
            </antd_1.Row>
            <antd_1.Row className={create_module_css_1.default.footerItem}>
              <p style={{ marginBottom: 0 }}>Tag People</p>
              <icons_1.RightOutlined className={create_module_css_1.default.menuIcon}/>
            </antd_1.Row>
          </div>
        </div>
      </div>
    </>);
}
exports.default = Create;
