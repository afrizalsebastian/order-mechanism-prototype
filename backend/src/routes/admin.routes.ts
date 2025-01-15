import { CreateAdmin, Login } from '@controllers/admin.controller';
import { Router } from 'express';

const AdminRoutes = Router();

AdminRoutes.post('/register', CreateAdmin);
AdminRoutes.post('/login', Login);

export { AdminRoutes };
