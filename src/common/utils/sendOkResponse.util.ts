import { Response } from "express";

export function sendOkResponse(
  res: Response,
  data: any = {},
  message: string = "Success"
) {
  return res.status(200).json({
    statusCode: 200,
    message,
    data,
  });
}
