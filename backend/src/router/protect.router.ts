import { Request, Response, Router } from 'express';
import authenticateToken from '../middleware/jwt-auth.middleware';
import { PixController } from '../pix/controllers/pix.controller';

const pixController: PixController = new PixController();

const jwtRouter = Router();

jwtRouter.post(
  '/clients/pix',
  authenticateToken,
  (req: Request, res: Response) => pixController.register(req, res),
);

jwtRouter.patch(
  '/clients/pix',
  authenticateToken,
  (req: Request, res: Response) => pixController.update(req, res),
);

jwtRouter.get(
  '/clients/pix',
  authenticateToken,
  (req: Request, res: Response) => pixController.getAll(req, res),
);

export default jwtRouter;
