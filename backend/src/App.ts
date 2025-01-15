import ErrorHandler, { NotFoundError } from '@middlewares/error.middleware';
import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Express, NextFunction, Request, Response } from 'express';
import { RouteName, routesV1 } from './routes';

const app: Express = express();

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

export default app;
