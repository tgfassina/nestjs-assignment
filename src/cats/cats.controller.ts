import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from "@nestjs/common";
import { CatsService } from "./cats.service";
import { ICat } from "./interfaces/cat.interface";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { IsAdminGuard } from "src/auth/guards/is-admin.guard";

@UseGuards(JwtAuthGuard)
@Controller("cats")
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @UseGuards(IsAdminGuard)
  @Post()
  async create() {
    return { create: "ok" };
  }

  @Get()
  async findAll(): Promise<ICat[]> {
    return this.catsService.findAll();
  }

  @Get(":uuid")
  async findOne(
    @Param("uuid", new ParseUUIDPipe())
    uuid: string,
  ) {
    return this.catsService.findByUuid(uuid);
  }
}
