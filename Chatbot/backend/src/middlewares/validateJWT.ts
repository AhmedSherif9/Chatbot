// import jwt, { VerifyErrors } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
// import { IPayload } from "../types/payload";

const validateJWT = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { token } = request.signedCookies;
  if (!token) {
    response.status(500).send("Not Logged In");
    return;
  }
  jwt.verify(token, process.env.SECRET_KEY || "", (err: any, payload: any) => {
    if (err) {
      response.status(500).send("Token is invalid!");
      return;
    }
    if (!payload) {
      response.status(500).send("Token is empty!");
      return;
    }
    response.locals.JWTData = payload;
    next();
  });
};

export default validateJWT;
