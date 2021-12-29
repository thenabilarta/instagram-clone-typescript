"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var Navbar_1 = __importDefault(require("../../components/Navbar"));
var profile_module_css_1 = __importDefault(require("./profile.module.css"));
var axios_1 = __importDefault(require("axios"));
var utils_1 = require("../../utils/utils");
var react_router_dom_1 = require("react-router-dom");
var env_1 = require("../../config/env");
function Profile() {
    var _a = (0, react_1.useState)([]), userFeeds = _a[0], setUserFeeds = _a[1];
    var _b = (0, react_1.useState)({}), userProfile = _b[0], setUserProfile = _b[1];
    var state = (0, react_redux_1.useSelector)(function (state) { return state.auth; });
    var params = (0, react_router_dom_1.useParams)();
    (0, react_1.useEffect)(function () {
        fetchFeed();
        fetchUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    var fetchUser = function () {
        axios_1.default
            .get("".concat(env_1.REACTURL, "/api/users/") + params.id, {
            headers: {
                Authorization: "Bearer ".concat((0, utils_1.readCookie)("token")),
            },
        })
            .then(function (res) {
            console.log("user", res.data);
            setUserProfile(res.data[0]);
        });
    };
    var fetchFeed = function () {
        axios_1.default
            .get("".concat(env_1.REACTURL, "/api/feeds/").concat(params.id), {
            headers: {
                Authorization: "Bearer ".concat((0, utils_1.readCookie)("token")),
            },
        })
            .then(function (res) {
            console.log(res.data);
            setUserFeeds(res.data);
        });
    };
    console.log(state);
    return (<>
      <Navbar_1.default />
      <div className="mainWrapper">
        <div className={profile_module_css_1.default.profileWrapper}>
          <div className={profile_module_css_1.default.profileHeader}>
            <div className={profile_module_css_1.default.profilePictureWrapper}>
              <div className={profile_module_css_1.default.profilePicture}>
                {userProfile.profilePictureSRC && (<img src={userProfile.profilePictureSRC} alt=""/>)}
              </div>
            </div>
            <div className={profile_module_css_1.default.profileDescriptionWrapper}>
              <div className={profile_module_css_1.default.username}>
                {userProfile.username && userProfile.username}
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
