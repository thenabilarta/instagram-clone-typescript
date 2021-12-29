import { Request, Response } from "express";
import { controller, post, use } from "./decorators";
import { auth } from "../middleware/auth";
import moment from "moment";
import connection from "../config/connection";

type queryResult = Array<{
  status: string;
}>;

@controller("/api/likes")
class CommentController {
  @post("/")
  @use(auth)
  like(req: Request, res: Response): void {
    console.log(req.body);

    const feed_id = req.body.feed_id;
    const user_id = req.body.user_id;
    const owner = req.body.owner;

    const date = moment().unix();

    const checkIfExistQuery = `SELECT * FROM likes WHERE post_id = ${feed_id} AND liked_by_user_id = ${user_id}`;

    connection.query(checkIfExistQuery, (err, data: queryResult) => {
      if (err) {
        res.send(err);
      } else {
        if (data.length === 1) {
          res.send({
            status: "error",
            message: "Double like",
          });
        } else {
          const sqlQuery = `INSERT INTO likes (id, post_id, user_id, liked_by_user_id, date) VALUES (null, '${feed_id}', '${owner}', '${user_id}', '${date}')`;

          connection.query(sqlQuery, (err, data) => {
            if (err) {
              res.send(err);
            } else {
              res.send(data);
            }
          });
        }
      }
    });
  }

  @post("/")
  @use(auth)
  unlike(req: any, res: Response): void {
    console.log(req.body);

    const feed_id = req.body.feed_id;
    const user_id = req.body.user_id;

    const checkIfExistQuery = `DELETE FROM likes WHERE post_id = ${feed_id} AND liked_by_user_id = ${user_id}`;

    connection.query(checkIfExistQuery, (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });
  }
}
