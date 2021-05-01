import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DomainModule } from "./domain/domain.module";
import { UsecasesModule } from "./usecases/usecases.module";
import { AdapterModule } from "./adapter/adapter.module";
import { AppConfigModule } from "./config/config.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Classroom, Comment, Member, Post } from "./domain/aggregate/domain.entities";

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: "postgres",
			host: "localhost",
			port: 5432,
			username: "admin",
			password: "tungduong98",
			database: "classroom_db",
			entities: [Classroom, Post, Comment, Member],
			synchronize: true,
			keepConnectionAlive: true,
		}),
		DomainModule,
		UsecasesModule,
		AdapterModule,
		AppConfigModule,
	],
	controllers: [AppController],
	providers: [AppService],
	exports: [],
})
export class AppModule {}
