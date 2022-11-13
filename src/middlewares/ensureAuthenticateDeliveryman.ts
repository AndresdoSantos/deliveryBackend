import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticateDeliveryman(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      message: "Token mmissing!",
    });
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(
      token,
      "cd9723fb07da1f3551efc83768cb61yy"
    ) as IPayload;

    request.idDeliveryman = sub;

    return next();
  } catch (error) {
    return response.status(401).json({
      message: "Invalid token!",
    });
  }
}
