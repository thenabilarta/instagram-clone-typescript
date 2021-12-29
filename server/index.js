"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var cookieParser = require("cookie-parser");
var http_1 = require("http");
var AppRouter_1 = require("./AppRouter");
var connection_1 = __importDefault(require("./config/connection"));
require("./controllers/AuthController");
require("./controllers/CommentController");
require("./controllers/FeedController");
var app = (0, express_1.default)();
var httpServer = (0, http_1.createServer)(app);
app.use((0, cors_1.default)({
    credentials: true,
    origin: true,
}));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(cookieParser());
app.use(AppRouter_1.AppRouter.getInstance());
app.use("/uploads", express_1.default.static(__dirname + "/uploads"));
// app.use(express.static(path.join(__dirname, "/client/build")));
// app.get("*", (req, res) =>
//   res.sendFile(path.join(__dirname, "/client/build/index.html"))
// );
var io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
    },
});
var PORT = process.env.PORT || 5000;
httpServer.listen(PORT, function () {
    return console.log("server listening at http://localhost:".concat(PORT));
});
io.on("connection", function (socket) {
    connection_1.default.query("SELECT * FROM chats", function (err, res) {
        socket.emit("private message", res);
    });
    socket.on("private message", function (data) {
        console.log(data);
        var from = data.from;
        var to = data.to;
        var date = data.date;
        var content = data.content;
        connection_1.default.query("INSERT INTO chats\n      (id, _from, _to, date, content) VALUES \n      (null, '".concat(from, "', '").concat(to, "', '").concat(date, "', '").concat(content, "')"));
        connection_1.default.query("SELECT * FROM chats", function (err, res) {
            io.emit("private message", res);
        });
    });
});
