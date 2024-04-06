import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
} from "@nestjs/common";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { AuthService } from "./auth.service";
import { ISessionUser } from "./interfaces/session-user.interface";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { UsersService } from "src/users/users.service";
import { RegisterDto } from "./dto/register.dto";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post("register")
  register(
    @Body()
    payload: RegisterDto,
  ) {
    return this.usersService.register(payload);
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  login(@Request() req: { user: ISessionUser }) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  me(@Request() req: { user: ISessionUser }) {
    return req.user;
  }
}
