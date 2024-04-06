import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterDto } from "src/auth/dto/register.dto";
import { Repository } from "typeorm";

export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username });
  }

  register(payload: RegisterDto): Promise<User> {
    const user = this.usersRepository.create({
      username: payload.username,
      password: payload.password,
      isAdmin: false,
    });
    return this.usersRepository.save(user);
  }
}
