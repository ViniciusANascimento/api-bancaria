import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import { AuthLoginDTO } from '../dto/auth-login.dto';
import { AuthRegisterDTO } from '../dto/auth-register.dto';
import {
  ClientNotFound,
  Unauthorized,
  UserExists,
} from '../exceptions/login.exceptions';

const prisma = new PrismaClient();
export class AuthService {
  public async login(body: AuthLoginDTO) {
    const { email, password } = body;
    const user = await this.findUserByEmailOrCPF(email);
    if (!user) {
      throw new ClientNotFound();
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new Unauthorized();
    }
    return this.createToken(user.id);
  }

  public async register(body: AuthRegisterDTO) {
    const { email, password, name, cpf } = body;
    const user = await this.findUserByEmailOrCPF(email, cpf);
    if (user) {
      throw new UserExists();
    }
    const newPassword = await bcrypt.hash(password, 10);
    const data = {
      name,
      email,
      password: newPassword,
      cpf,
    };
    const newUser = await prisma.client.create({ data });
    return this.createToken(newUser.id);
  }
  private createToken(id: number) {
    return jsonwebtoken.sign({ userId: id }, String(process.env.JWT_SECRET), {
      expiresIn: process.env.JWT_EXPIRATION,
    });
  }
  public async findUserByEmailOrCPF(email: string, cpf: string = 'null') {
    return prisma.client.findFirst({
      where: {
        OR: [{ email }, { cpf }],
      },
    });
  }

  public async findUserById(id: number) {
    return prisma.client.findFirst({
      where: {
        id,
      },
    });
  }
}
