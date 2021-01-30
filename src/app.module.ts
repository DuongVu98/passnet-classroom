import { CacheModule, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DomainModule } from "./domain/domain.module";
import { UsecasesModule } from "./usecases/usecases.module";
import { AdapterModule } from "./adapter/adapter.module";
import { AppConfigModule } from "./config/config.module";
import { MongooseModule } from "@nestjs/mongoose";
import * as redisStore from "cache-manager-redis-store";
@Module({
	imports: [
		MongooseModule.forRoot("mongodb://localhost:27017/passnet_classroom_db"),
		CacheModule.register({
			store: redisStore,
			host: "localhost",
			port: 6379,
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
