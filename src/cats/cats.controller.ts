import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
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
  create(@Body() payload: CreateCatDto): Promise<Cat> {
    return this.catsService.create(payload);
  }

  @Get()
  findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(":uuid")
  findOne(
    @Param("uuid", new ParseUUIDPipe())
    uuid: string,
  ): Promise<Cat> {
    return this.catsService.findByUuid(uuid);
  }

  @UseGuards(IsAdminGuard)
  @Put(":uuid")
  update(
    @Param("uuid", new ParseUUIDPipe()) uuid: string,
    @Body() payload: CreateCatDto,
  ): Promise<any> {
    return this.catsService.update(uuid, payload);
  }

  @UseGuards(IsAdminGuard)
  @Delete(":uuid")
  delete(@Param("uuid", new ParseUUIDPipe()) uuid: string): Promise<boolean> {
    return this.catsService.delete(uuid);
  }
}
