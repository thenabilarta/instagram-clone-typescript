"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable array-callback-return */
var react_1 = require("react");
var antd_1 = require("antd");
var axios_1 = __importDefault(require("axios"));
var icons_1 = require("@ant-design/icons");
var Navbar_1 = __importDefault(require("../../components/Navbar"));
var NavbarMobile_1 = __importDefault(require("../../components/NavbarMobile"));
var message_module_css_1 = __importDefault(require("./message.module.css"));
var utils_1 = require("../../utils/utils");
var moment_1 = __importDefault(require("moment"));
var react_redux_1 = require("react-redux");
var socket_io_client_1 = require("socket.io-client");
var env_1 = require("../../config/env");
function Message() {
    var _a = (0, react_1.useState)(false), hasMessage = _a[0], setHasMessage = _a[1];
    var _b = (0, react_1.useState)([]), userList = _b[0], setUserList = _b[1];
    var _c = (0, react_1.useState)([]), _messageList = _c[0], _setMessageList = _c[1];
    var _d = (0, react_1.useState)([]), messageList = _d[0], setMessageList = _d[1];
    var _e = (0, react_1.useState)(null), chosedChat = _e[0], setChosedChat = _e[1];
    var _f = (0, react_1.useState)(""), chosedChatUsername = _f[0], setChosedChatUsername = _f[1];
    var _g = (0, react_1.useState)(""), message = _g[0], setMessage = _g[1];
    var _h = (0, react_1.useState)(false), isModalVisible = _h[0], setIsModalVisible = _h[1];
    var _j = (0, react_1.useState)(false), mobileMode = _j[0], setMobileMode = _j[1];
    var SOCKETREACTURL = env_1.REACTURL;
    var socket = (0, react_1.useRef)(null);
    var divRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        var mounted = true;
        if (mounted) {
            fetchUser();
            // eslint-disable-next-line react-hooks/exhaustive-deps
            socket.current = (0, socket_io_client_1.io)(SOCKETREACTURL, { autoConnect: false });
            socket.current.connect();
            socket.current.on("private message", function (res) {
                _setMessageList(res);
            });
            socket.current.onAny(function (event) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                console.log(event, args);
            });
        }
        return function () {
            mounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    var auth = (0, react_redux_1.useSelector)(function (state) { return state.auth; });
    (0, react_1.useEffect)(function () {
        if (chosedChat) {
            userList.map(function (u) {
                if (u.id === chosedChat) {
                    setChosedChatUsername(u.username);
                }
            });
        }
        var msgData = [];
        var currentDate;
        _messageList.forEach(function (m, index) {
            if (m._to === auth.id.toString() || m._from === auth.id.toString()) {
                if (chosedChat !== null) {
                    if (m._to === chosedChat.toString() ||
                        m._from === chosedChat.toString()) {
                        if (msgData.length === 0) {
                            currentDate = (0, moment_1.default)(m.date, "DD-MM-YYYYTHH-mm-ss");
                            msgData.push(__assign(__assign({}, m), { showDate: true }));
                        }
                        else if (index !== 0) {
                            if ((0, moment_1.default)(currentDate).isSame((0, moment_1.default)(m.date, "DD-MM-YYYYTHH-mm-ss"), "day")) {
                                msgData.push(__assign(__assign({}, m), { showDate: false }));
                            }
                            else {
                                currentDate = (0, moment_1.default)(m.date, "DD-MM-YYYYTHH-mm-ss");
                                msgData.push(__assign(__assign({}, m), { showDate: true }));
                            }
                        }
                    }
                }
            }
        });
        setMessageList(msgData);
    }, [_messageList, auth.id, chosedChat, userList]);
    (0, react_1.useEffect)(function () {
        if (divRef.current !== null && messageList.length > 0) {
            divRef.current.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest",
            });
        }
    }, [messageList]);
    function getUserProfileImage(id) {
        var src;
        userList.map(function (u) {
            if (u.id === id) {
                src = u.profilePictureSRC;
            }
        });
        return src;
    }
    var fetchUser = function () {
        axios_1.default
            .get("".concat(env_1.REACTURL, "/api/users"), {
            headers: {
                Authorization: "Bearer ".concat((0, utils_1.readCookie)("token")),
            },
        })
            .then(function (res) {
            setUserList(res.data);
        });
    };
    var showModal = function () {
        setIsModalVisible(true);
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
        <antd_1.Modal visible={isModalVisible} footer={null} onCancel={function () { return setIsModalVisible(false); }}>
          {userList.map(function (u) {
            if (u.id !== auth.id) {
                return (<div className={message_module_css_1.default.userListBox} style={{
                        cursor: "pointer",
                        backgroundColor: chosedChat === u.id ? "#efefef" : "#fff",
                    }} key={u.id} onClick={function () {
                        setChosedChat(u.id);
                        setHasMessage(true);
                        setIsModalVisible(false);
                    }}>
                  <div className={message_module_css_1.default.profilePictureWrapper}>
                    <img src={u.profilePictureSRC} alt=""/>
                  </div>
                  <div className={message_module_css_1.default.userListChat}>
                    <p>{u.username}</p>
                  </div>
                </div>);
            }
        })}
        </antd_1.Modal>
        <div className={message_module_css_1.default.messageWrapper} style={{
            maxWidth: mobileMode ? "350px" : "none",
            margin: !mobileMode ? "none" : width < 350 ? "0 1rem" : "auto",
        }}>
          <div className={message_module_css_1.default.leftWrapper} style={{
            borderRight: mobileMode ? "none" : "1px solid #dbdbdb",
            display: mobileMode && chosedChat !== null ? "none" : "flex",
        }}>
            <antd_1.Row className={message_module_css_1.default.leftHeader}>username</antd_1.Row>
            <antd_1.Row className={message_module_css_1.default.leftTitle}>Messages</antd_1.Row>
            <div className={message_module_css_1.default.userListWrapper}>
              {userList.map(function (u) {
            if (u.id !== auth.id) {
                return (<div className={message_module_css_1.default.userListBox} style={{
                        cursor: "pointer",
                        backgroundColor: chosedChat === u.id ? "#efefef" : "#fff",
                    }} key={u.id} onClick={function () {
                        setChosedChat(u.id);
                        setHasMessage(true);
                    }}>
                      <div className={message_module_css_1.default.profilePictureWrapper}>
                        <img src={u.profilePictureSRC} alt=""/>
                      </div>
                      <div className={message_module_css_1.default.userListChat}>
                        <p>{u.username}</p>
                        <p>Active Today</p>
                      </div>
                    </div>);
            }
        })}
            </div>
          </div>
          <div className={message_module_css_1.default.rightWrapper} style={{
            display: mobileMode && chosedChat === null ? "none" : "flex",
        }}>
            {!hasMessage ? (<div className={message_module_css_1.default.messageBanner}>
                <icons_1.MessageOutlined className={message_module_css_1.default.icon}/>
                <p className={message_module_css_1.default.h1}>Your Messages</p>
                <p className={message_module_css_1.default.h2}>
                  Send private messages to your friend
                </p>
                <antd_1.Button type="primary" onClick={function () {
                // setHasMessage(true)
                showModal();
            }}>
                  Send Message
                </antd_1.Button>
              </div>) : (<>
                <antd_1.Row className={message_module_css_1.default.rightHeader}>
                  {mobileMode && (<antd_1.Button onClick={function () {
                    setChosedChat(null);
                }}>
                      Back
                    </antd_1.Button>)}
                  {chosedChatUsername}
                </antd_1.Row>
                <div className={message_module_css_1.default.chatbox}>
                  {chosedChat !== null &&
                messageList.map(function (d, index) {
                    if (d._to === auth.id.toString() &&
                        d._from === chosedChat.toString()) {
                        return (<react_1.Fragment key={index}>
                            {d.showDate && (<div className={message_module_css_1.default.date}>
                                {(0, moment_1.default)(d.date, "DD-MM-YYYYTHH-mm-ss").format("dddd, MMMM Do YYYY")}
                              </div>)}

                            <div className={message_module_css_1.default.chat}>
                              <div className={message_module_css_1.default.profileImageWrapper}>
                                <img src={getUserProfileImage(parseInt(d._from))} alt="" className={message_module_css_1.default.profileImage}/>
                              </div>
                              <div className={message_module_css_1.default.text}>{d.content}</div>
                            </div>
                          </react_1.Fragment>);
                    }
                    if (d._from === auth.id.toString() &&
                        d._to === chosedChat.toString()) {
                        return (<react_1.Fragment key={index}>
                            {d.showDate && (<div className={message_module_css_1.default.date}>
                                {(0, moment_1.default)(d.date, "DD-MM-YYYYTHH-mm-ss").format("dddd, MMMM Do YYYY")}
                              </div>)}
                            <div className={message_module_css_1.default.chatUser}>
                              <div className={message_module_css_1.default.textUser}>{d.content}</div>
                            </div>
                          </react_1.Fragment>);
                    }
                })}
                  <div ref={divRef}></div>
                </div>
                <div className={message_module_css_1.default.chatInputWrapper}>
                  <div className={message_module_css_1.default.chatInput}>
                    <input type="text" className={message_module_css_1.default.input} value={message} onChange={function (e) { return setMessage(e.target.value); }} placeholder="Message..." onKeyDown={function (e) {
                if (e.key === "Enter") {
                    console.log(message);
                    socket.current.emit("private message", {
                        content: message,
                        from: auth.id,
                        to: chosedChat,
                        date: (0, moment_1.default)().format("DD-MM-YYYYTHH-mm-ss"),
                    });
                    setMessage("");
                }
            }}/>
                    <icons_1.SendOutlined className={message_module_css_1.default.sendIcon} onClick={function () {
                socket.current.emit("private message", {
                    content: message,
                    from: auth.id,
                    to: chosedChat,
                    date: (0, moment_1.default)().format("DD-MM-YYYYTHH-mm-ss"),
                });
                setMessage("");
            }}/>
                  </div>
                </div>
              </>)}
          </div>
        </div>
      </div>
    </>);
}
exports.default = Message;
