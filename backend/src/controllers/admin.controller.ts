import { CreateAdminRequest, LoginAdminRequest } from '@dtos/admin.dtos';
import { BadRequestError } from '@middlewares/error.middleware';
import { AdminServices } from '@services/admin';
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

const services = new AdminServices();

export async function CreateAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const request = req.body as CreateAdminRequest;
    const result = await services.Create(request);

    res.status(201).json({
      status: true,
      data: result,
    });
  } catch (err) {
    if (err instanceof ZodError) {
      const validateErr = new BadRequestError('Validation Error');
      next(validateErr);
    }

    next(err);
  }
}

export async function Login(req: Request, res: Response, next: NextFunction) {
  try {
    const request = req.body as LoginAdminRequest;
    const token = await services.Login(request);

    res.status(200).json({
      status: true,
      data: {
        token,
      },
    });
  } catch (err) {
    if (err instanceof ZodError) {
      const validateErr = new BadRequestError('Validation Error');
      next(validateErr);
    }

    next(err);
  }
}
