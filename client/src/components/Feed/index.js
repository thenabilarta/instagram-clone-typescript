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
var feed_module_css_1 = __importDefault(require("./feed.module.css"));
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var kacangpanjang_jpg_1 = __importDefault(require("../../assets/kacangpanjang.jpg"));
var axios_1 = __importDefault(require("axios"));
var utils_1 = require("../../utils/utils");
var moment_1 = __importDefault(require("moment"));
var react_router_dom_1 = require("react-router-dom");
var env_1 = require("../../config/env");
var Feed = function (_a) {
    var feed = _a.feed, fetchFeed = _a.fetchFeed, userId = _a.userId;
    var _b = (0, react_1.useState)(""), comment = _b[0], setComment = _b[1];
    var _c = (0, react_1.useState)(false), openComment = _c[0], setOpenComment = _c[1];
    var _d = (0, react_1.useState)(false), activeLike = _d[0], setActiveLike = _d[1];
    var history = (0, react_router_dom_1.useNavigate)();
    var hoursPosted = function () {
        var hour = ((0, moment_1.default)().unix() - feed.created_at) / 3600;
        if (hour < 1) {
            return "JUST NOW";
        }
        if (hour < 24) {
            return Math.floor(hour) + " HOURS AGO";
        }
        if (hour > 24 && hour <= 24 * 2) {
            return "1 DAY AGO";
        }
        if (hour > 48 && hour < 24 * 7) {
            return Math.floor(hour / 24) + " DAYS AGO";
        }
        if (hour > 24 * 7) {
            return "MORE THAN A WEEK AGO";
        }
    };
    var createComment = function (post_id) {
        axios_1.default
            .post("".concat(env_1.REACTURL, "/api/comments"), { text: comment, post_id: post_id }, {
            headers: {
                Authorization: "Bearer ".concat((0, utils_1.readCookie)("token")),
            },
        })
            .then(function (res) {
            console.log(res.data);
            setComment("");
            fetchFeed();
        });
    };
    var likeAPost = function (feed_id, owner, user_id) {
        axios_1.default
            .post("".concat(env_1.REACTURL, "/api/likes"), { feed_id: feed_id, owner: owner, user_id: user_id }, {
            headers: {
                Authorization: "Bearer ".concat((0, utils_1.readCookie)("token")),
            },
        })
            .then(function (res) {
            console.log(res.data);
            // setComment("");
            if (res.data.status === "error") {
                return;
            }
            else {
                fetchFeed();
            }
        });
    };
    var unlikeAPost = function (feed_id, user_id) {
        axios_1.default
            .post("".concat(env_1.REACTURL, "/api/likes/unlike"), { feed_id: feed_id, user_id: user_id }, {
            headers: {
                Authorization: "Bearer ".concat((0, utils_1.readCookie)("token")),
            },
        })
            .then(function (res) {
            console.log(res.data);
            fetchFeed();
        });
    };
    var onUsernameClick = function (id) {
        if (userId === id) {
            history("/profile");
        }
        else {
            history("/profile/" + id);
        }
    };
    var renderComment = function (feed) {
        if (feed.comments.length > 0) {
            if (!openComment) {
                return (<p style={{
                        marginBottom: 5,
                        opacity: 0.5,
                        cursor: "pointer",
                    }} onClick={function () { return setOpenComment(true); }}>
            View all {feed.comments.length} comments
          </p>);
            }
            if (openComment) {
                return (<div>
            {feed.comments.map(function (f) {
                        return (<p key={f.id} style={{
                                marginBottom: 0,
                            }}>
                  <strong>{f.username}</strong> {f.text}
                </p>);
                    })}
          </div>);
            }
        }
    };
    return (<div className={feed_module_css_1.default.feedWrapper} key={feed.id}>
      <div className={feed_module_css_1.default.feedHeader}>
        <div className={feed_module_css_1.default.feedHeaderImageWrapper}>
          <img src={feed.profilePictureSRC !== ""
            ? feed.profilePictureSRC
            : kacangpanjang_jpg_1.default} alt=""/>
        </div>
        <p className={feed_module_css_1.default.feedUsername} onClick={function () { return onUsernameClick(feed.user_id); }}>
          {feed.username}
        </p>
      </div>
      <div className={feed_module_css_1.default.feed} onDoubleClick={function () {
            setActiveLike(true);
            setTimeout(function () {
                setActiveLike(false);
            }, 500);
            likeAPost(feed.id, feed.user_id, userId);
        }}>
        <img src={feed.image_url} alt=""/>
        <icons_1.HeartFilled className={activeLike ? feed_module_css_1.default.active : ""}/>
      </div>
      <div className={feed_module_css_1.default.feedFooter}>
        <div className={feed_module_css_1.default.feedFooterIconWrapper}>
          <div>
            {feed.likes.includes(userId) ? (<icons_1.HeartFilled className={feed_module_css_1.default.feedFooterIcon} style={{ color: "red" }} onClick={function () {
                console.log("unlike");
                unlikeAPost(feed.id, userId);
            }}/>) : (<icons_1.HeartOutlined className={feed_module_css_1.default.feedFooterIcon} onClick={function () {
                console.log("like");
                setActiveLike(true);
                setTimeout(function () {
                    setActiveLike(false);
                }, 500);
                likeAPost(feed.id, feed.user_id, userId);
            }}/>)}

            <icons_1.CommentOutlined className={feed_module_css_1.default.feedFooterIcon}/>
            <icons_1.MessageOutlined className={feed_module_css_1.default.feedFooterIcon}/>
          </div>
        </div>
        <div className={feed_module_css_1.default.feedFooterText}>
          {feed.likes.length > 0 && (<p style={{ marginBottom: 0 }}>{feed.likes.length} likes</p>)}
          <div>
            <strong>{feed.username}</strong> {feed.caption}
          </div>
          {renderComment(feed)}
          <p style={{
            fontSize: 10,
            marginBottom: 5,
            marginTop: 5,
        }}>
            {hoursPosted()}
          </p>
        </div>
        <div className={feed_module_css_1.default.feedFooterComment}>
          <antd_1.Input style={{ padding: 0 }} placeholder="Add a comment..." bordered={false} onChange={function (e) { return setComment(e.target.value); }} value={comment}/>
          <strong style={{
            color: "#0095f6",
            opacity: comment.length > 0 ? 1 : 0.3,
            cursor: comment.length > 0 ? "pointer" : "default",
        }} onClick={function () { return createComment(feed.id); }}>
            Post
          </strong>
        </div>
      </div>
    </div>);
};
exports.default = Feed;
