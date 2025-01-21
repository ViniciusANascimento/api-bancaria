import { cpf } from 'cpf-cnpj-validator';
import { z as zod } from 'zod';

export class PixRegisterDTO {
  value: number;
  cpf: string;
  id?: number;

  private static schema = zod.object({
    value: zod.number().positive('Valor minimo é R$0,01'),
    cpf: zod
      .string()
      .length(11)
      .regex(/^\d{11}$/)
      .refine((CPF) => cpf.isValid(CPF), { message: 'CPF inválido' }),
    id: zod.number().optional(),
  });

  constructor(value: string, cpf: string, id?: number) {
    const validate = PixRegisterDTO.schema.parse({ value, cpf, id });
    this.value = validate.value;
    this.cpf = validate.cpf;
    this.id = validate.id;
  }
}
