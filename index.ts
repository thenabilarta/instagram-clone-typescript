const express = require("express");
const app = express();
import * as path from "path";
import cors = require("cors");

import { createServer } from "http";
const httpServer = createServer(app);
import * as bodyParser from "body-parser";
import cookieParser = require("cookie-parser");
import users from "./routes/users";
import feeds from "./routes/feeds";
import likes from "./routes/likes";
import comments from "./routes/comments";

import connection from "./config/connection";
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/users", users);
app.use("/api/feeds", feeds);
app.use("/api/comments", comments);
app.use("/api/likes", likes);

app.use("/uploads", express.static(__dirname + "/uploads"));

// app.use(express.static(path.join(__dirname, "/client/build")));

// app.get("*", (req, res) =>
//   res.sendFile(path.join(__dirname, "/client/build/index.html"))
// );

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () =>
  console.log(`server listening at http://localhost:${PORT}`)
);

interface messageData {
  from: string;
  to: string;
  date: string;
  content: string;
}

io.on("connection", (socket: any) => {
  connection.query("SELECT * FROM chats", (err: string, res: Response) => {
    socket.emit("private message", res);
  });

  socket.on("private message", (data: messageData) => {
    console.log(data);
    const from = data.from;
    const to = data.to;
    const date = data.date;
    const content = data.content;

    connection.query(
      `INSERT INTO chats
      (id, _from, _to, date, content) VALUES 
      (null, '${from}', '${to}', '${date}', '${content}')`
    );
    connection.query("SELECT * FROM chats", (err: object, res: Response) => {
      io.emit("private message", res);
    });
  });
});
