import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from "@nestjs/common";
import { Roles } from "../common/decorators/roles.decorator";
import { RolesGuard } from "../common/guards/roles.guard";
import { CatsService } from "./cats.service";
import { CreateCatDto } from "./dto/create-cat.dto";
import { ICat } from "./interfaces/cat.interface";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@UseGuards(RolesGuard)
@Controller("cats")
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @Roles(["admin"])
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<ICat[]> {
    return this.catsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(":uuid")
  async findOne(
    @Param("uuid", new ParseUUIDPipe())
    uuid: string,
  ) {
    return this.catsService.findByUuid(uuid);
  }
}
