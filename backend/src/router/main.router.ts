import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthController } from '../auth/controller/auth.controller';
import { PixController } from '../pix/controllers/pix.controller';
import jwtRouter from './protect.router';

const prisma: PrismaClient = new PrismaClient();
const authController: AuthController = new AuthController();
const pixController: PixController = new PixController();

const router = Router();

router.post('/login', (req: Request, res: Response) =>
  authController.login(req, res),
);
router.post('/clients', (req: Request, res: Response) =>
  authController.register(req, res),
);

export default router;
