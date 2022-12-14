import { NextFunction, Request, Response } from "express";

export async function handlingError(
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (err instanceof Error) {
    return response.status(400).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    status: "Error",
    message: "Internal server error.",
  });
}
