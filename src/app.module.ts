import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DomainModule } from "./domain/domain.module";
import { UsecasesModule } from "./usecases/usecases.module";
import { AdapterModule } from "./adapter/adapter.module";
import { AppConfigModule } from "./config/config.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
	imports: [
		TypeOrmModule.forRoot(),
		MongooseModule.forRoot("mongodb://localhost:27017/passnet_classroom_view"),
		DomainModule,
		UsecasesModule,
		AdapterModule,
		AppConfigModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
