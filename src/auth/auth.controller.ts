import { Controller, Request, Post, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { AuthService } from "./auth.service";
import { ISessionUser } from "./interfaces/session-user.interface";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req: { user: ISessionUser }) {
    return this.authService.login(req.user);
  }
}