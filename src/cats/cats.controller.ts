import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from "@nestjs/common";
import { CatsService } from "./cats.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { IsAdminGuard } from "src/auth/guards/is-admin.guard";
import { Cat } from "./cat.entity";
import { CreateCatDto } from "./dto/create-cat.dto";

@UseGuards(JwtAuthGuard)
@Controller("cats")
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @UseGuards(IsAdminGuard)
  @Post()
  async create(@Body() payload: CreateCatDto): Promise<Cat> {
    return this.catsService.create(payload);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(":uuid")
  async findOne(
    @Param("uuid", new ParseUUIDPipe())
    uuid: string,
  ): Promise<Cat> {
    return this.catsService.findByUuid(uuid);
  }
}
