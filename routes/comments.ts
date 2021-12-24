import { Router } from "express";

const router = Router();

import connection from "../config/connection";
import moment from "moment";
import { auth } from "../middleware/auth";

router.get("/", auth, (req, res) => {
  const sqlQuery = `SELECT feeds.id, email, user_id, username, image_url, profilePictureSRC, caption, created_at FROM feeds LEFT JOIN users ON feeds.user_id=users.id ORDER BY feeds.id DESC`;

  connection.query(sqlQuery, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

router.post("/", auth, (req: any, res) => {
  console.log(req.body);

  const id = req.decode.id;
  const username = req.decode.username;

  const post_id = req.body.post_id;
  const text = req.body.text;

  const date = moment().unix();

  const sqlQuery = `INSERT INTO comments (id, user_id, post_id, text, username, created_at) VALUES (null, '${id}', '${post_id}', '${text}', '${username}', '${date}')`;

  connection.query(sqlQuery, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

export default router;
