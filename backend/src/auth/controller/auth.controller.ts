import { AuthLoginDTO } from '../dto/auth-login.dto';
import { AuthRegisterDTO } from '../dto/auth-register.dto';
import { AuthService } from '../services/auth.service';
import { z as zod } from 'zod';
import { StatusCode } from '../../utils/status-code';
import { Request, Response } from 'express';
//import Logger from '../../../config/logger';
import {
  ClientNotFound,
  Unauthorized,
  UserExists,
} from '../exceptions/login.exceptions';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const data: AuthLoginDTO = new AuthLoginDTO(email, password);
      const token = await this.authService.login(data);
      res.status(StatusCode.OK).json({ token });
    } catch (error) {
      if (error instanceof Unauthorized) {
        res.status(StatusCode.UNAUTHORIZED).send({
          message: error.message,
        });
        return;
      }
      if (error instanceof zod.ZodError) {
        const messages = error.errors.map((err) => err.message);
        res.status(StatusCode.BAD_REQUEST).json({ errors: messages });
        return;
      }
      if (error instanceof ClientNotFound) {
        res.status(StatusCode.NOT_FOUND).send({
          message: error.message,
        });
        return;
      }
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        message: 'Erro interno de servidor.',
      });
    }
  }

  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password, cpf } = req.body;
      const data: AuthRegisterDTO = new AuthRegisterDTO(
        name,
        email,
        password,
        cpf,
      );
      const token = await this.authService.register(data);
      res.status(StatusCode.CREATED).json({ token });
    } catch (error) {
      if (error instanceof zod.ZodError) {
        const messages = error.errors.map((err) => err.message);
        res.status(StatusCode.BAD_REQUEST).json({ errors: messages });
        return;
      }
      if (error instanceof UserExists) {
        res.status(StatusCode.CONFLICT).json({
          message: 'Usuário já existe',
        });
        return;
      }
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        message: 'Erro interno de servidor.',
      });
      console.log(error);
    }
  }
}
