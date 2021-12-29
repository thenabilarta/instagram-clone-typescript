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
var axios_1 = __importDefault(require("axios"));
var dashboard_module_css_1 = __importDefault(require("./dashboard.module.css"));
var Navbar_1 = __importDefault(require("../../components/Navbar"));
var NavbarMobile_1 = __importDefault(require("../../components/NavbarMobile"));
var Story_1 = __importDefault(require("../../components/Story"));
var Feed_1 = __importDefault(require("../../components/Feed"));
var react_redux_1 = require("react-redux");
var utils_1 = require("../../utils/utils");
var env_1 = require("../../config/env");
function Dashboard() {
    var _a = (0, react_1.useState)([]), feeds = _a[0], setFeeds = _a[1];
    var _b = (0, react_1.useState)([]), userStory = _b[0], setUserStory = _b[1];
    var auth = (0, react_redux_1.useSelector)(function (state) { return state.auth; });
    (0, react_1.useEffect)(function () {
        fetchFeed();
        fetchUser();
    }, []);
    var fetchFeed = function () {
        axios_1.default
            .get("".concat(env_1.REACTURL, "/api/feeds"), {
            headers: {
                Authorization: "Bearer ".concat((0, utils_1.readCookie)("token")),
            },
        })
            .then(function (res) {
            console.log(res.data);
            setFeeds(res.data);
        });
    };
    var fetchUser = function () {
        axios_1.default
            .get("".concat(env_1.REACTURL, "/api/users"), {
            headers: {
                Authorization: "Bearer ".concat((0, utils_1.readCookie)("token")),
            },
        })
            .then(function (res) {
            setUserStory(res.data);
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
    function ShowRightProfile() {
        var width = useWindowSize()[0];
        var offset = (width - 935) / 2;
        if (width > 613 + 293 + 28) {
            return (<div className={dashboard_module_css_1.default.rightWrapper} style={{
                    left: 613 + offset + 28,
                }}>
          <div className={dashboard_module_css_1.default.rightWrapperHeader}>
            <div className={dashboard_module_css_1.default.rightWrapperHeaderImageWrapper}>
              <img src={auth.profilePic} alt=""/>
            </div>
            <div className={dashboard_module_css_1.default.rightWrapperHeaderText}>
              <p>@{auth.username}</p>
              <p>{auth.email}</p>
            </div>
          </div>
          <div className={dashboard_module_css_1.default.rightWrapperFooter}>
            <p>
              About Help Press API Jobs Privacy Terms Locations Top Accounts
              Hashtags Language
            </p>
            <p>© 2021 INSTAGRAM FROM FACEBOOK</p>
          </div>
        </div>);
        }
    }
    return (<>
      <Navbar_1.default />
      {width < 640 && <NavbarMobile_1.default />}
      <div className="mainWrapper">
        <div className={dashboard_module_css_1.default.dashboardWrapper}>
          <div className={dashboard_module_css_1.default.leftWrapper}>
            <div className={dashboard_module_css_1.default.storyWrapper}>
              {userStory.length > 0 &&
            userStory.map(function (user) { return (<Story_1.default user={user} key={user.username}/>); })}
              {/* <Story /> */}
            </div>
            {feeds.length > 0 &&
            feeds.map(function (feed) { return (<Feed_1.default feed={feed} key={feed.id} fetchFeed={fetchFeed} userId={auth.id}/>); })}
          </div>
          {ShowRightProfile()}
        </div>
      </div>
    </>);
}
exports.default = Dashboard;
