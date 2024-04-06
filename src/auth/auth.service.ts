import * as bcrypt from "bcrypt";
import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { ISessionUser } from "./interfaces/session-user.interface";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<ISessionUser | null> {
    const user = await this.usersService.findByUsername(username);
    if (!user) return null;

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) return null;

    const { ...result } = user;
    delete user.password;
    return result;
  }

  login(user: ISessionUser) {
    const payload = { ...user, sub: user.uuid };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
