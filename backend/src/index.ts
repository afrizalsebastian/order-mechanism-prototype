import { Logger } from '@services/logger.service';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response) => {
  res.status(400).json({
    status: true,
    data: {
      message: 'API Status OK',
    },
  });
});

app.listen(port, () => {
  Logger.info(`Server Running in port ${port}`);
});
