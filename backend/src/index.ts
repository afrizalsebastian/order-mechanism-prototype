import { Logger } from '@common/logger.service';
import dotenv from 'dotenv';
import app from './App';

dotenv.config();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  Logger.info(`Server Running in port ${port}`);
});
