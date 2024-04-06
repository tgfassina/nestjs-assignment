import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { ISessionUser } from "./interfaces/session-user.interface";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<ISessionUser | null> {
    const user = await this.usersService.findByUsername(username);
    if (user && user.password === password) {
      const { ...result } = user;
      delete user.password;
      return result;
    }
    return null;
  }
}
