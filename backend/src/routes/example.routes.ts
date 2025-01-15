import { GetExample } from '@controllers/example.controller';
import AuthMiddleware from '@middlewares/auth.middleware';
import { Router } from 'express';

const ExampleRoutes = Router();

ExampleRoutes.get('/', AuthMiddleware, GetExample);

export { ExampleRoutes };
