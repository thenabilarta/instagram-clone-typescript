import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import moment from "moment";
import jwt from "jsonwebtoken";
import { get, controller, post, use } from "./decorators";
import { auth } from "../middleware/auth";

import connection from "../config/connection";

const saltRounds = 10;

type queryResult = Array<{
  id: number;
  email: string;
  username: string;
  password: string;
  profilePictureSRC: string;
}>;

@controller("/api/users")
class AuthController {
  @post("/register")
  register(req: Request, res: Response, next: NextFunction): void {
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
  }

  @post("/login")
  getLogin(req: Request, res: Response): void {
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
  }

  @get("/auth")
  getAuth(req: Request, res: Response): void {
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
  }

  @get("/")
  @use(auth)
  getUsers(req: Request, res: Response): void {
    const sqlQuery = `SELECT id, username, profilePictureSRC FROM users ORDER BY id DESC`;

    connection.query(sqlQuery, (err, data) => {
      if (err) console.log(err);
      res.send(data);
    });
  }

  @get("/:id")
  @use(auth)
  getUser(req: Request, res: Response): void {
    const params = req.params.id;

    const sqlQuery = `SELECT id, username, profilePictureSRC FROM users WHERE id = ${params}`;

    connection.query(sqlQuery, (err, data) => {
      if (err) console.log(err);
      res.send(data);
    });
  }
}
