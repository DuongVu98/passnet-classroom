import { CacheModule, Module } from "@nestjs/common";
import { DomainModule } from "src/domain/domain.module";
import { UsecasesModule } from "src/usecases/usecases.module";
import { HomeController } from "./api/home.controller";
import { TestApi } from "./api/test.api";
import * as redisStore from "cache-manager-redis-store";

@Module({
	imports: [
		UsecasesModule,
		DomainModule,
		CacheModule.register({
			store: redisStore,
			host: "192.168.99.100",
			port: 6379,
		}),
	],
	controllers: [TestApi, HomeController],
})
export class AdapterModule {}
