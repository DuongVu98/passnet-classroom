import { CacheInterceptor, CacheModule, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DomainModule } from "./domain/domain.module";
import { UsecasesModule } from "./usecases/usecases.module";
import { AdapterModule } from "./adapter/adapter.module";
import { AppConfigModule } from "./config/config.module";
import { MongooseModule } from "@nestjs/mongoose";
import * as redisStore from "cache-manager-redis-store";
import { APP_INTERCEPTOR } from "@nestjs/core";

@Module({
	imports: [
		MongooseModule.forRoot("mongodb://localhost:27017/passnet_classroom_db"),
		// CacheModule.register({
		// 	store: redisStore,
		// 	host: "192.168.99.100",
		// 	port: 6379,
		// }),
		DomainModule,
		UsecasesModule,
		AdapterModule,
		AppConfigModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		// {
		// 	provide: APP_INTERCEPTOR,
		// 	useClass: CacheInterceptor,
		// },
	],
})
export class AppModule {}
