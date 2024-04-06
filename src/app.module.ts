import { Module } from "@nestjs/common";
import { CatsModule } from "./cats/cats.module";
import { CoreModule } from "./core/core.module";
import { Cat } from "./cats/cat.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/user.entity";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      database: "cats_db",
      username: "cats_user",
      password: "cats_password",
      entities: [Cat, User],
      synchronize: true,
    }),
    CoreModule,
    CatsModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
