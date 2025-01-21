import { cpf } from 'cpf-cnpj-validator';
import { z as zod } from 'zod';

export class PixSearchDTO {
  cpf: string;
  id?: number;

  private static schema = zod.object({
    cpf: zod
      .string({
        required_error: 'Deve conter somente numeros (11 caracteres)',
      })
      .length(11, 'CPF deve ser somente numeros')
      .regex(/^\d{11}$/, 'Quantidade de caracteres invalidos')
      .refine((CPF) => cpf.isValid(CPF), { message: 'CPF inválido' }),
    id: zod.number().optional(),
  });

  constructor(cpf: string, id: number) {
    const validate = PixSearchDTO.schema.parse({ cpf, id });
    this.cpf = validate.cpf;
    this.id = validate.id;
  }
}
