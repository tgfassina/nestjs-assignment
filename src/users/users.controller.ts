import { Controller, Post, Body } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  register(
    @Body()
    { username, password }: { username: string; password: string },
  ) {
    return this.usersService.register(username, password);
  }
}
