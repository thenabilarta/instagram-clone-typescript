require("dotenv").config();

import { Request, Response } from "express";
import { get, controller, post, use } from "./decorators";
import { auth } from "../middleware/auth";
import moment from "moment";
import connection from "../config/connection";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "_" + file.originalname);
  },
});

const upload = multer({ storage });

@controller("/api/feeds")
class FeedController {
  @get("/images")
  getImages(req: Request, res: Response): void {
    const sqlQuery = `SELECT * FROM feeds`;

    connection.query(sqlQuery, (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });
  }

  @get("/")
  @use(auth)
  getFeeds(req: Request, res: Response): void {
    console.log("FFEEED");
    console.log(process.env.IMAGE_URL);
    const sqlQuery = `SELECT feeds.id, email, user_id, username, image_url, profilePictureSRC, caption, created_at FROM feeds LEFT JOIN users ON feeds.user_id=users.id GROUP BY feeds.id ORDER BY feeds.id DESC`;

    connection.query(sqlQuery, (err, data: Array<any>) => {
      const sqlQuery2 = `SELECT * FROM comments`;
      const sqlQuery3 = `SELECT * FROM likes`;
      connection.query(sqlQuery2, (err, data2: Array<any>) => {
        connection.query(sqlQuery3, (err, data3: Array<any>) => {
          const result: Array<any> = [];

          data.map((d) => {
            const comments: Array<any> = [];
            let likes: Array<any> = [];
            data2.map((d2) => {
              if (d.id === d2.post_id) {
                comments.push(d2);
              }
            });

            data3.map((d2) => {
              if (d2.post_id === d.id) {
                likes.push(d2.liked_by_user_id);
              }
            });
            result.push({ ...d, comments, likes });
          });

          if (err) {
            res.send(err);
          } else {
            res.send(result);
          }
        });
      });
    });
  }

  @get("/:id")
  @use(auth)
  getFeed(req: Request, res: Response): void {
    const sqlQuery = `SELECT * FROM feeds WHERE user_id = ${req.params.id} ORDER BY feeds.id DESC`;

    connection.query(sqlQuery, (err, data) => {
      res.send(data);
    });
  }

  @post("/")
  @use(auth)
  @use(upload.single("files"))
  feed(req: any, res: Response): void {
    const id = req.decode.id;
    const date = moment().unix();

    const caption = req.body.caption;

    const imageURL = `${process.env.IMAGE_URL}/uploads/` + req.file.filename;

    const sqlQuery = `INSERT INTO feeds (id, user_id, image_url, stored_as, caption, liked, comment_id, location, tags_id, created_at) VALUES (null, '${id}', '${imageURL}', '', '${caption}', 0, 0, '', 0, '${date}')`;

    connection.query(sqlQuery, (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });
  }
}
