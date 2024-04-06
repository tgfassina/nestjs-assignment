import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { LocalStrategy } from "./guards/local.strategy";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [UsersModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
