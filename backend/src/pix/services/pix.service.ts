import { PrismaClient, Status } from '@prisma/client';
import { ClientNotFound } from '../../auth/exceptions/login.exceptions';
import { AuthService } from '../../auth/services/auth.service';
import { PixSearchDTO } from '../dto/pix-search.dto';
import { PixNotFound, StatusPixError } from '../exceptions/pix.exception';

const prisma = new PrismaClient();
const clientService = new AuthService();
export class PixService {

  public async registerPix(body) {
    const { value, id } = body;
      const client = await clientService.findUserById(id)
      if (!client) {
        throw new ClientNotFound();
      }
      const data = {
        clientId: client.id,
        clientCPF: client.cpf,
        value: Number(value),
      };
      const pix = await prisma.pix.create({ data });
    
  }
  public async payPix(data) {
    const { pixCode, status} = data;
    const {id} = data
    const pix = await this.validStatusPix(pixCode);

    if (pix === null || pix.status !== Status.PENDENTE) {
      throw new StatusPixError();
    }
    await prisma.pix.update({
      where: { id: pix.id },
      data: { status },
    });
  }

  public async getAllPix(data) {
    const { cpf, id } = data;

    const client = await clientService.findUserById(id);
    if (!client) {
      throw new ClientNotFound();
    }
    const pixList = await prisma.pix.findMany({ where: { clientCPF: cpf } });
    const formatList = pixList.map(pix => ({
      id: pix.id,
      value: Number(pix.value).toFixed(2),
      clientId: pix.clientId,
      clientCPF: pix.clientCPF,
      status: pix.status,
      created_at: new Date(pix.created_at).toLocaleDateString('pt-BR'),
    }))

    return formatList
  }

  private async validStatusPix(pixCode: string) {
    const pix = await prisma.pix.findFirst({ where: { id: pixCode } });
    if (!pix) {
      throw new PixNotFound();
    }
    return pix;
  }
}
