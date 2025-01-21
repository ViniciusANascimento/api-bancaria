import { z as zod } from 'zod';
import { cpf } from 'cpf-cnpj-validator';

export class AuthRegisterDTO {
  name: string;
  email: string;
  password: string;
  cpf: string;

  private static schema = zod.object({
    name: zod
      .string({
        required_error: 'Nome é obrigatorio',
      })
      .min(4, 'Nome deve ter mais que 4 caracteres')
      .max(150, 'Nome deve ter no maximo 150 caracteres'),
    email: zod
      .string({
        required_error: 'Email é obrigatorio',
      })
      .email(),
    password: zod
      .string({
        required_error: 'Senha é obrigatorio',
      })
      .min(8, 'Senha deve ter no minimo 8 caracteres')
      .max(20, 'Senha deve ter no maximo 20 caracteres')
      .regex(/[A-Z]/, 'Senha deve ter pelo menos uma letra maiúscula.')
      .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula.')
      .regex(/[0-9]/, 'A senha deve conter pelo menos um número.')
      .regex(
        /[@$!%*?&#]/,
        'A senha deve conter pelo menos um caractere especial (@, $, !, %, *, ?, &, #, etc).',
      ),
    cpf: zod
      .string({
        required_error: 'CPF é obrigatorio',
      })
      .length(11)
      .regex(/^\d{11}$/)
      .refine((CPF) => cpf.isValid(CPF), { message: 'CPF/CNPJ inválido' }),
  });
  constructor(name: string, email: string, password: string, cpf: string) {
    const validate = AuthRegisterDTO.schema.parse({
      name,
      email,
      password,
      cpf,
    });
    this.name = validate.name;
    this.email = validate.email;
    this.password = validate.password;
    this.cpf = validate.cpf;
  }
}
