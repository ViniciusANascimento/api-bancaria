import { Request, Response } from 'express';
import { z as zod } from 'zod';
import { ClientNotFound } from '../../auth/exceptions/login.exceptions';
import { StatusCode } from '../../utils/status-code';
import { PixService } from '../services/pix.service';
//import Logger from '../../../config/logger';
import { StatusPixError } from '../exceptions/pix.exception';

export class PixController {
  private pixService: PixService;

  constructor() {
    this.pixService = new PixService();
  }

  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { value } = req.body;
      const id = req.user.id;
      const data = { value, id }
      //const data: PixRegisterDTO = new PixRegisterDTO(value, cpf);
      await this.pixService.registerPix(data);
      res.status(StatusCode.CREATED).json({
        message: 'Pix registrado com sucesso',
      });
    } catch (error) {
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
      console.error(error);
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { pixCode, status } = req.body;
      const user = req.user.id;
      const data = { pixCode, status, user }
      await this.pixService.payPix(data);
      res.status(StatusCode.OK).json({
        message: 'Pix pago com sucesso.',
      });
    } catch (error) {
      if (error instanceof StatusPixError) {
        res.status(StatusCode.BAD_REQUEST).send({
          message: error.message,
        });
        return;
      }
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
        message: 'Erro interno de servidor.',
      });
      console.error(error);
    }
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      
      const { cpf } = req.body;
      const user = req.user.id;
      const data = { cpf, user }
      //const data: PixSearchDTO = new PixSearchDTO(cpf, user);
      const pixList = await this.pixService.getAllPix(data);
      res.status(StatusCode.OK).json({
        pixList,
      });
    } catch (error) {
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
      console.error(error);
    }
  }
}
