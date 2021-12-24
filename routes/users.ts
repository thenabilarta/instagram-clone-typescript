import { Router, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connection from "../config/connection";
import moment from "moment";
import { auth } from "../middleware/auth";

const saltRounds = 10;

const router = Router();

router.post("/register", (req: Request, res: Response, next: NextFunction) => {
  const username = req.body.username;
  const email = req.body.email;
  let password = req.body.password;

  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(password, salt, function (err, hash) {
      if (err) return next(err);
      const sqlQuery = `INSERT INTO users (id, username, profilePictureSRC, email, password) VALUES (null, '${username}', 'https://www.gravatar.com/avatar/${moment().unix()}?d=identicon','${email}', '${hash}')`;

      connection.query(sqlQuery, (err, data) => {
        if (err) {
          res.send(err);
        } else {
          res.send(data);
        }
      });
    });
  });
});

type queryResult = Array<{
  id: number;
  email: string;
  username: string;
  password: string;
  profilePictureSRC: string;
}>;

router.post("/login", (req, res) => {
  const username = req.body.username;
  let password = req.body.password;

  const sqlQuery = `SELECT * FROM users WHERE username = '${username}'`;

  connection.query(sqlQuery, (err, result: queryResult) => {
    if (err) {
      res.send(err);
    } else {
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, function (err, isMatch) {
          if (err) console.log(err);
          if (isMatch) {
            const token = jwt.sign(
              {
                id: result[0].id,
                email: result[0].email,
                username: result[0].username,
                profilePic: result[0].profilePictureSRC,
                status: "ok",
                isLoggedIn: true,
              },
              "shhhhh"
            );
            res.cookie("token", token);
            console.log(result);
            res.send({
              email: result[0].email,
              username: result[0].username,
              profilePic: result[0].profilePictureSRC,
              status: "ok",
              isLoggedIn: true,
              token,
            });
          } else {
            res.status(403).send({
              status: "Error",
              message: "Username or password not found",
            });
          }
        });
      } else {
        res.status(403).send({
          status: "Error",
          message: "Username or password not found",
        });
      }
    }
  });
});

router.get("/auth", (req, res) => {
  const _token = req.get("authorization");
  const token = _token?.split(" ")[1];

  jwt.verify(token!, "shhhhh", function (err: any, decode: any) {
    if (!decode) {
      return res.json({
        isLoggedIn: false,
        role: "none",
      });
    } else {
      res.send(decode);
    }
  });
});

router.get("/", auth, (req, res) => {
  const sqlQuery = `SELECT id, username, profilePictureSRC FROM users ORDER BY id DESC`;

  connection.query(sqlQuery, (err, data) => {
    if (err) console.log(err);
    res.send(data);
  });
});

router.get("/:id", auth, (req, res) => {
  const params = req.params.id;

  const sqlQuery = `SELECT id, username, profilePictureSRC FROM users WHERE id = ${params}`;

  connection.query(sqlQuery, (err, data) => {
    if (err) console.log(err);
    res.send(data);
  });
});

export default router;
