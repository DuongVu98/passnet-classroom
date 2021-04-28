import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DomainModule } from "./domain/domain.module";
import { UsecasesModule } from "./usecases/usecases.module";
import { AdapterModule } from "./adapter/adapter.module";
import { AppConfigModule } from "./config/config.module";
import { MongooseModule } from "@nestjs/mongoose";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
	imports: [
		MongooseModule.forRoot(process.env.DATABASE_URL, { useFindAndModify: false }),
		TypeOrmModule.forRoot({
			type: "postgres",
			host: "localhost",
			port: 3306,
			username: "admin",
			password: "tungduong98",
			database: "classroom_db",
			entities: [],
			synchronize: true,
		}),
		DomainModule,
		UsecasesModule,
		AdapterModule,
		AppConfigModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
