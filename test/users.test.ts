import { RegistrerService } from '@/service/registrer.service';
import { compare } from 'bcrypt';
import { describe, expect, test } from 'vitest';

describe('Registrer use case', () => {
  test('user password should be hash', async () => {
    const registrerService = new RegistrerService({
      async findByEmail(email) {
        return null
      },

      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date()
        }
      }
    });

    const { user } = await registrerService.execute({
      name: 'John Doe',
      email: 'test@tes.com.br',
      password: '123456'
    });

    const isPAssordCorrectHashed = await compare('123456', user.password_hash);

    expect(isPAssordCorrectHashed).toBe(true);
  });
});