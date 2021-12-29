"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var navbar_module_css_1 = __importDefault(require("./navbar.module.css"));
var instagramlogo_png_1 = __importDefault(require("../../assets/instagramlogo.png"));
var icons_1 = require("@ant-design/icons");
var react_redux_1 = require("react-redux");
var react_1 = require("react");
function Navbar() {
    var history = (0, react_router_dom_1.useNavigate)();
    var location = (0, react_router_dom_1.useLocation)();
    var path = location.pathname;
    var state = (0, react_redux_1.useSelector)(function (state) { return state; });
    // const onChange = (e) => {
    //   console.log(e);
    // };
    return (<div className={navbar_module_css_1.default.navbarWrapper}>
      <div className={navbar_module_css_1.default.navbarInnerWrapper}>
        <div className={navbar_module_css_1.default.navbar}>
          <div className={navbar_module_css_1.default.logoWrapper}>
            <img onClick={function () { return history("/"); }} className={navbar_module_css_1.default.logo} src={instagramlogo_png_1.default} alt=""/>
          </div>
          {/* <div className={styles.inputWrapper}>
          <Input placeholder="Search" allowClear onChange={onChange} />
        </div> */}
          <div className={navbar_module_css_1.default.menuWrapper}>
            {path === "/" ? (<>
                <icons_1.HomeFilled className={navbar_module_css_1.default.menuIcon}/>
              </>) : (<>
                <icons_1.HomeOutlined className={navbar_module_css_1.default.menuIcon} onClick={function () {
                history("/");
            }}/>
              </>)}

            {path === "/message" ? (<icons_1.MessageFilled className={navbar_module_css_1.default.menuIcon}/>) : (<icons_1.MessageOutlined className={navbar_module_css_1.default.menuIcon} onClick={function () {
                history("/message");
            }}/>)}

            {path === "/create" ? (<icons_1.PlusCircleFilled className={navbar_module_css_1.default.menuIcon}/>) : (<react_1.Fragment>
                <input type="file" style={{ display: "none" }} name="inputPost" id="inputPost" accept="image/jpeg" data-test="input-feed" onChange={function (e) {
                console.log(e.target.files);
                history("/create", {
                    state: {
                        media: e.target.files,
                    },
                });
            }}/>
                <label htmlFor="inputPost" className={navbar_module_css_1.default.menuIcon}>
                  <icons_1.PlusCircleOutlined />
                </label>
              </react_1.Fragment>)}

            <icons_1.HeartOutlined className={navbar_module_css_1.default.menuIcon}/>
            <div className={navbar_module_css_1.default.profilePicture} onClick={function () {
            history("/profile");
        }}>
              <img src={state.auth.profilePic} alt=""/>
            </div>
          </div>
        </div>
      </div>
    </div>);
}
exports.default = Navbar;
