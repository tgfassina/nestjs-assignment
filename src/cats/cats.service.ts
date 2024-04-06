import { Injectable } from "@nestjs/common";
import { ICat } from "./interfaces/cat.interface";
import { Repository } from "typeorm";
import { Cat } from "./cat.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CatsService {
  private readonly cats: ICat[] = [];

  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
  ) {}

  create(cat: ICat) {
    this.cats.push(cat);
  }

  findAll(): Promise<Cat[]> {
    return this.catsRepository.find();
  }
}
