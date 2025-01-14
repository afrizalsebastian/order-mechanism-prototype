import { GetExample } from '@controllers/example.controller';
import { Router } from 'express';

const ExampleRoutes = Router();

ExampleRoutes.get('/', GetExample);

export { ExampleRoutes };
