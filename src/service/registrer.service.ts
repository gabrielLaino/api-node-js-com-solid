import { hash } from "bcrypt";
import {  UsersRegistrer } from '../@types/user'
import { UsersRepository } from "@/repositories/users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists";

export class RegistrerService {
  constructor (private usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }
  
  async execute ({
    name, email, password
  }: UsersRegistrer) {
    const passwordHash = await hash(password, 6);
  
    const userWithSameEmail = await this.usersRepository.findByEmail(email);
  
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }
  
    await this.usersRepository.create({name, email, password_hash: passwordHash});
  }
}