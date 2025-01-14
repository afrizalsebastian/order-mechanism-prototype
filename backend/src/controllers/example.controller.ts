import { NextFunction, Request, Response } from 'express';

export async function GetExample(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    res.status(200).json({
      status: true,
      data: {
        message: 'Example Route',
      },
    });
  } catch (err) {
    next(err);
  }
}
