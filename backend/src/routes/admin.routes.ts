import { CreateAdmin } from '@controllers/admin.controller';
import { Router } from 'express';

const AdminRoutes = Router();

AdminRoutes.post('/', CreateAdmin);

export { AdminRoutes };
