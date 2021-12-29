"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var auth_1 = require("../../store/actions/auth");
var react_redux_1 = require("react-redux");
var Navbar_1 = __importDefault(require("../../components/Navbar"));
var NavbarMobile_1 = __importDefault(require("../../components/NavbarMobile"));
var profile_module_css_1 = __importDefault(require("./profile.module.css"));
var axios_1 = __importDefault(require("axios"));
var utils_1 = require("../../utils/utils");
var antd_1 = require("antd");
var env_1 = require("../../config/env");
function Profile() {
    var dispatch = (0, react_redux_1.useDispatch)();
    var _a = (0, react_1.useState)([]), userFeeds = _a[0], setUserFeeds = _a[1];
    var _b = (0, react_1.useState)(false), setMobileMode = _b[1];
    var state = (0, react_redux_1.useSelector)(function (state) { return state.auth; });
    (0, react_1.useEffect)(function () {
        fetchFeed();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    var fetchFeed = function () {
        console.log(env_1.REACTURL);
        if (state.id) {
            axios_1.default
                .get("".concat(env_1.REACTURL, "/api/feeds/").concat(state.id), {
                headers: {
                    Authorization: "Bearer ".concat((0, utils_1.readCookie)("token")),
                },
            })
                .then(function (res) {
                console.log(res.data);
                setUserFeeds(res.data);
            });
        }
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
    return (<>
      <Navbar_1.default />
      {width < 640 && <NavbarMobile_1.default />}
      <div className="mainWrapper">
        <div className={profile_module_css_1.default.profileWrapper}>
          <div className={profile_module_css_1.default.profileHeader}>
            <div className={profile_module_css_1.default.profilePictureWrapper}>
              <div className={profile_module_css_1.default.profilePicture}>
                {state.profilePic && <img src={state.profilePic} alt=""/>}
              </div>
            </div>
            <div className={profile_module_css_1.default.profileDescriptionWrapper}>
              <div className={profile_module_css_1.default.username}>
                {state.username && state.username}
                <antd_1.Button type="primary" onClick={function () {
            console.log("logout");
            dispatch((0, auth_1.logoutUser)());
            window.location.reload();
        }}>
                  Logout
                </antd_1.Button>
              </div>
              <div className={profile_module_css_1.default.info}>
                <p className={profile_module_css_1.default.descriptionText}>
                  {userFeeds.length} posts
                </p>
                {/* <p className={styles.descriptionText}>177 followers</p>
        <p className={styles.descriptionText}>914 following</p> */}
              </div>
              <div className={profile_module_css_1.default.description}>
                <p className={profile_module_css_1.default.descriptionText}>This is description</p>
                <p className={profile_module_css_1.default.descriptionText}>www.example.com</p>
              </div>
            </div>
            {/* <p>This is profile</p>
      <strong
        onClick={() => {
          console.log("logout");
          dispatch(logoutUser());
          window.location.reload();
        }}
      >
        Logout
      </strong> */}
          </div>
          <div className={profile_module_css_1.default.profileBody}>
            {userFeeds.map(function (u, index) { return (<div className={profile_module_css_1.default.profilePost} key={index}>
                <img src={u.image_url} alt=""/>
              </div>); })}
          </div>
        </div>
      </div>
    </>);
}
exports.default = Profile;
