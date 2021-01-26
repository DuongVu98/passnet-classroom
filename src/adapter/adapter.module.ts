import { CacheModule, Module } from "@nestjs/common";
import { DomainModule } from "src/domain/domain.module";
import { UsecasesModule } from "src/usecases/usecases.module";
import { HomeController } from "./api/home.controller";
import { TestApi } from "./api/test.api";

@Module({
	imports: [UsecasesModule, DomainModule],
	controllers: [TestApi, HomeController],
	providers: [],
})
export class AdapterModule {}
