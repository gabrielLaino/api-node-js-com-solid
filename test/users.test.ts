import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from '@/service/errors/user-already-exists';
import { RegistrerService } from '@/service/registrer.service';
import { compare } from 'bcrypt';
import { describe, expect, test } from 'vitest';

describe('Registrer use case', () => {
  test('user password should be hash', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registrerService = new RegistrerService(usersRepository);

    const { user } = await registrerService.execute({
      name: 'John Doe',
      email: 'test@tes.com.br',
      password: '123456'
    });

    const isPAssordCorrectHashed = await compare('123456', user.password_hash);

    expect(isPAssordCorrectHashed).toBe(true);
  });

  test('Not to be possible create a user if same e-mail', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registrerService = new RegistrerService(usersRepository);

    await registrerService.execute({
      name: 'John Doe',
      email: 'test@tes.com.br',
      password: '123456'
    });

    await expect(() => 
      registrerService.execute({
        name: 'John Doe',
        email: 'test@tes.com.br',
        password: '123456'
      }), 
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  });

  test('Should be possible create a user', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registrerService = new RegistrerService(usersRepository);

    const { user } = await registrerService.execute({
      name: 'John Doe',
      email: 'test@tes.com.br',
      password: '123456'
    });

    expect(user.id).toEqual(expect.any(String));
  });
});