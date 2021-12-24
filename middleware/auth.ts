import jwt from "jsonwebtoken";

import { NextFunction, Response } from "express";

export const auth = (req: any, res: Response, next: NextFunction) => {
  const _token = req.get("authorization");
  const token = _token!.split(" ")[1];

  jwt.verify(token, "shhhhh", function (err: any, decode: any) {
    if (!decode) {
      return res.send({
        isLoggedIn: false,
        role: "none",
      });
    }

    req.token = token;
    req.decode = decode;
    next();
  });
};
