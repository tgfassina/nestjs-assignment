import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Cat } from "./cat.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCatDto } from "./dto/create-cat.dto";
import { UpdateCatDto } from "./dto/update-cat.dto";
import { User } from "src/users/user.entity";

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(payload: CreateCatDto) {
    const cat = this.catsRepository.create(payload);
    return this.catsRepository.save(cat);
  }

  findAll(): Promise<Cat[]> {
    return this.catsRepository.find();
  }

  findByUuid(uuid: string): Promise<Cat> {
    return this.catsRepository.findOneBy({ uuid });
  }

  async update(uuid: string, payload: UpdateCatDto) {
    if (Object.keys(payload).length > 1) {
      await this.catsRepository.update({ uuid }, payload);
    }
    return this.catsRepository.findOneBy({ uuid });
  }

  async delete(uuid: string): Promise<boolean> {
    return this.catsRepository
      .delete({ uuid })
      .then((result) => result.affected > 0);
  }

  async addFavorite(uuid: string, userUuid: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({
      where: { uuid: userUuid },
      relations: ["favoriteCats"],
    });
    if (user.favoriteCats.find((cat) => cat.uuid === uuid)) return false;

    const cat = await this.catsRepository.findOneBy({ uuid });
    if (!cat) return false;

    user.favoriteCats.push(cat);
    await this.usersRepository.save(user);
    return true;
  }

  async removeFavorite(uuid: string, userUuid: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({
      where: { uuid: userUuid },
      relations: ["favoriteCats"],
    });
    if (!user.favoriteCats.find((cat) => cat.uuid === uuid)) return false;

    user.favoriteCats = user.favoriteCats.filter((cat) => cat.uuid !== uuid);
    await this.usersRepository.save(user);
    return true;
  }
}
