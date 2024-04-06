import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username });
  }

  register(username: string, password: string): Promise<User> {
    const user = this.usersRepository.create({
      username,
      password,
      isAdmin: false,
    });
    return this.usersRepository.save(user);
  }
}
