import { Logger } from '@common/logger.service';
import ErrorHandler, { NotFoundError } from '@middlewares/error.middleware';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, NextFunction, Request, Response } from 'express';
import { RouteName, routesV1 } from './routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: true,
    data: {
      message: 'API Status OK',
    },
  });
});

routesV1.forEach((route: RouteName) => {
  app.use(route.name, route.router);
});

app.get('*', (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError());
});

app.use(ErrorHandler);

app.listen(port, () => {
  Logger.info(`Server Running in port ${port}`);
});
