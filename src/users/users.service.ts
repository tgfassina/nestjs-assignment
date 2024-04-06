import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  register(username: string, password: string): Promise<User> {
    const user = this.usersRepository.create({
      username,
      password,
    });
    return this.usersRepository.save(user);
  }
}
