import ErrorHandler, {
  CustomError,
  HttpCustomError,
  NotFoundError,
} from '@middlewares/error.middleware';
import { Logger } from '@services/logger.service';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, NextFunction, Request, Response } from 'express';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api-status', (req: Request, res: Response) => {
  res.status(200).json({
    status: true,
    data: {
      message: 'API Status OK',
    },
  });
});

app.get('/error', (req: Request, res: Response, next: NextFunction) => {
  try {
    throw new CustomError(500, 'errors');
  } catch (err) {
    next(err as HttpCustomError);
  }
});

app.get('*', (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError());
});

app.use(ErrorHandler);

app.listen(port, () => {
  Logger.info(`Server Running in port ${port}`);
});
