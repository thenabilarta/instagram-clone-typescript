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
const express = require("express");
const app = express();
const cors = require("cors");
const http_1 = require("http");
const httpServer = (0, http_1.createServer)(app);
const bodyParser = __importStar(require("body-parser"));
const cookieParser = require("cookie-parser");
const users_1 = __importDefault(require("./routes/users"));
const feeds_1 = __importDefault(require("./routes/feeds"));
const likes_1 = __importDefault(require("./routes/likes"));
const comments_1 = __importDefault(require("./routes/comments"));
const connection_1 = __importDefault(require("./config/connection"));
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
    },
});
app.use(cors({
    credentials: true,
    origin: true,
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/users", users_1.default);
app.use("/api/feeds", feeds_1.default);
app.use("/api/comments", comments_1.default);
app.use("/api/likes", likes_1.default);
app.use("/uploads", express.static(__dirname + "/uploads"));
// app.use(express.static(path.join(__dirname, "/client/build")));
// app.get("*", (req, res) =>
//   res.sendFile(path.join(__dirname, "/client/build/index.html"))
// );
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`server listening at http://localhost:${PORT}`));
io.on("connection", (socket) => {
    connection_1.default.query("SELECT * FROM chats", (err, res) => {
        socket.emit("private message", res);
    });
    socket.on("private message", (data) => {
        console.log(data);
        const from = data.from;
        const to = data.to;
        const date = data.date;
        const content = data.content;
        connection_1.default.query(`INSERT INTO chats
      (id, _from, _to, date, content) VALUES 
      (null, '${from}', '${to}', '${date}', '${content}')`);
        connection_1.default.query("SELECT * FROM chats", (err, res) => {
            io.emit("private message", res);
        });
    });
});
