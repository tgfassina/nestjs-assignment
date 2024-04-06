import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Cat } from "./cat.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCatDto } from "./dto/create-cat.dto";

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
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
}
