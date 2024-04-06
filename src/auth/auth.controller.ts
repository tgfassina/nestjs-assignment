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

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post("register")
  register(
    @Body()
    { username, password }: { username: string; password: string },
  ) {
    return this.usersService.register(username, password);
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req: { user: ISessionUser }) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  async me(@Request() req: { user: ISessionUser }) {
    return req.user;
  }
}
