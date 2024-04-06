import { Module } from "@nestjs/common";
import { CatsModule } from "./cats/cats.module";
import { CoreModule } from "./core/core.module";
import { Cat } from "./cats/cat.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      database: "cats_db",
      username: "cats_user",
      password: "cats_password",
      entities: [Cat],
      synchronize: true,
    }),
    CoreModule,
    CatsModule,
  ],
})
export class AppModule {}
